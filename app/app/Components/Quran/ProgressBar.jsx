"use client"
import React from "react"
import { motion } from "framer-motion"

export default function ProgressBar({ progress, duration, setProgress, audioRef, formatTime }) {
  const handleSeek = (e) => {
    const newTime = Number(e.target.value)
    setProgress(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const progressPercent = (progress / (duration || 1)) * 100;

  return (
    <div className="w-full select-none">
      <div className="relative h-2 flex items-center group cursor-pointer mb-4">
        {/* Background Track */}
        <div className="absolute w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          {/* Progress Fill */}
          <motion.div
            className="h-full bg-gradient-to-r from-accent/60 to-accent shadow-[0_0_15px_rgba(212,175,55,0.4)] relative"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Floating Knob */}
        <motion.div
          className="absolute w-4 h-4 bg-white rounded-full shadow-xl border-4 border-accent z-20 pointer-events-none"
          style={{ left: `calc(${progressPercent}% - 8px)` }}
          initial={{ scale: 0 }}
          whileHover={{ scale: 1.2 }}
          animate={{ scale: progressPercent > 0 ? 1 : 0 }}
        />

        <input
          type="range"
          min="0"
          max={duration > 0 ? duration : 0}
          value={progress || 0}
          step="0.1"
          onChange={handleSeek}
          className="absolute w-full h-8 opacity-0 cursor-pointer z-30"
        />
      </div>

      <div className="flex justify-between items-center text-[10px] md:text-xs font-sans tracking-[0.2em] uppercase font-bold">
        <div className="flex items-center gap-3">
          <span className="text-accent">{formatTime(progress)}</span>
          <div className="w-1 h-1 rounded-full bg-accent/30" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1 h-1 rounded-full bg-accent/30" />
          <span className="text-white/40">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}
