import React, { useState, useEffect } from 'react';
import { Search, Heart, Shield, Menu, X, Music, Disc, Video, Calendar, Image as ImageIcon, User, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  logoUrl: string;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  likedSongsCount: number;
  onOpenFavorites: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  logoUrl,
  activeSection,
  onNavigate,
  onOpenSearch,
  onOpenAdmin,
  likedSongsCount,
  onOpenFavorites
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'musicas', label: 'Músicas', icon: Music },
    { id: 'videoclipes', label: 'Clipes', icon: Video },
    { id: 'albunds', label: 'Álbuns', icon: Disc },
    { id: 'galeria', label: 'Galeria', icon: ImageIcon },
    { id: 'eventos', label: 'Agenda', icon: Calendar },
    { id: 'contato', label: 'Contato', icon: Mail }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/85 backdrop-blur-xl border-b border-[#00D4FF]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3'
          : 'bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LE Logo Emblem & Brand */}
        <button
          onClick={() => handleItemClick('home')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-full border border-[#00D4FF]/60 p-0.5 shadow-[0_0_15px_rgba(0,212,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,212,255,0.8)] transition-all duration-300 bg-[#0A1020]">
            <img
              src={logoUrl}
              alt="LE Logo"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 rounded-full bg-[#00D4FF]/10 group-hover:bg-[#00D4FF]/20 transition-all" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-black tracking-wider text-white font-mono group-hover:text-[#00D4FF] transition-colors">
              LE <span className="text-[#00D4FF]">MUSIC</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-sans">
              Official Site
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0A1020]/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md shadow-inner">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 tracking-wide ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-[#0066FF] to-[#00D4FF] shadow-[0_0_15px_rgba(0,212,255,0.5)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions (Search, Favorites, Admin Dashboard, Mobile Menu) */}
        <div className="flex items-center gap-2.5">
          {/* Smart Search */}
          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-full bg-[#0A1020]/80 border border-slate-800 text-slate-300 hover:text-[#00D4FF] hover:border-[#00D4FF]/50 transition-all duration-200 shadow-sm"
            title="Pesquisar Músicas e Conteúdo"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Favorites */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2.5 rounded-full bg-[#0A1020]/80 border border-slate-800 text-slate-300 hover:text-rose-400 hover:border-rose-500/50 transition-all duration-200"
            title="Músicas Curtidas"
          >
            <Heart className="w-4 h-4" />
            {likedSongsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00D4FF] text-[#050505] text-[10px] font-bold flex items-center justify-center animate-pulse">
                {likedSongsCount}
              </span>
            )}
          </button>

          {/* Admin Dashboard */}
          <button
            onClick={onOpenAdmin}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#0A1020] to-[#101B35] border border-[#00D4FF]/40 text-xs font-bold text-[#00D4FF] hover:bg-[#00D4FF] hover:text-[#050505] transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.15)]"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Painel Admin</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-[#0A1020] border border-slate-800 text-slate-200 hover:text-[#00D4FF]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0A1020]/95 backdrop-blur-2xl border-b border-[#00D4FF]/20 px-4 py-6 mt-3"
          >
            <div className="flex flex-col gap-2 max-w-md mx-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </button>
              ))}

              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="mt-3 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/40 text-[#00D4FF] text-sm font-bold"
              >
                <Shield className="w-4 h-4" />
                <span>Acessar Painel Admin</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
