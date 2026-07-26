import React, { useState } from 'react';
import { Disc, Play, Calendar, Music, Clock, Sparkles, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Album, Song } from '../types';

interface AlbumsSectionProps {
  albums: Album[];
  songs: Song[];
  onPlaySong: (song: Song) => void;
}

export const AlbumsSection: React.FC<AlbumsSectionProps> = ({ albums, songs, onPlaySong }) => {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  const getAlbumSongs = (albumId: string) => {
    return songs.filter(s => s.album_id === albumId || (s.album_nome && s.album_nome.includes(albumId)));
  };

  return (
    <section id="albunds" className="py-24 relative bg-[#050505] overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-[#00D4FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0066FF]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1020] border border-[#00D4FF]/30 text-[#00D4FF] text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Disc className="w-3.5 h-3.5" />
            <span>Projetos & Álbuns</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            ÁLBUNS <span className="text-[#00D4FF]">& EPs</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] rounded-full mt-4" />
        </div>

        {/* Albums Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {albums.map((album, idx) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative rounded-3xl p-4 bg-[#0A1020]/70 border border-slate-800 hover:border-[#00D4FF]/60 transition-all duration-300 shadow-xl backdrop-blur-xl flex flex-col justify-between"
            >
              {/* Vinyl Cover Frame */}
              <div
                onClick={() => setSelectedAlbum(album)}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-slate-900 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all duration-500"
              >
                <img
                  src={album.capa}
                  alt={album.nome}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Badge Type */}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#050505]/80 backdrop-blur-md text-[#00D4FF] border border-[#00D4FF]/40 text-[10px] font-mono font-bold uppercase tracking-widest">
                  {album.tipo}
                </span>

                {/* Hover Vinyl Glow */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-4 rounded-full bg-[#00D4FF] text-[#050505] font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_#00D4FF]">
                    <Play className="w-5 h-5 fill-current" />
                    <span>Ver Faixas</span>
                  </div>
                </div>
              </div>

              {/* Album Info */}
              <div className="pt-5 flex flex-col gap-2 text-left">
                <h3 className="text-xl font-bold text-white group-hover:text-[#00D4FF] transition-colors truncate">
                  {album.nome}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {album.descricao}
                </p>

                <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-3 border-t border-slate-800/80 mt-2">
                  <span>{album.faixas_count} Faixas • {album.total_duracao}</span>
                  <span>{album.data_lancamento}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Album Tracks Detail Modal */}
      <AnimatePresence>
        {selectedAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl"
          >
            <div className="relative w-full max-w-2xl bg-[#0A1020] border border-[#00D4FF]/40 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,212,255,0.3)] max-h-[90vh] overflow-y-auto">
              {/* Modal Close */}
              <button
                onClick={() => setSelectedAlbum(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Album Header Detail */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                <img
                  src={selectedAlbum.capa}
                  alt={selectedAlbum.nome}
                  className="w-32 h-32 rounded-2xl object-cover border border-[#00D4FF]/40 shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col text-center sm:text-left">
                  <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-widest">
                    {selectedAlbum.tipo} • {selectedAlbum.data_lancamento}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    {selectedAlbum.nome}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {selectedAlbum.descricao}
                  </p>
                </div>
              </div>

              {/* Tracklist inside Album */}
              <div className="space-y-2 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3 text-left">
                  Faixas do Álbum
                </h4>

                {getAlbumSongs(selectedAlbum.id).length > 0 ? (
                  getAlbumSongs(selectedAlbum.id).map((song, i) => (
                    <div
                      key={song.id}
                      onClick={() => {
                        onPlaySong(song);
                        setSelectedAlbum(null);
                      }}
                      className="p-3 rounded-xl bg-[#050505] border border-slate-800 hover:border-[#00D4FF] flex items-center justify-between cursor-pointer group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-slate-500 w-5">
                          {i + 1}
                        </span>
                        <span className="text-sm font-bold text-white group-hover:text-[#00D4FF]">
                          {song.titulo}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-slate-400">
                          {song.duracao}
                        </span>
                        <Play className="w-4 h-4 text-[#00D4FF]" />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center py-4">
                    Músicas deste álbum integradas no catálogo principal.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
