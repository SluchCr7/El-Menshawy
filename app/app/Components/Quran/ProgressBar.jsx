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
    <div className="w-full">
      <div className="relative h-6 flex items-center group cursor-pointer">
        {/* custom slider mimic */}
        <div className="absolute w-full h-1.5 bg-accent/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent relative"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-2xl scale-0 group-hover:scale-100 transition-transform border-4 border-accent" />
          </motion.div>
        </div>

        <input
          type="range"
          min="0"
          max={duration > 0 ? duration : 0}
          value={progress || 0}
          step="0.1"
          onChange={handleSeek}
          className="absolute w-full h-full opacity-0 cursor-pointer z-10"
        />
      </div>

      <div className="flex justify-between items-center mt-3 text-xs font-sans tracking-widest uppercase">
        <span className="text-accent/60 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          {formatTime(progress)}
        </span>
        <span className="text-sand/40">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  )
}