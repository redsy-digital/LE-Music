import React, { useState } from 'react';
import { Search, X, Music, Video, Disc, Calendar, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Song, MusicVideo, Album, EventSchedule } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  songs: Song[];
  videos: MusicVideo[];
  albums: Album[];
  events: EventSchedule[];
  onPlaySong: (song: Song) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  songs,
  videos,
  albums,
  events,
  onPlaySong
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matchedSongs = songs.filter(s => s.titulo.toLowerCase().includes(query.toLowerCase()));
  const matchedVideos = videos.filter(v => v.titulo.toLowerCase().includes(query.toLowerCase()));
  const matchedAlbums = albums.filter(a => a.nome.toLowerCase().includes(query.toLowerCase()));
  const matchedEvents = events.filter(e => e.titulo.toLowerCase().includes(query.toLowerCase()) || e.cidade.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/90 backdrop-blur-2xl"
      >
        <div className="relative w-full max-w-2xl bg-[#0A1020] border border-[#00D4FF]/40 rounded-3xl p-6 shadow-2xl text-left">
          {/* Header Input */}
          <div className="relative flex items-center mb-6">
            <Search className="w-5 h-5 absolute left-4 text-[#00D4FF]" />
            <input
              type="text"
              autoFocus
              placeholder="Pesquisar músicas, clipes, álbuns ou shows do LE..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-[#050505] border border-slate-800 text-white rounded-2xl pl-12 pr-12 py-3.5 text-sm focus:outline-none focus:border-[#00D4FF]"
            />
            <button
              onClick={onClose}
              className="absolute right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results list */}
          {query.trim().length > 0 ? (
            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Songs */}
              {matchedSongs.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#00D4FF] uppercase mb-2">
                    Músicas
                  </h4>
                  <div className="space-y-1">
                    {matchedSongs.map(s => (
                      <div
                        key={s.id}
                        onClick={() => {
                          onPlaySong(s);
                          onClose();
                        }}
                        className="p-2.5 rounded-xl bg-[#050505] border border-slate-800 hover:border-[#00D4FF] flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <img src={s.capa} alt={s.titulo} className="w-8 h-8 rounded-lg object-cover" />
                          <span className="text-xs font-bold text-white">{s.titulo}</span>
                        </div>
                        <Play className="w-4 h-4 text-[#00D4FF]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Videos */}
              {matchedVideos.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#00D4FF] uppercase mb-2">
                    Videoclipes
                  </h4>
                  <div className="space-y-1">
                    {matchedVideos.map(v => (
                      <div key={v.id} className="p-2.5 rounded-xl bg-[#050505] border border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-bold text-white truncate">{v.titulo}</span>
                        <Video className="w-4 h-4 text-[#00D4FF]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedSongs.length === 0 && matchedVideos.length === 0 && matchedAlbums.length === 0 && (
                <p className="text-xs text-slate-500 text-center py-6">
                  Nenhum resultado encontrado para "{query}".
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-500 text-center py-8 font-mono">
              Digite o nome de uma faixa ou evento para pesquisar em tempo real.
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
