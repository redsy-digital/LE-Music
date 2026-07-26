import React, { useState } from 'react';
import { Play, Eye, Heart, Calendar, X, Video as VideoIcon, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MusicVideo } from '../types';

interface VideosSectionProps {
  videos: MusicVideo[];
  onShare: (title: string, url: string) => void;
}

export const VideosSection: React.FC<VideosSectionProps> = ({ videos, onShare }) => {
  const [selectedVideo, setSelectedVideo] = useState<MusicVideo | null>(null);

  return (
    <section id="videoclipes" className="py-24 relative bg-[#050505] overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0066FF]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1020] border border-[#00D4FF]/30 text-[#00D4FF] text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <VideoIcon className="w-3.5 h-3.5" />
            <span>Audiovisual & Shows</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            VIDEOCLIPES <span className="text-[#00D4FF]">OFICIAIS</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] rounded-full mt-4" />
        </div>

        {/* Video Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-[#0A1020] border border-slate-800 hover:border-[#00D4FF]/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-slate-900 cursor-pointer" onClick={() => setSelectedVideo(video)}>
                <img
                  src={video.thumbnail}
                  alt={video.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1020] via-transparent to-transparent opacity-80" />

                {/* Big Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#00D4FF] text-[#050505] flex items-center justify-center shadow-[0_0_25px_#00D4FF] group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                </div>

                {/* Video Duration / Quality Badge */}
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-[#050505]/90 text-[10px] font-mono font-bold text-white border border-slate-700">
                  4K ULTRA HD
                </span>
              </div>

              {/* Info Details */}
              <div className="p-5 flex flex-col gap-3">
                <h3 className="text-base font-bold text-white line-clamp-2 group-hover:text-[#00D4FF] transition-colors">
                  {video.titulo}
                </h3>
                
                <p className="text-xs text-slate-400 line-clamp-2 font-light">
                  {video.descricao}
                </p>

                {/* Metadata Footer */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#00D4FF]" />
                    <span>{(video.visualizacoes / 1000).toFixed(0)}k visualizações</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onShare(video.titulo, video.video_url)}
                      className="p-1.5 rounded-lg bg-slate-800/60 hover:text-[#00D4FF] transition-colors"
                      title="Compartilhar"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-slate-500">{video.data_publicacao}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Embedded Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
          >
            <div className="relative w-full max-w-4xl bg-[#0A1020] border border-[#00D4FF]/40 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,212,255,0.3)]">
              {/* Modal Header */}
              <div className="p-4 bg-[#050505] border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#00D4FF] text-[#050505] text-[10px] font-bold uppercase font-mono">
                    LE Video Player
                  </span>
                  <h4 className="text-sm font-bold text-white truncate max-w-md">
                    {selectedVideo.titulo}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Embed Frame */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={selectedVideo.video_url}
                  title={selectedVideo.titulo}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Description Footer */}
              <div className="p-6 text-left space-y-2">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedVideo.descricao}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
