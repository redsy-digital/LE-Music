import React, { useState } from 'react';
import { Shield, Music, Video, Disc, Calendar, BarChart3, Plus, Trash2, Edit3, X, Users, Heart, Play, DollarSign, Upload, Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { Song, MusicVideo, Album, EventSchedule, Comment, AdminStats } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  stats: AdminStats;
  songs: Song[];
  onAddSong: (songData: any) => void;
  onDeleteSong: (id: string) => void;
  videos: MusicVideo[];
  onAddVideo: (videoData: any) => void;
  onDeleteVideo: (id: string) => void;
  albums: Album[];
  onAddAlbum: (albumData: any) => void;
  onDeleteAlbum: (id: string) => void;
  events: EventSchedule[];
  onAddEvent: (eventData: any) => void;
  onDeleteEvent: (id: string) => void;
  comments: Comment[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  stats,
  songs,
  onAddSong,
  onDeleteSong,
  videos,
  onAddVideo,
  onDeleteVideo,
  albums,
  onAddAlbum,
  onDeleteAlbum,
  events,
  onAddEvent,
  onDeleteEvent,
  comments
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'musicas' | 'videoclipes' | 'albunds' | 'eventos' | 'comentarios'>('analytics');

  // Form states
  const [songForm, setSongForm] = useState({ titulo: '', capa: '', arquivo_audio: '', duracao: '03:30', genero: 'Cyber Synth' });
  const [videoForm, setVideoForm] = useState({ titulo: '', thumbnail: '', video_url: '', descricao: '' });
  const [albumForm, setAlbumForm] = useState({ nome: '', capa: '', descricao: '', tipo: 'Álbum' });
  const [eventForm, setEventForm] = useState({ titulo: '', local: '', cidade: '', data: '', hora: '21:00', preco: 'R$ 120' });

  if (!isOpen) return null;

  const handleSongSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!songForm.titulo) return;
    onAddSong(songForm);
    setSongForm({ titulo: '', capa: '', arquivo_audio: '', duracao: '03:30', genero: 'Cyber Synth' });
  };

  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.titulo) return;
    onAddVideo(videoForm);
    setVideoForm({ titulo: '', thumbnail: '', video_url: '', descricao: '' });
  };

  const handleAlbumSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!albumForm.nome) return;
    onAddAlbum(albumForm);
    setAlbumForm({ nome: '', capa: '', descricao: '', tipo: 'Álbum' });
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.titulo) return;
    onAddEvent(eventForm);
    setEventForm({ titulo: '', local: '', cidade: '', data: '', hora: '21:00', preco: 'R$ 120' });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto"
      >
        <div className="relative w-full max-w-6xl bg-[#0A1020] border border-[#00D4FF]/40 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,212,255,0.3)] my-auto max-h-[92vh] flex flex-col text-left">
          
          {/* Dashboard Header */}
          <div className="p-4 sm:p-6 bg-[#050505] border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#00D4FF]/20 border border-[#00D4FF] text-[#00D4FF]">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white font-mono uppercase tracking-wider">
                  PAINEL ADMINISTRATIVO <span className="text-[#00D4FF]">LE</span>
                </h3>
                <p className="text-[10px] text-slate-400 font-mono">
                  Gestão do Cantor & Analytics em Tempo Real
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-3 bg-[#050505]/60 border-b border-slate-800 shrink-0 px-6">
            {[
              { id: 'analytics', label: 'Estatísticas', icon: BarChart3 },
              { id: 'musicas', label: 'Gestão Músicas', icon: Music },
              { id: 'videoclipes', label: 'Videoclipes', icon: Video },
              { id: 'albunds', label: 'Álbuns', icon: Disc },
              { id: 'eventos', label: 'Agenda Shows', icon: Calendar },
              { id: 'comentarios', label: 'Comentários', icon: Heart }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-[#050505] shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Main Panel Content Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            
            {/* 1. ANALYTICS TAB */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                {/* Metric Cards Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#050505] border border-slate-800 flex flex-col gap-1">
                    <span className="text-xs font-mono text-slate-400 uppercase">Total Reproduções</span>
                    <span className="text-2xl font-black text-[#00D4FF] font-mono">
                      {stats.total_reproducoes.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#050505] border border-slate-800 flex flex-col gap-1">
                    <span className="text-xs font-mono text-slate-400 uppercase">Usuários Cadastrados</span>
                    <span className="text-2xl font-black text-white font-mono">
                      {stats.total_usuarios.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#050505] border border-slate-800 flex flex-col gap-1">
                    <span className="text-xs font-mono text-slate-400 uppercase">Curtidas Acumuladas</span>
                    <span className="text-2xl font-black text-rose-400 font-mono">
                      {stats.total_curtidas.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#050505] border border-slate-800 flex flex-col gap-1">
                    <span className="text-xs font-mono text-slate-400 uppercase">Receita Estimada</span>
                    <span className="text-2xl font-black text-emerald-400 font-mono">
                      {stats.receita_estimada}
                    </span>
                  </div>
                </div>

                {/* Growth Chart */}
                <div className="p-6 rounded-2xl bg-[#050505] border border-slate-800 space-y-4">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase">
                    Crescimento Mensal de Streams & Ouvintes
                  </h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stats.reproducoes_por_mes}>
                        <defs>
                          <linearGradient id="colorStreams" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="mes" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip contentStyle={{ backgroundColor: '#0A1020', borderColor: '#00D4FF' }} />
                        <Area type="monotone" dataKey="reproducoes" stroke="#00D4FF" fillOpacity={1} fill="url(#colorStreams)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {/* 2. SONGS MANAGEMENT TAB */}
            {activeTab === 'musicas' && (
              <div className="space-y-6">
                {/* Add Song Form */}
                <form onSubmit={handleSongSubmit} className="p-5 rounded-2xl bg-[#050505] border border-slate-800 space-y-4">
                  <h4 className="text-xs font-mono font-bold text-[#00D4FF] uppercase flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Upload / Adicionar Nova Música
                  </h4>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Título da Música"
                      required
                      value={songForm.titulo}
                      onChange={e => setSongForm({ ...songForm, titulo: e.target.value })}
                      className="bg-[#0A1020] border border-slate-800 text-white rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#00D4FF]"
                    />
                    <input
                      type="text"
                      placeholder="URL da Capa"
                      value={songForm.capa}
                      onChange={e => setSongForm({ ...songForm, capa: e.target.value })}
                      className="bg-[#0A1020] border border-slate-800 text-white rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#00D4FF]"
                    />
                    <input
                      type="text"
                      placeholder="URL do Áudio (MP3)"
                      value={songForm.arquivo_audio}
                      onChange={e => setSongForm({ ...songForm, arquivo_audio: e.target.value })}
                      className="bg-[#0A1020] border border-slate-800 text-white rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-[#00D4FF]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#00D4FF] text-black font-bold text-xs uppercase hover:scale-105 transition-all"
                  >
                    Salvar Música
                  </button>
                </form>

                {/* Existing Songs Table */}
                <div className="space-y-2">
                  {songs.map(song => (
                    <div key={song.id} className="p-3 rounded-xl bg-[#050505] border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={song.capa} alt={song.titulo} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="text-xs font-bold text-white">{song.titulo}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{song.visualizacoes} reproduções</p>
                        </div>
                      </div>
                      <button
                        onClick={() => onDeleteSong(song.id)}
                        className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. VIDEOS MANAGEMENT TAB */}
            {activeTab === 'videoclipes' && (
              <div className="space-y-6">
                <form onSubmit={handleVideoSubmit} className="p-5 rounded-2xl bg-[#050505] border border-slate-800 space-y-4">
                  <h4 className="text-xs font-mono font-bold text-[#00D4FF] uppercase flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Adicionar Videoclipe
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Título do Clipe"
                      required
                      value={videoForm.titulo}
                      onChange={e => setVideoForm({ ...videoForm, titulo: e.target.value })}
                      className="bg-[#0A1020] border border-slate-800 text-white rounded-xl px-4 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="URL do Embed YouTube"
                      value={videoForm.video_url}
                      onChange={e => setVideoForm({ ...videoForm, video_url: e.target.value })}
                      className="bg-[#0A1020] border border-slate-800 text-white rounded-xl px-4 py-2 text-xs"
                    />
                  </div>
                  <button type="submit" className="px-6 py-2 rounded-xl bg-[#00D4FF] text-black font-bold text-xs uppercase">
                    Salvar Videoclipe
                  </button>
                </form>

                <div className="grid sm:grid-cols-2 gap-3">
                  {videos.map(v => (
                    <div key={v.id} className="p-3 rounded-xl bg-[#050505] border border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">{v.titulo}</span>
                      <button onClick={() => onDeleteVideo(v.id)} className="p-1.5 text-rose-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. ALBUMS TAB */}
            {activeTab === 'albunds' && (
              <div className="space-y-6">
                <form onSubmit={handleAlbumSubmit} className="p-5 rounded-2xl bg-[#050505] border border-slate-800 space-y-4">
                  <h4 className="text-xs font-mono font-bold text-[#00D4FF] uppercase">Novo Álbum / EP</h4>
                  <input
                    type="text"
                    placeholder="Nome do Álbum"
                    required
                    value={albumForm.nome}
                    onChange={e => setAlbumForm({ ...albumForm, nome: e.target.value })}
                    className="w-full bg-[#0A1020] border border-slate-800 text-white rounded-xl px-4 py-2 text-xs"
                  />
                  <button type="submit" className="px-6 py-2 rounded-xl bg-[#00D4FF] text-black font-bold text-xs uppercase">
                    Criar Álbum
                  </button>
                </form>

                <div className="grid sm:grid-cols-3 gap-3">
                  {albums.map(a => (
                    <div key={a.id} className="p-3 rounded-xl bg-[#050505] border border-slate-800 flex justify-between items-center">
                      <span className="text-xs font-bold text-white">{a.nome}</span>
                      <button onClick={() => onDeleteAlbum(a.id)} className="text-rose-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. EVENTS TAB */}
            {activeTab === 'eventos' && (
              <div className="space-y-6">
                <form onSubmit={handleEventSubmit} className="p-5 rounded-2xl bg-[#050505] border border-slate-800 space-y-4">
                  <h4 className="text-xs font-mono font-bold text-[#00D4FF] uppercase">Agendar Show</h4>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Nome do Evento"
                      required
                      value={eventForm.titulo}
                      onChange={e => setEventForm({ ...eventForm, titulo: e.target.value })}
                      className="bg-[#0A1020] border border-slate-800 text-white rounded-xl px-4 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Local & Cidade"
                      value={eventForm.local}
                      onChange={e => setEventForm({ ...eventForm, local: e.target.value })}
                      className="bg-[#0A1020] border border-slate-800 text-white rounded-xl px-4 py-2 text-xs"
                    />
                    <input
                      type="date"
                      value={eventForm.data}
                      onChange={e => setEventForm({ ...eventForm, data: e.target.value })}
                      className="bg-[#0A1020] border border-slate-800 text-white rounded-xl px-4 py-2 text-xs"
                    />
                  </div>
                  <button type="submit" className="px-6 py-2 rounded-xl bg-[#00D4FF] text-black font-bold text-xs uppercase">
                    Adicionar Data
                  </button>
                </form>

                <div className="space-y-2">
                  {events.map(e => (
                    <div key={e.id} className="p-3 rounded-xl bg-[#050505] border border-slate-800 flex justify-between items-center">
                      <span className="text-xs font-bold text-white">{e.titulo} — {e.local} ({e.data})</span>
                      <button onClick={() => onDeleteEvent(e.id)} className="text-rose-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. COMMENTS TAB */}
            {activeTab === 'comentarios' && (
              <div className="space-y-3">
                {comments.map(c => (
                  <div key={c.id} className="p-3 rounded-xl bg-[#050505] border border-slate-800 text-xs text-slate-300">
                    <p className="font-bold text-white">{c.usuario_nome}: "{c.texto}"</p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
