'use client'
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { menshQuran, menshQuranMurattal } from '@/app/utils/Data'
import ProgressBar from '@/app/Components/Quran/ProgressBar'
import { Play, Pause, SkipBack, SkipForward, Heart, Share2, Download, Headphones, Music, Mic2 } from 'lucide-react'
import Image from 'next/image'

export default function QuranPlayer() {
  const [reciterType, setReciterType] = useState('mojawwad') // 'mojawwad' or 'murattal'
  const [surahId, setSurahId] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const audioRef = useRef(null)

  const surahs = reciterType === 'mojawwad' ? menshQuran : menshQuranMurattal
  const surah = surahs.find((s) => s.id === surahId) || surahs[0]

  // Synchronize favorites state
  const checkFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('mensh_favorites') || '[]');
    const exists = favorites.some(fav => fav.id === surahId && fav.type === reciterType);
    setIsFavorite(exists);
  };

  useEffect(() => {
    checkFavorite();
    window.addEventListener('mensh_favorites_updated', checkFavorite);
    return () => {
      window.removeEventListener('mensh_favorites_updated', checkFavorite);
    };
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
        text: `استمع إلى سورة ${surah.name} بصوت الشيخ المنشاوي (${reciterType === 'mojawwad' ? 'تجويد' : 'ترتيل'}) بجودة عالية.`,
        url: playUrl,
      }).catch(console.warn);
    } else {
      navigator.clipboard.writeText(playUrl);
      alert("تم نسخ رابط الاستماع للسورة بنجاح!");
    }
  };

  // Load new audio source on Surah change
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !surah) return
    audio.src = surah.url
    audio.load()
    if (isPlaying) {
      audio.play().catch(console.warn)
    }
  }, [surahId, reciterType])

  // Track playback state & autoplay next
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const update = () => setProgress(audio.currentTime)
    const loaded = () => setDuration(audio.duration || 0)
    const ended = () => {
      setIsPlaying(false)
      if (surahId < surahs.length) {
        setSurahId(surahId + 1)
      } else {
        setSurahId(1) // Loop back to Fatiha
      }
    }

    audio.addEventListener('timeupdate', update)
    audio.addEventListener('loadedmetadata', loaded)
    audio.addEventListener('ended', ended)
    return () => {
      audio.removeEventListener('timeupdate', update)
      audio.removeEventListener('loadedmetadata', loaded)
      audio.removeEventListener('ended', ended)
    }
  }, [surahId, reciterType, surahs.length])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(console.warn)
    }
  }

  const nextSurah = () => surahId < surahs.length && setSurahId(surahId + 1)
  const prevSurah = () => surahId > 1 && setSurahId(surahId - 1)

  const formatTime = (s) => {
    if (!s) return '00:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  };

  return (
    <div className="relative w-full max-w-lg mx-auto pt-16 px-4">
      {/* Background soft glowing orb */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[2.5rem]">
        <div className="absolute top-1/4 -right-10 w-64 h-64 bg-accent/10 blur-[80px] rounded-full" />
        <div className="absolute bottom-1/4 -left-10 w-64 h-64 bg-primary/20 blur-[80px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 bg-gradient-to-b from-[#05231c]/95 to-[#031511]/95 border border-accent/20 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
      >
        {/* Subtle mashrabiya pattern overlay */}
        <div className="absolute inset-0 opacity-[0.01] bg-islamic-pattern bg-repeat pointer-events-none" />

        {/* Card Header: Type capsule */}
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex items-center gap-2 text-accent/60">
            <Headphones size={14} className="animate-pulse" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider">Studio Audio</span>
          </div>

          <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 shadow-inner font-reem">
            <button
              onClick={() => { setReciterType('mojawwad'); setSurahId(1); setIsPlaying(false); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                reciterType === 'mojawwad' ? 'bg-accent text-primary shadow-md' : 'text-cream/40 hover:text-cream'
              }`}
            >
              مجوّد
            </button>
            <button
              onClick={() => { setReciterType('murattal'); setSurahId(1); setIsPlaying(false); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                reciterType === 'murattal' ? 'bg-accent text-primary shadow-md' : 'text-cream/40 hover:text-cream'
              }`}
            >
              مرتّل
            </button>
          </div>
        </div>

        {/* Portrait Artwork Frame */}
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-6 border border-accent/10 shadow-lg bg-black/20 z-10">
          <Image
            src="/assets/minshawi_pro.png"
            alt="Sheikh Mohamed Siddiq El-Minshawi"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#031511] via-transparent to-transparent opacity-60" />

          {/* Simple impressive animated waveform overlay */}
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-4 left-4 right-4 flex gap-1 h-8 items-end justify-center bg-black/30 backdrop-blur-[2px] py-1.5 rounded-xl border border-white/5"
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ['25%', '100%', '35%', '85%', '20%', '65%', '45%'] }}
                    transition={{ duration: 0.5 + i * 0.08, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-1 bg-accent rounded-full"
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info Deck */}
        <div className="text-center mb-6 relative z-10">
          <h3 className="text-3xl font-reem font-bold text-white mb-1">
            سورة {surah?.name || 'الفاتحة'}
          </h3>
          <p className="text-sand/70 text-xs font-arabic flex items-center justify-center gap-1.5">
            {reciterType === 'mojawwad' ? <Mic2 size={12} className="text-accent" /> : <Music size={12} className="text-accent" />}
            <span>تلاوة الشيخ محمد صديق المنشاوي</span>
          </p>
        </div>

        {/* Dropdown selector */}
        <div className="mb-6 relative z-10">
          <select
            value={surahId}
            onChange={(e) => setSurahId(Number(e.target.value))}
            className="w-full bg-black/35 border border-white/10 rounded-2xl p-4 text-white font-reem text-lg appearance-none cursor-pointer text-center focus:outline-none focus:border-accent/40 transition-colors shadow-inner"
            dir="rtl"
          >
            {surahs.map((s) => (
              <option key={s.id} value={s.id} className="bg-[#031511] text-white text-right">
                {s.id}. {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Progress Section */}
        <div className="mb-8 relative z-10">
          <ProgressBar
            progress={progress}
            duration={duration}
            setProgress={setProgress}
            audioRef={audioRef}
            formatTime={formatTime}
          />
        </div>

        {/* Control deck row */}
        <div className="flex items-center justify-between gap-4 relative z-10">
          {/* Quick Actions (Favorites, Share, Download) */}
          <div className="flex gap-2">
            <button
              onClick={toggleFavorite}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                isFavorite
                  ? 'bg-rose-500/20 border-rose-500/30 text-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.15)]'
                  : 'bg-white/5 border-white/10 text-white/40 hover:text-rose-500 hover:border-rose-500/20'
              }`}
              title={isFavorite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
            >
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-accent hover:border-accent/20 flex items-center justify-center transition-all"
              title="مشاركة السورة"
            >
              <Share2 size={18} />
            </button>
            <a
              href={surah.url}
              download
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-accent hover:border-accent/20 flex items-center justify-center transition-all"
              title="تحميل السورة"
            >
              <Download size={18} />
            </a>
          </div>

          {/* Player controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSurah}
              disabled={surahId === 1}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-accent hover:border-accent/25 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              title="السورة السابقة"
            >
              <SkipForward size={18} />
            </button>

            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-2xl bg-accent text-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(212,175,55,0.25)]"
              title={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="translate-x-0.5" />}
            </button>

            <button
              onClick={nextSurah}
              disabled={surahId === surahs.length}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-accent hover:border-accent/25 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              title="السورة التالية"
            >
              <SkipBack size={18} />
            </button>
          </div>
        </div>

      </motion.div>
      <audio ref={audioRef} className="hidden" preload="auto" />
    </div>
  )
}
