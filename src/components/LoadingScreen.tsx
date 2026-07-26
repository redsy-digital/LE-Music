import React from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  logoUrl?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ logoUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden"
    >
      {/* Background Neon Aura */}
      <div className="absolute w-96 h-96 bg-[#00D4FF]/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-72 h-72 bg-[#0066FF]/30 rounded-full blur-[90px] pointer-events-none" />

      {/* LE Logo Emblem */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.9, 1.05, 1], opacity: 1 }}
        transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}
        className="relative mb-6 flex flex-col items-center"
      >
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-[#00D4FF]/60 p-1.5 shadow-[0_0_40px_rgba(0,212,255,0.5)] bg-[#0A1020]/80 backdrop-blur-md flex items-center justify-center">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="LE Logo"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="text-4xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#00D4FF] via-[#0066FF] to-white drop-shadow-[0_0_15px_rgba(0,212,255,0.8)]">
              LE
            </span>
          )}
        </div>
      </motion.div>

      {/* Artist Title & Equalizer */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold tracking-[0.2em] text-white uppercase mb-4"
      >
        LE <span className="text-[#00D4FF]">MUSIC</span>
      </motion.h1>

      {/* Audio Wave Animated Bars */}
      <div className="flex items-center gap-1.5 h-8 my-3">
        {[0.4, 0.8, 0.5, 0.9, 0.3, 0.7, 1, 0.6, 0.4].map((delay, idx) => (
          <motion.div
            key={idx}
            animate={{ height: ['8px', '32px', '8px'] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: 'mirror',
              delay: delay * 0.5,
              ease: 'easeInOut'
            }}
            className="w-1.5 rounded-full bg-gradient-to-t from-[#0066FF] to-[#00D4FF] shadow-[0_0_10px_#00D4FF]"
          />
        ))}
      </div>

      <p className="text-xs tracking-widest text-slate-400 font-mono uppercase mt-2">
        Carregando experiência cibernética...
      </p>
    </motion.div>
  );
};
