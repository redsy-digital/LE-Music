import React from 'react';
import { X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Song } from '../types';

interface LyricsModalProps {
  song: Song | null;
  onClose: () => void;
}

export const LyricsModal: React.FC<LyricsModalProps> = ({ song, onClose }) => {
  if (!song) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl"
      >
        <div className="relative w-full max-w-lg bg-[#0A1020] border border-[#00D4FF]/40 rounded-3xl p-6 md:p-8 shadow-2xl text-left max-h-[85vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4 pb-4 border-b border-slate-800 mb-6">
            <img src={song.capa} alt={song.titulo} className="w-14 h-14 rounded-xl object-cover border border-[#00D4FF]/40" />
            <div>
              <span className="text-[10px] font-mono font-bold text-[#00D4FF] uppercase">Letras Oficiais</span>
              <h3 className="text-xl font-black text-white">{song.titulo}</h3>
              <p className="text-xs text-slate-400 font-mono">{song.album_nome || 'LE Music'}</p>
            </div>
          </div>

          <pre className="text-sm font-sans text-slate-200 whitespace-pre-wrap leading-relaxed tracking-wide font-medium">
            {song.letras || 'Letras indisponíveis para esta faixa.'}
          </pre>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
