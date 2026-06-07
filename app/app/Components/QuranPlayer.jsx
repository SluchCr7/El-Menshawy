'use client'
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { menshQuran, menshQuranMurattal } from '@/app/utils/Data'
import PlayerControls from '@/app/Components/Quran/PlayersControl'
import ProgressBar from '@/app/Components/Quran/ProgressBar'
import SurahSelector from '@/app/Components/Quran/SurahSelector'
import { Headphones, Sparkles, Music, Mic2, Star, Heart, Share2, Download, Flame } from 'lucide-react'
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
    <div className="relative w-full max-w-6xl mx-auto px-4 py-8">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-accent/15 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-primary/25 blur-[120px] rounded-full animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 bg-gradient-to-br from-primary-dark via-[#05251d] to-[#041a15] backdrop-blur-3xl rounded-[3.5rem] p-6 md:p-12 border border-accent/25 shadow-[0_30px_100px_rgba(4,30,24,0.7)] overflow-hidden"
      >
        {/* Traditional Border Frame overlay */}
        <div className="absolute inset-4 border border-accent/10 rounded-[2.5rem] pointer-events-none" />
        <div className="absolute inset-6 border border-accent/5 rounded-[2.3rem] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02] bg-islamic-pattern bg-repeat pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row gap-12 xl:items-stretch">

          {/* Left Side: Artwork, Progress Ring & Dynamic Audio Wave */}
          <div className="w-full xl:w-1/2 flex flex-col items-center justify-center py-6">
            <div className="relative group">
              {/* Spinning outer rings */}
              <div className="absolute -inset-6 border border-accent/10 rounded-full animate-spin-slow opacity-60" />
              <div className="absolute -inset-10 border border-accent/5 rounded-full animate-[spin_40s_linear_infinite_reverse] opacity-40" />

              {/* Artwork circular frame */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-90 lg:h-90 rounded-full p-2.5 bg-gradient-to-tr from-accent/30 via-transparent to-accent/10 shadow-2xl overflow-hidden">
                <div className="w-full h-full rounded-full overflow-hidden relative inner-shadow-lg bg-primary-dark">
                  <Image
                    src="/assets/minshawi_pro.png"
                    alt="Sheikh Mohamed Siddiq El-Minshawi"
                    fill
                    className={`object-cover transition-transform duration-[3000ms] ease-out ${isPlaying ? 'scale-110' : 'scale-100'}`}
                    priority
                  />

                  {/* Radial shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                  {/* SVG Playback Progress circular border */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="48.5%"
                      fill="none"
                      stroke="rgba(212, 175, 55, 0.1)"
                      strokeWidth="5"
                    />
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="48.5%"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="5"
                      strokeDasharray="100 100"
                      animate={{ strokeDashoffset: 100 - (progress / (duration || 1)) * 100 }}
                      className="text-accent"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Centered Waveform Visualizer */}
                  <AnimatePresence>
                    {isPlaying && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-primary-dark/30 backdrop-blur-[1px]"
                      >
                        <div className="flex gap-1.5 h-16 items-end pb-2">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ height: ['25%', '100%', '35%', '85%', '20%', '95%', '50%'] }}
                              transition={{ duration: 0.5 + i * 0.08, repeat: Infinity, ease: "easeInOut" }}
                              className="w-1.5 bg-gradient-to-t from-accent to-accent-light rounded-full shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Decorative badges */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-accent to-accent-dark text-primary p-3 rounded-2xl shadow-xl transform rotate-12 hidden md:block border border-white/20">
                <Star size={18} fill="#062D24" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary-light border border-accent/30 text-accent px-4 py-2 rounded-2xl shadow-xl hidden md:block">
                <span className="text-[10px] font-sans tracking-widest font-bold uppercase">Heritage Audio</span>
              </div>
            </div>
          </div>

          {/* Right Side: Collection Selectors, Info & Control Deck */}
          <div className="w-full xl:w-1/2 flex flex-col justify-between py-6 relative z-20">
            <div>
              {/* Audio Deck Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center text-accent border border-accent/20 shadow-inner">
                    <Headphones size={20} />
                  </div>
                  <div className="text-right">
                    <h4 className="text-accent-light font-sans text-[10px] uppercase tracking-[0.25em] font-bold">Now Playing</h4>
                    <p className="text-sand/80 font-reem text-base">تراث الشيخ المنشاوي</p>
                  </div>
                </div>
                
                {/* Mojawwad vs Murattal Toggle Deck */}
                <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/10 shadow-inner font-reem">
                  <button
                    onClick={() => { setReciterType('mojawwad'); setSurahId(1); setIsPlaying(false); }}
                    className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                      reciterType === 'mojawwad'
                        ? 'bg-accent text-primary shadow-lg font-bold'
                        : 'text-cream/50 hover:text-cream'
                    }`}
                  >
                    مجوّد
                  </button>
                  <button
                    onClick={() => { setReciterType('murattal'); setSurahId(1); setIsPlaying(false); }}
                    className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                      reciterType === 'murattal'
                        ? 'bg-accent text-primary shadow-lg font-bold'
                        : 'text-cream/50 hover:text-cream'
                    }`}
                  >
                    مرتّل
                  </button>
                </div>
              </div>

              {/* Large Title Section */}
              <div className="mb-10 text-right xl:text-left">
                <motion.h2
                  key={`${reciterType}-${surahId}`}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-6xl md:text-7xl font-reem font-bold text-white mb-3 leading-tight"
                >
                  {surah?.name || 'سورة'}
                </motion.h2>
                <div className="flex items-center gap-4 text-accent/60">
                  <div className="h-px w-12 bg-accent/20" />
                  <p className="font-arabic text-sand/80 text-lg flex items-center gap-2">
                    {reciterType === 'mojawwad' ? <Mic2 size={16} /> : <Music size={16} />}
                    <span>تلاوة فضيلة الشيخ محمد صديق المنشاوي</span>
                  </p>
                </div>
              </div>

              {/* Deck Surah Selector */}
              <div className="space-y-6">
                <SurahSelector surahId={surahId} setSurahId={setSurahId} surahs={surahs} />
              </div>
            </div>

            {/* Audio Deck Control Board */}
            <div className="mt-10 p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 shadow-inner">
              <ProgressBar
                progress={progress}
                duration={duration}
                setProgress={setProgress}
                audioRef={audioRef}
                formatTime={formatTime}
              />

              <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Secondary Actions (Heart & Share) */}
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={toggleFavorite}
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
                      isFavorite
                        ? 'bg-rose-500/20 border-rose-500/40 text-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                        : 'bg-white/5 border-white/10 text-white/50 hover:text-rose-500 hover:border-rose-500/40'
                    }`}
                    title={isFavorite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                  >
                    <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-accent hover:border-accent/40 flex items-center justify-center transition-all"
                    title="مشاركة السورة"
                  >
                    <Share2 size={20} />
                  </button>

                  <a
                    href={surah.url}
                    download
                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-accent hover:border-accent/40 flex items-center justify-center transition-all"
                    title="تحميل الملف الصوتي"
                  >
                    <Download size={20} />
                  </a>
                </div>

                {/* Primary Player Buttons */}
                <div className="flex-1 max-w-xs mx-auto md:mx-0">
                  <PlayerControls
                    isPlaying={isPlaying}
                    togglePlay={togglePlay}
                    nextSurah={nextSurah}
                    prevSurah={prevSurah}
                    surahId={surahId}
                    surahs={surahs}
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-accent/40">
                <div className="flex items-center gap-2">
                  <Headphones size={13} />
                  <span className="text-[9px] uppercase tracking-widest font-bold">Best in Headphones</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-accent/20" />
                <div className="flex items-center gap-2">
                  <Sparkles size={13} />
                  <span className="text-[9px] uppercase tracking-widest font-bold">Digital Remastered</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
      <audio ref={audioRef} className="hidden" preload="auto" />
    </div>
  )
}
