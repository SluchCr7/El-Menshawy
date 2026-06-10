"use client";

import React, { useEffect, useState } from "react";
import { menshQuran, menshQuranMurattal } from "@/app/utils/Data";
import { Play, Pause, Download, SkipForward, SkipBack, Headphones, Share2, ArrowLeft, Heart } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useAudio } from "@/app/utils/AudioContext";
import { useAuth } from "@/app/utils/AuthContext";

const Page = ({ params }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { id } = params;

  const queryType = searchParams.get("type")?.toLowerCase();
  const type = queryType === "murattal" ? "murattal" : "mojawwad";
  const list = type === "murattal" ? menshQuranMurattal : menshQuran;
  const surahId = parseInt(id);
  const surah = list.find((s) => s.id === surahId);

  const {
    reciterType,
    currentSurahId,
    isPlaying,
    progress,
    duration,
    playbackSpeed,
    currentSurah,
    playSurah,
    togglePlay,
    seekTo,
    changeSpeed,
  } = useAudio();

  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  const nextSurah = list.find((s) => s.id === surahId + 1);
  const prevSurah = list.find((s) => s.id === surahId - 1);

  // Load the selected Surah globally if it is not already active
  useEffect(() => {
    if (surah && (currentSurahId !== surahId || reciterType !== type)) {
      // Load and autoplay when navigated directly
      playSurah(surahId, type, true);
    }
  }, [surahId, type, surah, currentSurahId, reciterType]);

  // Sync route URL if the global player advances (e.g. after track end)
  useEffect(() => {
    if (currentSurahId && currentSurahId !== surahId) {
      router.push(`/Play/${currentSurahId}?type=${reciterType}`);
    }
  }, [currentSurahId, surahId, reciterType, router]);

  // Synchronize Favorite status
  useEffect(() => {
    if (!surah) return;
    const favorites = JSON.parse(localStorage.getItem('mensh_favorites') || '[]');
    const exists = favorites.some(fav => fav.id === surahId && fav.type === type);
    setIsFavorite(exists);
  }, [surahId, type, surah]);

  const toggleFavorite = () => {
    if (!surah) return;
    const favorites = JSON.parse(localStorage.getItem('mensh_favorites') || '[]');
    let updated;
    if (isFavorite) {
      updated = favorites.filter(fav => !(fav.id === surahId && fav.type === type));
    } else {
      updated = [...favorites, { id: surahId, name: surah.name, type: type }];
    }
    localStorage.setItem('mensh_favorites', JSON.stringify(updated));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event('mensh_favorites_updated'));
  };

  const handleShare = () => {
    if (!surah) return;
    if (navigator.share) {
      navigator.share({
        title: `تلاوة سورة ${surah.name} بصوت الشيخ محمد صديق المنشاوي`,
        text: `استمع إلى تلاوة خاشعة لسورة ${surah.name} بصوت الشيخ محمد صديق المنشاوي (${type === 'murattal' ? 'مرتل' : 'مجود'}) بجودة عالية.`,
        url: window.location.href,
      }).catch(console.warn);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("تم نسخ رابط السورة لمشاركتها!");
    }
  };

  if (!surah) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-dark text-white p-6">
        <div className="text-center">
          <h2 className="text-3xl font-reem font-bold">السورة غير موجودة</h2>
          <Link href="/" className="mt-8 inline-block px-8 py-3 bg-accent text-primary rounded-xl font-bold">العودة للرئيسية</Link>
        </div>
      </div>
    );
  }

  const formatTime = (sec) => {
    if (!sec && sec !== 0) return "00:00";
    const total = Math.max(0, Number(sec) || 0);
    const m = Math.floor(total / 60);
    const s = Math.floor(total % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <main className="min-h-screen w-full relative overflow-hidden bg-primary-dark flex items-center justify-center py-20 px-6">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/islambg2.jpg"
          alt="Background"
          fill
          className="object-cover brightness-[0.2] scale-110 blur-sm"
        />
        <div className="absolute inset-0 bg-primary-dark/40 backdrop-blur-md" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="flex flex-col items-center">

          {/* Header Actions */}
          <div className="w-full flex justify-between items-center mb-12">
            <button onClick={() => router.back()} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-all">
              <ArrowLeft />
            </button>
            <div className="text-center">
              <span className="text-accent text-xs font-sans tracking-[0.4em] uppercase block mb-1">Now Reciting</span>
              <h1 className="text-3xl md:text-5xl font-reem font-bold text-white tracking-wide">سورة {surah.name}</h1>
            </div>
            
            <div className="flex gap-3">
              {
                isAuthenticated && (
                  <button
                    onClick={toggleFavorite}
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                      isFavorite
                        ? 'bg-rose-500 border-transparent text-white'
                        : 'bg-white/5 border-white/10 text-white hover:bg-rose-500 hover:text-white'
                    }`}
                    title={isFavorite ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                  >
                    <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                  </button>
                )
              }
              <button
                onClick={handleShare}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-all"
                title="مشاركة السورة"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Main Player Display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-primary/40 backdrop-blur-3xl rounded-[4rem] p-10 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden"
          >
            {/* Decorative Mandala */}
            <div className="absolute -top-20 -right-20 w-80 h-80 opacity-5 pointer-events-none">
              <img src="/patterns/mandala-bg.svg" alt="" className="w-full h-full animate-spin-slow" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              {/* Visual Representation */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 mb-12">
                <div className="absolute inset-0 border-4 border-accent/20 rounded-full animate-pulse" />
                <div className="absolute inset-4 border-2 border-accent/10 rounded-full" />
                <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-accent shadow-2xl">
                  <Image
                    src="/assets/sediq1.jpg"
                    alt="Sheikh El-Minshawi"
                    fill
                    className={`object-cover transition-transform duration-[3s] ${isPlaying ? 'scale-110' : 'scale-100'}`}
                  />
                </div>
                {/* Animated Bars */}
                <AnimatePresence>
                  {isPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="flex gap-1.5 h-16 items-center">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{ height: [20, 60, 30, 80, 40] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                            className="w-1.5 bg-accent rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="px-3 py-1 bg-accent text-primary text-[10px] font-sans font-bold uppercase rounded-full tracking-widest">
                    {type === 'mojawwad' ? 'تجويد' : 'ترتيل'}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-sand/60 text-sm font-sans uppercase tracking-[0.2em]">Siddiq Al-Minshawi</span>
                </div>
                <h2 className="text-4xl font-amiri font-bold text-white mb-2">{surah.id}. {surah.name}</h2>
                <p className="text-accent/60 font-arabic">سورة من كتاب الله العزيز بخيّر الأصوات</p>
              </div>

              {/* Controls Area */}
              <div className="w-full space-y-12">
                {/* Progress */}
                <div className="w-full">
                  <div className="relative h-2 bg-white/10 rounded-full group cursor-pointer">
                    <motion.div
                      className="h-full bg-accent rounded-full relative"
                      style={{ width: `${(progress / (duration || 1)) * 100}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-4 border-accent shadow-xl scale-0 group-hover:scale-100 transition-transform" />
                    </motion.div>
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      step="0.1"
                      value={progress || 0}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        seekTo(val);
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-4 text-xs font-sans tracking-widest text-sand/40">
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Main Controls */}
                <div className="flex items-center justify-center gap-10 md:gap-16">
                  <button
                    disabled={!prevSurah}
                    onClick={() => router.push(`/Play/${surahId - 1}?type=${type}`)}
                    className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all disabled:opacity-20"
                    title="السورة السابقة"
                  >
                    <SkipForward size={24} />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-24 h-24 rounded-full bg-accent text-primary flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.3)] hover:scale-110 transition-transform active:scale-95"
                    title={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
                  >
                    {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="translate-x-1" />}
                  </button>

                  <button
                    disabled={!nextSurah}
                    onClick={() => router.push(`/Play/${surahId + 1}?type=${type}`)}
                    className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all disabled:opacity-20"
                    title="السورة التالية"
                  >
                    <SkipBack size={24} />
                  </button>
                </div>

                {/* Actions */}
                <div className="flex justify-center items-center gap-6">
                  <a
                    href={surah.url}
                    download={`سورة_${surah.name}.mp3`}
                    className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-reem hover:bg-white/10 transition-all"
                  >
                    <Download size={18} /> تحميل السورة
                  </a>

                  {/* Speed Controller */}
                  <button
                    onClick={() => {
                      const speeds = [1.0, 1.25, 1.5, 2.0];
                      const currentIndex = speeds.indexOf(playbackSpeed);
                      const nextIndex = (currentIndex + 1) % speeds.length;
                      changeSpeed(speeds[nextIndex]);
                    }}
                    className="flex items-center justify-center px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[#d4af37] font-sans font-bold hover:bg-white/10 transition-all"
                    title="سرعة التشغيل"
                  >
                    {playbackSpeed}x السرعة
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Page;
