'use client';

import React, { useState } from 'react';
import { useAudio } from '../utils/AudioContext';
import { usePathname, useRouter } from 'next/navigation';
import { Play, Pause, SkipBack, SkipForward, Headphones, X, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function GlobalAudioBar() {
  const pathname = usePathname();
  const router = useRouter();

  const {
    reciterType,
    currentSurahId,
    isPlaying,
    progress,
    duration,
    playbackSpeed,
    currentSurah,
    togglePlay,
    nextSurah,
    prevSurah,
    seekTo,
    changeSpeed,
    isLoaded,
  } = useAudio();

  const [isVisible, setIsVisible] = useState(true);

  // Hide the bar on the Homepage and dedicated Play pages to avoid dual players
  const isHiddenRoute = pathname === '/' || pathname.startsWith('/Play');
  
  if (isHiddenRoute || !isLoaded || !isVisible) return null;

  const progressPercent = (progress / (duration || 1)) * 100;

  const formatTime = (s) => {
    if (!s) return '00:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 w-full z-40 bg-primary/95 backdrop-blur-md border-t border-accent/20 shadow-2xl py-3 px-6 md:px-10 flex flex-col transition-all duration-300"
      >
        {/* Micro Progress Bar on top of the bar */}
        <div 
          className="absolute top-0 left-0 w-full h-1 bg-white/10 cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const clickRatio = clickX / width;
            seekTo(clickRatio * duration);
          }}
        >
          <div 
            className="h-full bg-accent relative"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-accent rounded-full scale-0 group-hover:scale-100 transition-transform" />
          </div>
        </div>

        <div className="max-w-8xl mx-auto w-full flex items-center justify-between gap-4 mt-1">
          {/* Track Information */}
          <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
            <Link 
              href={`/Play/${currentSurahId}?type=${reciterType}`}
              className="relative w-12 h-12 rounded-xl overflow-hidden border border-accent/20 bg-primary-light flex items-center justify-center text-accent group flex-shrink-0"
            >
              <Headphones size={20} className={isPlaying ? "animate-bounce" : ""} />
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ChevronUp size={16} className="text-white" />
              </div>
            </Link>

            <div className="text-right min-w-0">
              <Link 
                href={`/Play/${currentSurahId}?type=${reciterType}`}
                className="font-reem font-bold text-cream hover:text-accent transition-colors block truncate text-base md:text-lg"
              >
                سورة {currentSurah?.name}
              </Link>
              <span className="text-[10px] md:text-xs text-sand/60 font-sans block uppercase tracking-wider">
                المنشاوي • {reciterType === 'mojawwad' ? 'تجويد' : 'ترتيل'}
              </span>
            </div>
          </div>

          {/* Player controls */}
          <div className="flex items-center gap-4 md:gap-6 justify-center">
            <button
              onClick={prevSurah}
              className="text-stone-300 hover:text-accent disabled:opacity-20 transition-all p-1.5"
              title="السورة السابقة"
            >
              <SkipForward size={20} />
            </button>

            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              title={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
            >
              {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="translate-x-0.5" />}
            </button>

            <button
              onClick={nextSurah}
              className="text-stone-300 hover:text-accent disabled:opacity-20 transition-all p-1.5"
              title="السورة التالية"
            >
              <SkipBack size={20} />
            </button>
          </div>

          {/* Extra Actions (Speed, progress time, close) */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <div className="hidden sm:block text-xs font-sans tracking-wider text-sand/40 font-bold">
              {formatTime(progress)} / {formatTime(duration)}
            </div>

            {/* Playback Speed selector */}
            <button
              onClick={() => {
                const speeds = [1.0, 1.25, 1.5, 2.0];
                const currentIndex = speeds.indexOf(playbackSpeed);
                const nextIndex = (currentIndex + 1) % speeds.length;
                changeSpeed(speeds[nextIndex]);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-accent/20 bg-[#05231c]/60 text-accent font-sans text-xs font-bold hover:bg-[#05231c] transition-colors"
              title="سرعة التشغيل"
            >
              {playbackSpeed}x
            </button>

            {/* Close/Hide Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="text-stone-400 hover:text-white p-1"
              title="إخفاء المشغل"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
