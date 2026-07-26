import React from 'react';
import { Play, Video, Disc, Sparkles, TrendingUp, Radio, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Artist, Song } from '../types';

interface HeroProps {
  artist: Artist;
  featuredSong?: Song;
  onPlaySong: (song: Song) => void;
  onNavigate: (sectionId: string) => void;
  logoUrl: string;
}

export const Hero: React.FC<HeroProps> = ({
  artist,
  featuredSong,
  onPlaySong,
  onNavigate,
  logoUrl
}) => {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background Cyber Lights & Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0066FF]/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#00D4FF]/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#00D4FF_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col gap-6 text-left"
          >
            {/* Live Streaming Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0A1020]/90 border border-[#00D4FF]/40 backdrop-blur-md w-fit shadow-[0_0_20px_rgba(0,212,255,0.2)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00D4FF]"></span>
              </span>
              <span className="text-xs font-mono font-bold tracking-widest text-[#00D4FF] uppercase">
                Novo Lançamento • Neon Horizons
              </span>
            </div>

            {/* Main Title with LE Logo Accent */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black italic tracking-tighter leading-none text-white uppercase">
                O FUTURO É <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#0066FF] drop-shadow-[0_0_35px_rgba(0,212,255,0.6)]">
                  LE MUSIC
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/60 font-light max-w-xl leading-relaxed pt-2">
                A fusão perfeita entre a batida eletrônica futurista e a alma musical brasileira. Explore os lançamentos exclusivos.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              {featuredSong && (
                <button
                  onClick={() => onPlaySong(featuredSong)}
                  className="px-8 py-4 bg-[#00D4FF] text-[#050505] font-bold rounded-full shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:scale-105 transition-transform flex items-center gap-3 text-sm tracking-wide uppercase"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Ouvir Agora</span>
                </button>
              )}

              <button
                onClick={() => onNavigate('videoclipes')}
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 font-bold rounded-full hover:bg-white/20 transition-all text-white flex items-center gap-3 text-sm tracking-wide uppercase"
              >
                <Video className="w-5 h-5 text-[#00D4FF]" />
                <span>Ver Videoclipes</span>
              </button>
            </div>

            {/* Quick Live Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80">
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {(artist.estatisticas.total_reproducoes / 1000000).toFixed(1)}M+
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-sans">
                  Reproduções
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-[#00D4FF] font-mono">
                  {(artist.estatisticas.ouvintes_mensais / 1000000).toFixed(1)}M
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-sans">
                  Ouvintes Mensais
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {artist.estatisticas.shows_realizados}+
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-sans">
                  Shows Turnê
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Artwork / Artist Portrait with Glowing Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl p-2 bg-gradient-to-b from-[#00D4FF]/40 via-[#0066FF]/20 to-transparent shadow-[0_0_60px_rgba(0,102,255,0.3)]">
              {/* Inner Glowing Artist Frame */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0A1020]">
                <img
                  src={artist.foto}
                  alt={artist.nome_artistico}
                  className="w-full h-full object-cover object-center filter brightness-105 contrast-110 hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

                {/* Floating LE Logo Badge */}
                <div className="absolute top-4 left-4 p-2.5 rounded-full bg-[#050505]/80 backdrop-blur-md border border-[#00D4FF]/50 shadow-[0_0_20px_rgba(0,212,255,0.4)] flex items-center gap-2">
                  <img
                    src={logoUrl}
                    alt="LE Logo"
                    className="w-7 h-7 rounded-full"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-xs font-mono font-bold text-white pr-1">
                    LE OFFICIAL
                  </span>
                </div>

                {/* Featured Track Floating Player Card */}
                {featuredSong && (
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#050505]/90 border border-[#00D4FF]/30 backdrop-blur-xl flex items-center justify-between shadow-2xl">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img
                        src={featuredSong.capa}
                        alt={featuredSong.titulo}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex flex-col truncate">
                        <span className="text-xs font-bold text-[#00D4FF] uppercase tracking-wider">
                          Música em Destaque
                        </span>
                        <span className="text-sm font-bold text-white truncate">
                          {featuredSong.titulo}
                        </span>
                        <span className="text-[11px] text-slate-400 truncate">
                          {featuredSong.album_nome}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onPlaySong(featuredSong)}
                      className="p-3 rounded-full bg-[#00D4FF] text-[#050505] hover:scale-110 transition-all shrink-0 shadow-[0_0_15px_#00D4FF]"
                      title="Play Preview"
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
