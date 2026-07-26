import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  url
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      >
        <div className="relative w-full max-w-sm bg-[#0A1020] border border-[#00D4FF]/40 rounded-3xl p-6 shadow-2xl text-left">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <h3 className="text-lg font-black text-white uppercase font-mono mb-1">
            COMPARTILHAR
          </h3>
          <p className="text-xs text-slate-400 mb-6 truncate">{title}</p>

          <div className="space-y-3">
            <div className="flex items-center gap-2 p-2 bg-[#050505] border border-slate-800 rounded-xl">
              <input
                type="text"
                readOnly
                value={url}
                className="w-full bg-transparent text-xs text-slate-300 font-mono focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-[#00D4FF] text-black font-bold text-xs shrink-0 flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
