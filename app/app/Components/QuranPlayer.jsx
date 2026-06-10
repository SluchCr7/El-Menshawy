'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProgressBar from '@/app/Components/Quran/ProgressBar'
import { Play, Pause, SkipBack, SkipForward, Heart, Share2, Download, Headphones, Mic2, ChevronDown, Check } from 'lucide-react'
import Image from 'next/image'
import { useAuth } from '../utils/AuthContext'
import { useAudio } from '../utils/AudioContext'

export default function QuranPlayer() {
  const {
    reciterType,
    currentSurahId,
    isPlaying,
    progress,
    duration,
    playbackSpeed,
    currentSurah,
    playbackList,
    playSurah,
    togglePlay,
    nextSurah,
    prevSurah,
    seekTo,
    changeSpeed,
  } = useAudio();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { isAuthenticated } = useAuth();
  const dropdownRef = useRef(null)

  const surahId = currentSurahId || 1;
  const surahs = playbackList;
  const surah = currentSurah || playbackList[0];

  // إغلاق القائمة المنسدلة عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // مزامنة المفضلة
  const checkFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('mensh_favorites') || '[]');
    const exists = favorites.some(fav => fav.id === surahId && fav.type === reciterType);
    setIsFavorite(exists);
  };

  useEffect(() => {
    checkFavorite();
    window.addEventListener('mensh_favorites_updated', checkFavorite);
    return () => window.removeEventListener('mensh_favorites_updated', checkFavorite);
  }, [surahId, reciterType]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('mensh_favorites') || '[]');
    let updated;
    if (isFavorite) {
      updated = favorites.filter(fav => !(fav.id === surahId && fav.type === reciterType));
    } else {
      updated = [...favorites, { id: surahId, name: surah.name, type: reciterType }];
    }
    localStorage.setItem('mensh_favorites', JSON.stringify(updated));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event('mensh_favorites_updated'));
  };

  const handleShare = () => {
    const playUrl = `${window.location.origin}/Play/${surahId}?type=${reciterType}`;
    if (navigator.share) {
      navigator.share({
        title: `تلاوة سورة ${surah.name} - الشيخ محمد صديق المنشاوي`,
        text: `استمع إلى سورة ${surah.name} بصوت الشيخ المنشاوي (${reciterType === 'mojawwad' ? 'تجويد' : 'ترتيل'}).`,
        url: playUrl,
      }).catch(console.warn);
    } else {
      navigator.clipboard.writeText(playUrl);
      alert("تم نسخ رابط الاستماع للسورة بنجاح!");
    }
  };

  const formatTime = (s) => {
    if (!s) return '00:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  };

  return (
    <div className="relative w-full min-h-screen bg-[#020f0c] text-white flex items-center py-9 justify-center transition-colors duration-500">
      
      {/* توهج خلفي ناعم ضخم ممتد خارج الكارد يعطي طابع سينمائي */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d4af37]/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#0af]/5 blur-[100px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-gradient-to-b from-[#05231c]/95 to-[#02130f]/98 border border-[#d4af37]/20 rounded-[2.5rem] p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md overflow-hidden "
      >
        <div className="absolute inset-0 opacity-[0.02] bg-islamic-pattern bg-repeat pointer-events-none" />

        {/* الكبسولة العلوية */}
        <div className="flex justify-between items-center mb-6 relative z-20">
          <div className="flex items-center gap-2 text-[#d4af37]/70">
            <Headphones size={14} className={isPlaying ? "animate-bounce" : ""} />
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider">Studio Audio</span>
          </div>

          <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 shadow-inner font-reem">
            <button
              onClick={() => { playSurah(1, 'mojawwad', isPlaying); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                reciterType === 'mojawwad' ? 'bg-[#d4af37] text-[#05231c] shadow-md' : 'text-stone-400 hover:text-white'
              }`}
            >
              مجوّد
            </button>
            <button
              onClick={() => { playSurah(1, 'murattal', isPlaying); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                reciterType === 'murattal' ? 'bg-[#d4af37] text-[#05231c] shadow-md' : 'text-stone-400 hover:text-white'
              }`}
            >
              مرتّل
            </button>
          </div>
        </div>

        {/* إطار الصورة */}
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-6 border border-[#d4af37]/10 shadow-inner bg-black/40 z-10 group">
          <Image
            src="/assets/minshawi_pro.png"
            alt="Sheikh Mohamed Siddiq El-Minshawi"
            fill
            className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#02130f] via-transparent to-transparent opacity-80" />

          {/* الأنيميشن الخاص بموجات الصوت السفلي المحسن */}
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 h-6 items-end justify-center bg-black/40 backdrop-blur-[4px] px-4 py-1.5 rounded-full border border-white/10"
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ['30%', '100%', '40%', '90%', '20%', '70%'] }}
                    transition={{ duration: 0.4 + i * 0.06, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                    className="w-0.5 bg-[#d4af37] rounded-full"
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* اسم السورة والمعلومات */}
        <div className="text-center mb-6 relative z-10">
          <h3 className="text-2xl font-reem font-bold text-white mb-1 tracking-wide">
            سورة {surah?.name || 'الفاتحة'}
          </h3>
          <p className="text-stone-400 text-xs font-arabic flex items-center justify-center gap-1.5">
            <Mic2 size={12} className="text-[#d4af37]" />
            <span>تلاوة الشيخ محمد صديق المنشاوي</span>
          </p>
        </div>

        {/* القائمة المنسدلة الاحترافية المخصصة (Custom Dropdown) بدلاً من الـ select الافتراضي */}
        <div className="mb-6 relative z-30" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-white font-reem text-base flex items-center justify-between shadow-inner focus:border-[#d4af37]/40 transition-colors"
            dir="rtl"
          >
            <span className="text-[#d4af37]">{surahId}. {surah?.name}</span>
            <ChevronDown size={18} className={`text-stone-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute w-full mt-2 max-h-48 overflow-y-auto bg-[#05231c] border border-white/10 rounded-xl shadow-2xl z-50 scrollbar-thin scrollbar-thumb-white/10"
                dir="rtl"
              >
                {surahs.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      playSurah(s.id, reciterType, isPlaying);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-right px-4 py-2.5 text-sm font-reem transition-colors flex items-center justify-between ${
                      s.id === surahId ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'text-stone-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{s.id}. {s.name}</span>
                    {s.id === surahId && <Check size={14} className="text-[#d4af37]" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* شريط التقدم */}
        <div className="mb-6 relative z-10">
          <ProgressBar
            progress={progress}
            duration={duration}
            onSeek={seekTo}
            formatTime={formatTime}
          />
        </div>

        {/* أزرار التحكم والعمليات */}
        <div className="flex items-center justify-between gap-4 relative z-10">
          {/* الإجراءات السريعة */}
          <div className="flex gap-2">
            {
              isAuthenticated && (
                <button
                  onClick={toggleFavorite}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                    isFavorite
                      ? 'bg-rose-500/20 border-rose-500/30 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                      : 'bg-white/5 border-white/10 text-stone-400 hover:text-rose-500 hover:border-rose-500/20'
                  }`}
                  title={isFavorite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                >
                  <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
                </button>
              )
            }
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-stone-400 hover:text-[#d4af37] hover:border-[#d4af37]/30 flex items-center justify-center transition-all"
              title="مشاركة السورة"
            >
              <Share2 size={16} />
            </button>
            <a
              href={surah?.url}
              download={`سورة_${surah?.name}.mp3`}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-stone-400 hover:text-[#d4af37] hover:border-[#d4af37]/30 flex items-center justify-center transition-all"
              title="تحميل السورة"
            >
              <Download size={16} />
            </a>
            
            {/* Speed Selector Toggle */}
            <button
              onClick={() => {
                const speeds = [1.0, 1.25, 1.5, 2.0];
                const currentIndex = speeds.indexOf(playbackSpeed);
                const nextIndex = (currentIndex + 1) % speeds.length;
                changeSpeed(speeds[nextIndex]);
              }}
              className="w-12 h-10 rounded-xl bg-white/5 border border-white/10 text-[#d4af37] border-[#d4af37]/20 hover:text-white hover:border-white/20 flex items-center justify-center transition-all font-sans text-xs font-bold"
              title="سرعة التشغيل"
            >
              {playbackSpeed}x
            </button>
          </div>

          {/* أزرار التحكم في الصوت */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={prevSurah}
              disabled={surahId === 1}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-stone-300 hover:text-[#d4af37] hover:border-[#d4af37]/25 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              title="السورة السابقة"
            >
              <SkipForward size={16} />
            </button>

            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-xl bg-[#d4af37] text-[#05231c] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)]"
              title={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
            >
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="translate-x-0.5" />}
            </button>

            <button
              onClick={nextSurah}
              disabled={surahId === surahs.length}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-stone-300 hover:text-[#d4af37] hover:border-[#d4af37]/25 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              title="السورة التالية"
            >
              <SkipBack size={16} />
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  )
}