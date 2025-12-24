'use client'
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sheikhAlMinshawi, menshQuran } from '@/app/utils/Data'
import PlayerControls from '@/app/Components/Quran/PlayersControl'
import ProgressBar from '@/app/Components/Quran/ProgressBar'
import SurahSelector from '@/app/Components/Quran/SurahSelector'
import { PlayCircle, Music2, Headphones, Sparkles, Volume2 } from 'lucide-react'
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
    <div className="relative w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-primary-dark/40 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 border border-accent/20 shadow-[0_20px_50px_rgba(6,45,36,0.5)] overflow-hidden"
      >
        {/* Animated Glow in background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 blur-[120px] rounded-full animate-pulse pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">

          {/* Left Side: Visualizer & Info */}
          <div className="w-full lg:w-1/3 flex flex-col items-center">
            <div className="relative w-64 h-64 md:w-72 md:h-72 mb-8 group">
              {/* Outer Ring */}
              <div className="absolute inset-0 border-2 border-accent/30 rounded-full animate-spin-slow group-hover:border-accent transition-colors" />
              <div className="absolute inset-4 border border-accent/10 rounded-full" />

              {/* Image Circle */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-accent shadow-2xl relative">
                <Image
                  src="/assets/sediq1.jpg"
                  alt="Sheikh El-Minshawi"
                  fill
                  className={`object-cover transition-transform duration-700 ${isPlaying ? 'scale-110' : 'scale-100'}`}
                />
                {/* Visualizer Overlay */}
                <AnimatePresence>
                  {isPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-primary/30 flex items-center justify-center"
                    >
                      <div className="flex gap-1 h-12 items-end">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ height: ['20%', '100%', '40%', '80%', '30%'] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                            className="w-1.5 bg-accent rounded-full"
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-reem font-bold text-accent mb-2">{surah?.name || 'سورة'}</h3>
              <p className="text-sand/60 font-sans tracking-widest text-xs uppercase">Sheikh Mohamed Siddiq El-Minshawi</p>
            </div>
          </div>

          {/* Right Side: Navigation & Controls */}
          <div className="w-full lg:w-2/3 flex flex-col justify-center">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Volume2 size={20} />
                </div>
                <span className="text-sand/80 font-reem text-lg">بث مباشر بجودة عالية</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="text-accent" size={16} />
                <span className="text-accent/80 font-sans text-xs uppercase tracking-widest">Heritage Recording</span>
              </div>
            </div>

            <SurahSelector surahId={surahId} setSurahId={setSurahId} surahs={menshQuran} />

            <div className="mt-12">
              <ProgressBar
                progress={progress}
                duration={duration}
                setProgress={setProgress}
                audioRef={audioRef}
                formatTime={formatTime}
              />
            </div>

            <div className="mt-8 flex justify-center">
              <PlayerControls
                isPlaying={isPlaying}
                togglePlay={togglePlay}
                nextSurah={nextSurah}
                prevSurah={prevSurah}
                surahId={surahId}
                surahs={menshQuran}
              />
            </div>
          </div>
        </div>
      </motion.div>
      <audio ref={audioRef} className="hidden" preload="auto" />
    </div>
  )
}
