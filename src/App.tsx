import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MusicSection } from './components/MusicSection';
import { VideosSection } from './components/VideosSection';
import { AlbumsSection } from './components/AlbumsSection';
import { GallerySection } from './components/GallerySection';
import { EventsSection } from './components/EventsSection';
import { ContactSection } from './components/ContactSection';
import { CommentsSection } from './components/CommentsSection';
import { AudioPlayer } from './components/AudioPlayer';
import { AdminDashboard } from './components/AdminDashboard';
import { SearchModal } from './components/SearchModal';
import { ShareModal } from './components/ShareModal';
import { LyricsModal } from './components/LyricsModal';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';

import { Artist, Song, MusicVideo, Album, EventSchedule, Comment, AdminStats } from './types';
import { INITIAL_ARTIST, INITIAL_SONGS, INITIAL_VIDEOS, INITIAL_ALBUMS, INITIAL_EVENTS, INITIAL_COMMENTS, INITIAL_ADMIN_STATS } from './data/mockData';

// Image assets generated for LE Music
import LE_LOGO from './assets/images/le_music_logo_1785091096975.jpg';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Core App Data States
  const [artist, setArtist] = useState<Artist>(INITIAL_ARTIST);
  const [songs, setSongs] = useState<Song[]>(INITIAL_SONGS);
  const [videos, setVideos] = useState<MusicVideo[]>(INITIAL_VIDEOS);
  const [albums, setAlbums] = useState<Album[]>(INITIAL_ALBUMS);
  const [events, setEvents] = useState<EventSchedule[]>(INITIAL_EVENTS);
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [adminStats, setAdminStats] = useState<AdminStats>(INITIAL_ADMIN_STATS);

  // Player & Favorites State
  const [currentSong, setCurrentSong] = useState<Song | null>(INITIAL_SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongIds, setLikedSongIds] = useState<string[]>(['song_1', 'song-[#00D4FF]']);

  // Modals
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [shareData, setShareData] = useState<{ isOpen: boolean; title: string; url: string }>({
    isOpen: false,
    title: '',
    url: ''
  });
  const [lyricsSong, setLyricsSong] = useState<Song | null>(null);

  // Initial Data Fetching from Express API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resArt, resSongs, resVids, resAlb, resEvt, resCom, resStats] = await Promise.all([
          fetch('/api/artist').then(r => r.ok ? r.json() : null),
          fetch('/api/songs').then(r => r.ok ? r.json() : null),
          fetch('/api/videos').then(r => r.ok ? r.json() : null),
          fetch('/api/albums').then(r => r.ok ? r.json() : null),
          fetch('/api/events').then(r => r.ok ? r.json() : null),
          fetch('/api/comments').then(r => r.ok ? r.json() : null),
          fetch('/api/stats').then(r => r.ok ? r.json() : null)
        ]);

        if (resArt) setArtist(resArt);
        if (resSongs && resSongs.length > 0) {
          setSongs(resSongs);
          setCurrentSong(resSongs[0]);
        }
        if (resVids) setVideos(resVids);
        if (resAlb) setAlbums(resAlb);
        if (resEvt) setEvents(resEvt);
        if (resCom) setComments(resCom);
        if (resStats) setAdminStats(resStats);
      } catch (err) {
        console.log('Using local fallback mock data:', err);
      } finally {
        setTimeout(() => setIsLoading(false), 1200);
      }
    };

    fetchData();
  }, []);

  // Audio Handlers
  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      // Trigger API view increment
      fetch(`/api/songs/${song.id}/play`, { method: 'POST' }).catch(() => {});
    }
  };

  const handleNextSong = () => {
    if (!currentSong) return;
    const idx = songs.findIndex(s => s.id === currentSong.id);
    const nextIdx = (idx + 1) % songs.length;
    setCurrentSong(songs[nextIdx]);
    setIsPlaying(true);
  };

  const handlePrevSong = () => {
    if (!currentSong) return;
    const idx = songs.findIndex(s => s.id === currentSong.id);
    const prevIdx = idx === 0 ? songs.length - 1 : idx - 1;
    setCurrentSong(songs[prevIdx]);
    setIsPlaying(true);
  };

  const handleLikeSong = (songId: string) => {
    if (likedSongIds.includes(songId)) {
      setLikedSongIds(likedSongIds.filter(id => id !== songId));
    } else {
      setLikedSongIds([...likedSongIds, songId]);
      fetch(`/api/songs/${songId}/like`, { method: 'POST' }).catch(() => {});
    }
  };

  // Section Scroll Navigation
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Admin Actions
  const handleAddSong = async (songData: any) => {
    try {
      const res = await fetch('/api/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(songData)
      });
      if (res.ok) {
        const newS = await res.json();
        setSongs([newS, ...songs]);
      }
    } catch {
      const fallbackS: Song = {
        id: `song_${Date.now()}`,
        titulo: songData.titulo || 'Nova Música',
        capa: songData.capa || LE_LOGO,
        arquivo_audio: songData.arquivo_audio || 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
        duracao: songData.duracao || '03:30',
        duracao_segundos: 210,
        visualizacoes: 0,
        curtidas: 0,
        data_publicacao: new Date().toISOString().split('T')[0]
      };
      setSongs([fallbackS, ...songs]);
    }
  };

  const handleDeleteSong = async (id: string) => {
    setSongs(songs.filter(s => s.id !== id));
    fetch(`/api/songs/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const handleAddVideo = async (vidData: any) => {
    const newV: MusicVideo = {
      id: `vid_${Date.now()}`,
      titulo: vidData.titulo || 'Novo Clip',
      thumbnail: vidData.thumbnail || LE_LOGO,
      video_url: vidData.video_url || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      visualizacoes: 0,
      curtidas: 0,
      data_publicacao: new Date().toISOString().split('T')[0]
    };
    setVideos([newV, ...videos]);
    fetch('/api/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vidData)
    }).catch(() => {});
  };

  const handleDeleteVideo = async (id: string) => {
    setVideos(videos.filter(v => v.id !== id));
    fetch(`/api/videos/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const handleAddAlbum = async (albData: any) => {
    const newA: Album = {
      id: `alb_${Date.now()}`,
      nome: albData.nome || 'Novo Álbum',
      capa: albData.capa || LE_LOGO,
      descricao: albData.descricao || '',
      data_lancamento: new Date().toISOString().split('T')[0],
      faixas_count: 5,
      tipo: albData.tipo || 'Álbum'
    };
    setAlbums([newA, ...albums]);
    fetch('/api/albums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(albData)
    }).catch(() => {});
  };

  const handleDeleteAlbum = async (id: string) => {
    setAlbums(albums.filter(a => a.id !== id));
    fetch(`/api/albums/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const handleAddEvent = async (evtData: any) => {
    const newE: EventSchedule = {
      id: `evt_${Date.now()}`,
      titulo: evtData.titulo || 'Show Especial',
      local: evtData.local || 'Arena',
      cidade: evtData.cidade || 'São Paulo',
      pais: 'Brasil',
      data: evtData.data || new Date().toISOString().split('T')[0],
      hora: evtData.hora || '21:00',
      descricao: '',
      status_ingresso: 'Disponível',
      preco: evtData.preco || 'R$ 120'
    };
    setEvents([newE, ...events]);
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(evtData)
    }).catch(() => {});
  };

  const handleDeleteEvent = async (id: string) => {
    setEvents(events.filter(e => e.id !== id));
    fetch(`/api/events/${id}`, { method: 'DELETE' }).catch(() => {});
  };

  const handleAddComment = async (texto: string, usuario_nome: string) => {
    const newC: Comment = {
      id: `c_${Date.now()}`,
      usuario_nome,
      texto,
      data: 'Agora mesmo',
      curtidas: 0,
      item_tipo: 'geral'
    };
    setComments([newC, ...comments]);
    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto, usuario_nome })
    }).catch(() => {});
  };

  const handleLikeComment = (id: string) => {
    setComments(comments.map(c => c.id === id ? { ...c, curtidas: c.curtidas + 1 } : c));
    fetch(`/api/comments/${id}/like`, { method: 'POST' }).catch(() => {});
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#00D4FF] selection:text-black font-sans antialiased overflow-x-hidden relative">
      {/* Background Gradient Orbs for Atmosphere */}
      <div className="fixed top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#0066FF]/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#00D4FF]/10 rounded-full blur-[100px] pointer-events-none z-0" />
      
      {/* Animated Splash Loading Screen */}
      {isLoading ? (
        <LoadingScreen logoUrl={LE_LOGO} />
      ) : (
        <>
          {/* Header Navigation */}
          <Header
            logoUrl={LE_LOGO}
            activeSection={activeSection}
            onNavigate={scrollToSection}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAdmin={() => setIsAdminOpen(true)}
            likedSongsCount={likedSongIds.length}
            onOpenFavorites={() => scrollToSection('musicas')}
          />

          {/* Main Sections */}
          <main className="pb-24">
            <Hero
              artist={artist}
              featuredSong={songs[0]}
              onPlaySong={handlePlaySong}
              onNavigate={scrollToSection}
              logoUrl={LE_LOGO}
            />

            <AboutSection
              artist={artist}
              logoUrl={LE_LOGO}
            />

            <MusicSection
              songs={songs}
              currentSong={currentSong}
              isPlaying={isPlaying}
              onPlaySong={handlePlaySong}
              onLikeSong={handleLikeSong}
              likedSongIds={likedSongIds}
              onOpenLyrics={song => setLyricsSong(song)}
              onShare={(title, url) => setShareData({ isOpen: true, title, url })}
            />

            <VideosSection
              videos={videos}
              onShare={(title, url) => setShareData({ isOpen: true, title, url })}
            />

            <AlbumsSection
              albums={albums}
              songs={songs}
              onPlaySong={handlePlaySong}
            />

            <GallerySection />

            <EventsSection
              events={events}
            />

            <CommentsSection
              comments={comments}
              onAddComment={handleAddComment}
              onLikeComment={handleLikeComment}
            />

            <ContactSection />
          </main>

          {/* Bottom Persistent Audio Player */}
          <AudioPlayer
            currentSong={currentSong}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            onNextSong={handleNextSong}
            onPrevSong={handlePrevSong}
            playlist={songs}
            likedSongIds={likedSongIds}
            onLikeSong={handleLikeSong}
            onOpenLyrics={song => setLyricsSong(song)}
            onShare={(title, url) => setShareData({ isOpen: true, title, url })}
          />

          {/* Footer */}
          <Footer
            logoUrl={LE_LOGO}
            onNavigate={scrollToSection}
          />

          {/* Admin Cantor Dashboard Panel */}
          <AdminDashboard
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            stats={adminStats}
            songs={songs}
            onAddSong={handleAddSong}
            onDeleteSong={handleDeleteSong}
            videos={videos}
            onAddVideo={handleAddVideo}
            onDeleteVideo={handleDeleteVideo}
            albums={albums}
            onAddAlbum={handleAddAlbum}
            onDeleteAlbum={handleDeleteAlbum}
            events={events}
            onAddEvent={handleAddEvent}
            onDeleteEvent={handleDeleteEvent}
            comments={comments}
          />

          {/* Search Modal */}
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            songs={songs}
            videos={videos}
            albums={albums}
            events={events}
            onPlaySong={handlePlaySong}
          />

          {/* Social Share Modal */}
          <ShareModal
            isOpen={shareData.isOpen}
            onClose={() => setShareData({ ...shareData, isOpen: false })}
            title={shareData.title}
            url={shareData.url || window.location.href}
          />

          {/* Lyrics Modal */}
          <LyricsModal
            song={lyricsSong}
            onClose={() => setLyricsSong(null)}
          />
        </>
      )}
    </div>
  );
}
