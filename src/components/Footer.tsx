import React from 'react';
import { ArrowUp, Music, Youtube, Instagram, Twitter, Radio, Send, Heart } from 'lucide-react';

interface FooterProps {
  logoUrl: string;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ logoUrl, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-slate-900 text-slate-400 py-16 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-[#00D4FF]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Brand & Logo */}
          <div className="md:col-span-5 flex flex-col gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#00D4FF]/60 p-0.5 bg-[#0A1020] shadow-[0_0_15px_rgba(0,212,255,0.4)]">
                <img src={logoUrl} alt="LE Logo" className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
              </div>
              <span className="text-xl font-black text-white font-mono tracking-wider">
                LE <span className="text-[#00D4FF]">MUSIC</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              O projeto oficial do cantor e artista LE. Conectando eletro-pop, estética cyberpunk e performances inesquecíveis pelo mundo.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://spotify.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#0A1020] hover:text-[#00D4FF] hover:border-[#00D4FF]/50 border border-slate-800 transition-all">
                <Music className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#0A1020] hover:text-red-500 hover:border-red-500/50 border border-slate-800 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#0A1020] hover:text-pink-500 hover:border-pink-500/50 border border-slate-800 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://applemusic.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-[#0A1020] hover:text-[#00D4FF] hover:border-[#00D4FF]/50 border border-slate-800 transition-all">
                <Radio className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-3 text-left">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              Navegação
            </h4>
            <div className="flex flex-col gap-2 text-xs font-medium">
              <button onClick={() => onNavigate('home')} className="hover:text-[#00D4FF] text-left">Home</button>
              <button onClick={() => onNavigate('sobre')} className="hover:text-[#00D4FF] text-left">Sobre o Artista</button>
              <button onClick={() => onNavigate('musicas')} className="hover:text-[#00D4FF] text-left">Músicas & Faixas</button>
              <button onClick={() => onNavigate('videoclipes')} className="hover:text-[#00D4FF] text-left">Videoclipes 4K</button>
              <button onClick={() => onNavigate('eventos')} className="hover:text-[#00D4FF] text-left">Agenda de Shows</button>
              <button onClick={() => onNavigate('contato')} className="hover:text-[#00D4FF] text-left">Contato & Booking</button>
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div className="md:col-span-4 flex flex-col gap-3 text-left">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              Fique por Dentro
            </h4>
            <p className="text-xs text-slate-400">
              Receba prévias exclusivas de novas músicas, datas da turnê e lançamentos em primeira mão.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="email"
                placeholder="Seu e-mail melhor"
                className="w-full bg-[#0A1020] border border-slate-800 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#00D4FF]"
              />
              <button className="p-2.5 rounded-xl bg-[#00D4FF] text-black font-bold hover:scale-105 transition-all shrink-0">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p>© {new Date().getFullYear()} LE MUSIC. Todos os direitos reservados. Design & Experiência Futurista.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-400 hover:text-[#00D4FF] transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
