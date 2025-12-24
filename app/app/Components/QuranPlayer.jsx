'use client'
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { menshQuran } from '@/app/utils/Data'
import PlayerControls from '@/app/Components/Quran/PlayersControl'
import ProgressBar from '@/app/Components/Quran/ProgressBar'
import SurahSelector from '@/app/Components/Quran/SurahSelector'
import { Headphones, Sparkles, Volume2, Music, Mic2, Star } from 'lucide-react'
import Image from 'next/image'

export default function QuranPlayer() {
  const [surahId, setSurahId] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  const surah = menshQuran.find((s) => s.id === surahId)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !surah) return
    audio.src = surah.url
    audio.load()
    if (isPlaying) {
      audio.play().catch(console.warn)
    }
  }, [surahId])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const update = () => setProgress(audio.currentTime)
    const loaded = () => setDuration(audio.duration || 0)
    const ended = () => {
      setIsPlaying(false)
      if (surahId < menshQuran.length) setSurahId(surahId + 1)
    }

    audio.addEventListener('timeupdate', update)
    audio.addEventListener('loadedmetadata', loaded)
    audio.addEventListener('ended', ended)
    return () => {
      audio.removeEventListener('timeupdate', update)
      audio.removeEventListener('loadedmetadata', loaded)
      audio.removeEventListener('ended', ended)
    }
  }, [surahId])

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

  const nextSurah = () => surahId < menshQuran.length && setSurahId(surahId + 1)
  const prevSurah = () => surahId > 1 && setSurahId(surahId - 1)

  const formatTime = (s) => {
    if (!s) return '00:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-8">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-accent/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-primary/30 blur-[120px] rounded-full animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 bg-gradient-to-br from-primary-dark/80 via-primary-dark/60 to-primary/40 backdrop-blur-3xl rounded-[4rem] p-6 md:p-12 border border-accent/20 shadow-[0_30px_100px_rgba(4,30,24,0.6)] overflow-hidden"
      >
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-islamic-pattern bg-repeat pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row gap-12 xl:items-stretch">

          {/* Left Side: Artwork & Visualizer */}
          <div className="w-full xl:w-1/2 flex flex-col items-center justify-center">
            <div className="relative group">
              {/* Outer Glowing Rings */}
              <div className="absolute -inset-4 border border-accent/10 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute -inset-8 border border-accent/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />

              {/* Main Image Container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full p-2 bg-gradient-to-tr from-accent/40 to-transparent shadow-2xl overflow-hidden">
                <div className="w-full h-full rounded-full overflow-hidden relative inner-shadow-lg">
                  <Image
                    src="/assets/minshawi_pro.png"
                    alt="Sheikh Mohamed Siddiq El-Minshawi"
                    fill
                    className={`object-cover transition-transform duration-[2000ms] ease-out ${isPlaying ? 'scale-110' : 'scale-100'}`}
                    priority
                  />

                  {/* Dynamic Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-700 ${isPlaying ? 'opacity-40' : 'opacity-60'}`} />

                  {/* Playback Progress Circular Ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="49%"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="text-accent/20"
                    />
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="49%"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeDasharray="100 100"
                      animate={{ strokeDashoffset: 100 - (progress / (duration || 1)) * 100 }}
                      className="text-accent"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Centered Visualizer Bars */}
                  <AnimatePresence>
                    {isPlaying && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-primary/20 backdrop-blur-[2px]"
                      >
                        <div className="flex gap-1.5 h-16 items-end pb-4">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ height: ['20%', '100%', '40%', '80%', '30%', '90%', '50%'] }}
                              transition={{ duration: 0.6 + i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                              className="w-2 bg-gradient-to-t from-accent to-accent-light rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Badges/Floating elements */}
              <div className="absolute -top-4 -right-4 bg-accent text-primary p-3 rounded-2xl shadow-xl transform rotate-12 hidden md:block">
                <Star size={20} fill="#062D24" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary-light border border-accent/30 text-accent px-4 py-2 rounded-2xl shadow-xl hidden md:block">
                <span className="text-sm font-bold tracking-tighter uppercase">Studio Quality</span>
              </div>
            </div>
          </div>

          {/* Right Side: Navigation, Info & Controls */}
          <div className="w-full xl:w-1/2 flex flex-col justify-between py-4">
            <div>
              {/* Header Info */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4 group cursor-default">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent border border-accent/20 group-hover:bg-accent group-hover:text-primary transition-all duration-500 shadow-inner">
                    <Mic2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-accent-light font-sans text-xs uppercase tracking-[0.3em] font-bold">Now Playing</h4>
                    <p className="text-sand/80 font-reem text-lg">المنشاوي - تجويد نادر</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-accent/60 font-sans text-[10px] uppercase tracking-widest">Heritage Level</span>
                    <span className="text-sand font-bold text-xs">GOLD SERIES</span>
                  </div>
                  <Sparkles className="text-accent animate-pulse" size={24} />
                </div>
              </div>

              {/* Surah Title Large */}
              <div className="mb-10 text-right xl:text-left">
                <motion.h2
                  key={surah?.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-6xl md:text-8xl font-reem font-bold text-white/95 mb-4 leading-tight"
                >
                  {surah?.name || 'سورة'}
                </motion.h2>
                <div className="flex items-center gap-4 text-accent/60">
                  <div className="h-px w-12 bg-accent/20" />
                  <p className="font-sans tracking-[0.2em] text-sm uppercase">Mohamed Siddiq El-Minshawi</p>
                </div>
              </div>

              {/* Selectors */}
              <div className="space-y-6">
                <SurahSelector surahId={surahId} setSurahId={setSurahId} surahs={menshQuran} />
              </div>
            </div>

            {/* Bottom Controls Area */}
            <div className="mt-12 xl:mt-0 p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 shadow-inner">
              <ProgressBar
                progress={progress}
                duration={duration}
                setProgress={setProgress}
                audioRef={audioRef}
                formatTime={formatTime}
              />

              <div className="mt-10">
                <PlayerControls
                  isPlaying={isPlaying}
                  togglePlay={togglePlay}
                  nextSurah={nextSurah}
                  prevSurah={prevSurah}
                  surahId={surahId}
                  surahs={menshQuran}
                />
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-accent/40">
                <div className="flex items-center gap-2">
                  <Headphones size={14} />
                  <span className="text-[10px] uppercase tracking-widest">Best in Audio</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-accent/20" />
                <div className="flex items-center gap-2">
                  <Music size={14} />
                  <span className="text-[10px] uppercase tracking-widest">Hi-Res Audio</span>
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

