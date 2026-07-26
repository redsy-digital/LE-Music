import React, { useState } from 'react';
import { Play, Pause, Heart, Share2, FileText, Music, Sparkles, TrendingUp, Search, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Song } from '../types';

interface MusicSectionProps {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onLikeSong: (songId: string) => void;
  likedSongIds: string[];
  onOpenLyrics: (song: Song) => void;
  onShare: (title: string, url: string) => void;
}

export const MusicSection: React.FC<MusicSectionProps> = ({
  songs,
  currentSong,
  isPlaying,
  onPlaySong,
  onLikeSong,
  likedSongIds,
  onOpenLyrics,
  onShare
}) => {
  const [filter, setFilter] = useState<'tudo' | 'popular' | 'synthwave' | 'electropop'>('tudo');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSongs = songs.filter(song => {
    const matchesSearch = song.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (song.album_nome && song.album_nome.toLowerCase().includes(searchTerm.toLowerCase()));
    if (!matchesSearch) return false;

    if (filter === 'popular') return song.isPopular || song.visualizacoes > 2500000;
    if (filter === 'synthwave') return song.genero?.toLowerCase().includes('synth');
    if (filter === 'electropop') return song.genero?.toLowerCase().includes('pop') || song.genero?.toLowerCase().includes('electro');
    return true;
  });

  return (
    <section id="musicas" className="py-24 relative bg-[#050505] overflow-hidden">
      {/* Background Neon Lights */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#00D4FF]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#0066FF]/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1020] border border-[#00D4FF]/30 text-[#00D4FF] text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Music className="w-3.5 h-3.5" />
            <span>Discografia & Faixas</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            MÚSICAS <span className="text-[#00D4FF]">POPULARES</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] rounded-full mt-4" />
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#0A1020]/80 p-3 rounded-2xl border border-slate-800/80 backdrop-blur-xl">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: 'tudo', label: 'Todas as Músicas' },
              { id: 'popular', label: 'Mais Tocadas 🔥' },
              { id: 'synthwave', label: 'Cyber Synth' },
              { id: 'electropop', label: 'Electro Pop' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filter === tab.id
                    ? 'bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-[#050505] shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Search Field */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar música..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#050505] border border-slate-800 text-white placeholder-slate-500 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#00D4FF]"
            />
          </div>
        </div>

        {/* Tracklist List Cards */}
        <div className="space-y-3">
          {filteredSongs.map((song, idx) => {
            const isCurrent = currentSong?.id === song.id;
            const isPlayingThis = isCurrent && isPlaying;
            const isLiked = likedSongIds.includes(song.id);

            return (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`group relative p-3 sm:p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 backdrop-blur-xl ${
                  isCurrent
                    ? 'bg-[#00D4FF]/10 border-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.2)]'
                    : 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/15'
                }`}
              >
                {/* Left: Index, Cover, Title & Info */}
                <div className="flex items-center gap-4 min-w-0">
                  <span className="w-6 text-center text-xs font-mono font-bold text-slate-500 group-hover:text-[#00D4FF] hidden sm:block">
                    {idx + 1}
                  </span>

                  {/* Artwork & Play Button Overlay */}
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-700/80 group-hover:border-[#00D4FF]">
                    <img
                      src={song.capa}
                      alt={song.titulo}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      onClick={() => onPlaySong(song)}
                      className={`absolute inset-0 flex items-center justify-center bg-black/60 transition-all ${
                        isPlayingThis ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {isPlayingThis ? (
                        <div className="p-2 rounded-full bg-[#00D4FF] text-black shadow-[0_0_10px_#00D4FF]">
                          <Pause className="w-4 h-4 fill-current" />
                        </div>
                      ) : (
                        <div className="p-2 rounded-full bg-[#00D4FF] text-black shadow-[0_0_10px_#00D4FF]">
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        </div>
                      )}
                    </button>
                  </div>

                  {/* Title, Album & Tags */}
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold truncate ${isCurrent ? 'text-[#00D4FF]' : 'text-white'}`}>
                        {song.titulo}
                      </span>
                      {song.isPopular && (
                        <span className="px-2 py-0.5 rounded-full bg-[#00D4FF]/20 text-[#00D4FF] text-[9px] font-mono font-bold uppercase tracking-wider shrink-0 border border-[#00D4FF]/30">
                          HOT
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 truncate">
                      {song.album_nome || 'LE Single'} • {song.genero}
                    </span>
                  </div>
                </div>

                {/* Right: Stats, Duration & Action Buttons */}
                <div className="flex items-center gap-3 sm:gap-6 shrink-0">
                  {/* Play Count */}
                  <div className="hidden md:flex flex-col items-end text-right">
                    <span className="text-xs font-mono font-bold text-slate-300">
                      {song.visualizacoes.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                      reproduções
                    </span>
                  </div>

                  {/* Duration */}
                  <span className="text-xs font-mono text-slate-400 hidden sm:block">
                    {song.duracao}
                  </span>

                  {/* Lyrics Button */}
                  {song.letras && (
                    <button
                      onClick={() => onOpenLyrics(song)}
                      className="p-2 rounded-xl bg-slate-800/50 text-slate-400 hover:text-[#00D4FF] hover:bg-slate-800 transition-all"
                      title="Ver Letras da Música"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  )}

                  {/* Share Button */}
                  <button
                    onClick={() => onShare(song.titulo, window.location.href)}
                    className="p-2 rounded-xl bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-all hidden sm:block"
                    title="Compartilhar"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>

                  {/* Like Button */}
                  <button
                    onClick={() => onLikeSong(song.id)}
                    className={`p-2.5 rounded-xl transition-all ${
                      isLiked
                        ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40'
                        : 'bg-slate-800/50 text-slate-400 hover:text-rose-400 hover:bg-slate-800'
                    }`}
                    title={isLiked ? 'Música Curtida' : 'Curtir Música'}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  </button>

                  {/* Main Play Action */}
                  <button
                    onClick={() => onPlaySong(song)}
                    className={`p-3 rounded-full font-bold transition-all ${
                      isPlayingThis
                        ? 'bg-[#00D4FF] text-[#050505] shadow-[0_0_15px_#00D4FF]'
                        : 'bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-[#050505] opacity-90 hover:opacity-100 hover:scale-105 shadow-md'
                    }`}
                  >
                    {isPlayingThis ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>
                </div>
              </motion.div>
            );
          })}

          {filteredSongs.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              Nenhuma música encontrada com os filtros selecionados.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
