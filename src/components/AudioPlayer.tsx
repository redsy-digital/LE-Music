import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Heart, Share2, FileText, ListMusic, Shuffle, Repeat, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Song } from '../types';

interface AudioPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextSong: () => void;
  onPrevSong: () => void;
  playlist: Song[];
  likedSongIds: string[];
  onLikeSong: (songId: string) => void;
  onOpenLyrics: (song: Song) => void;
  onShare: (title: string, url: string) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentSong,
  isPlaying,
  onTogglePlay,
  onNextSong,
  onPrevSong,
  playlist,
  likedSongIds,
  onLikeSong,
  onOpenLyrics,
  onShare
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showQueue, setShowQueue] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio autoplay prevented:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  if (!currentSong) return null;

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || currentSong.duracao_segundos);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const isLiked = likedSongIds.includes(currentSong.id);

  return (
    <>
      {/* Real HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentSong.arquivo_audio}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNextSong}
        preload="metadata"
      />

      {/* Persistent Bottom Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#050505]/95 border-t border-[#00D4FF]/30 backdrop-blur-2xl px-4 py-3 shadow-[0_-10px_40px_rgba(0,0,0,0.9)]"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Track Artwork & Info */}
          <div className="flex items-center gap-3 w-full md:w-1/4 min-w-0 justify-between md:justify-start">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#00D4FF]/40 shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                <img
                  src={currentSong.capa}
                  alt={currentSong.titulo}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Audio Equalizer Animated Wave Overlay */}
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5 p-1">
                    <span className="w-1 bg-[#00D4FF] h-4 animate-bounce" />
                    <span className="w-1 bg-[#00D4FF] h-6 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 bg-[#00D4FF] h-3 animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
              </div>

              <div className="flex flex-col text-left truncate min-w-0">
                <span className="text-xs font-bold text-white truncate hover:text-[#00D4FF] cursor-pointer">
                  {currentSong.titulo}
                </span>
                <span className="text-[10px] text-slate-400 font-mono truncate">
                  {currentSong.album_nome || 'LE Music'}
                </span>
              </div>
            </div>

            {/* Like Toggle */}
            <button
              onClick={() => onLikeSong(currentSong.id)}
              className={`p-2 rounded-lg transition-colors shrink-0 ${
                isLiked ? 'text-rose-500' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Controls & Progress Scrub Bar */}
          <div className="flex flex-col items-center gap-1.5 w-full md:w-2/4 max-w-xl">
            {/* Buttons Row */}
            <div className="flex items-center gap-4">
              <button
                onClick={onPrevSong}
                className="p-1.5 text-slate-400 hover:text-white transition-colors"
                title="Anterior"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={onTogglePlay}
                className="p-3 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-[#050505] shadow-[0_0_20px_#00D4FF] hover:scale-105 transition-all"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <button
                onClick={onNextSong}
                className="p-1.5 text-slate-400 hover:text-white transition-colors"
                title="Próxima"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Scrub Slider */}
            <div className="w-full flex items-center gap-3 text-[10px] font-mono text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00D4FF]"
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Extra Tools (Lyrics, Queue, Volume, Share) */}
          <div className="hidden md:flex items-center justify-end gap-3 w-1/4">
            {currentSong.letras && (
              <button
                onClick={() => onOpenLyrics(currentSong)}
                className="p-2 text-slate-400 hover:text-[#00D4FF] transition-colors"
                title="Letras"
              >
                <FileText className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => onShare(currentSong.titulo, window.location.href)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              title="Compartilhar"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowQueue(!showQueue)}
              className={`p-2 transition-colors ${showQueue ? 'text-[#00D4FF]' : 'text-slate-400 hover:text-white'}`}
              title="Fila de Reprodução"
            >
              <ListMusic className="w-4 h-4" />
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-slate-400 hover:text-white"
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                className="w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00D4FF]"
              />
            </div>
          </div>

        </div>
      </motion.div>

      {/* Queue Drawer Modal */}
      <AnimatePresence>
        {showQueue && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-4 z-50 w-80 max-h-96 bg-[#0A1020] border border-[#00D4FF]/40 rounded-2xl p-4 shadow-2xl overflow-y-auto text-left"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase">
                Fila de Reprodução
              </span>
              <button
                onClick={() => setShowQueue(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {playlist.map((s, idx) => (
                <div
                  key={s.id}
                  className={`p-2 rounded-xl flex items-center gap-3 ${
                    s.id === currentSong.id ? 'bg-[#00D4FF]/20 text-[#00D4FF] font-bold' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-[10px] font-mono text-slate-500">{idx + 1}</span>
                  <img src={s.capa} alt={s.titulo} className="w-8 h-8 rounded-md object-cover" />
                  <div className="flex flex-col min-w-0 truncate">
                    <span className="text-xs truncate">{s.titulo}</span>
                    <span className="text-[9px] text-slate-500 font-mono truncate">{s.duracao}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
