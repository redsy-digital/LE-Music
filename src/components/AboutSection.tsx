import React from 'react';
import { Award, Music, Radio, Youtube, Instagram, Twitter, ExternalLink, Flame, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { Artist } from '../types';

interface AboutSectionProps {
  artist: Artist;
  logoUrl: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ artist, logoUrl }) => {
  return (
    <section id="sobre" className="py-24 relative bg-[#050505] overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#0066FF]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#00D4FF]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1020] border border-[#00D4FF]/30 text-[#00D4FF] text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <UserIcon className="w-3.5 h-3.5" />
            <span>Biografia & Trajetória</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            SOBRE O <span className="text-[#00D4FF]">ARTISTA</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] rounded-full mt-4" />
        </div>

        {/* Grid Content */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Portrait Card with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0A1020]/80 p-3 backdrop-blur-xl shadow-2xl">
              <img
                src={artist.foto}
                alt={artist.nome_artistico}
                className="w-full h-[480px] object-cover rounded-xl filter contrast-105"
                referrerPolicy="no-referrer"
              />

              {/* Glowing Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#050505]/90 border border-[#00D4FF]/40 backdrop-blur-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-full bg-[#00D4FF]/20 border border-[#00D4FF]/50 text-[#00D4FF]">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider font-bold">
                      Estilo Musical
                    </p>
                    <p className="text-sm font-bold text-white">
                      Cyber Electro-Pop & Synthwave
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio, Musical History & Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-8 text-left"
          >
            {/* Bio Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#0A1020]/60 border border-slate-800/80 backdrop-blur-xl shadow-lg relative">
              <div className="absolute -top-3 left-6 px-3 py-1 bg-[#0066FF] text-white text-[10px] font-black uppercase tracking-widest rounded-md shadow-md">
                Biografia
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {artist.nome_artistico}
              </h3>
              <p className="text-slate-300 leading-relaxed text-base">
                {artist.biografia}
              </p>
            </div>

            {/* Musical History */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#0A1020]/60 border border-slate-800/80 backdrop-blur-xl shadow-lg relative">
              <div className="absolute -top-3 left-6 px-3 py-1 bg-[#00D4FF] text-[#050505] text-[10px] font-black uppercase tracking-widest rounded-md shadow-md">
                História Musical
              </div>
              <p className="text-slate-300 leading-relaxed text-base pt-1">
                {artist.historia_musical}
              </p>
            </div>

            {/* Major Achievements Timeline/Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-widest">
                Conquistas & Reconhecimentos
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {artist.conquistas.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0A1020] border border-slate-800/80 hover:border-[#00D4FF]/40 transition-all text-slate-200 text-sm font-medium flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#00D4FF] shrink-0 shadow-[0_0_8px_#00D4FF]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Grid Buttons */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                Siga nas Redes Sociais
              </h4>
              <div className="flex flex-wrap gap-3">
                <a
                  href={artist.redes_sociais.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/30 text-[#1DB954] hover:bg-[#1DB954] hover:text-black font-bold text-xs transition-all"
                >
                  <Music className="w-4 h-4" />
                  <span>Spotify</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={artist.redes_sociais.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF0000]/10 border border-[#FF0000]/30 text-[#FF0000] hover:bg-[#FF0000] hover:text-white font-bold text-xs transition-all"
                >
                  <Youtube className="w-4 h-4" />
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={artist.redes_sociais.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E1306C]/10 border border-[#E1306C]/30 text-[#E1306C] hover:bg-[#E1306C] hover:text-white font-bold text-xs transition-all"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={artist.redes_sociais.appleMusic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FA243C]/10 border border-[#FA243C]/30 text-[#FA243C] hover:bg-[#FA243C] hover:text-white font-bold text-xs transition-all"
                >
                  <Radio className="w-4 h-4" />
                  <span>Apple Music</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
