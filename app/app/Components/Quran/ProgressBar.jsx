"use client"
import React from "react"

export default function ProgressBar({ progress, duration, setProgress, audioRef, formatTime }) {
  const handleSeek = (e) => {
    const newTime = Number(e.target.value)
    setProgress(newTime)
    if (audioRef.current) {
      // التأكد من أن المشغل لا يتوقف عند السحب
      audioRef.current.currentTime = newTime
    }
  }
  const progressPercent = (progress / (duration || 1)) * 100;
  return (
    <div className="w-full mt-8">
      {/* شريط التقدم بتصميم مدمج وأنيق */}
      <input
        type="range"
        min="0"
        max={duration > 0 ? duration : 0}
        value={progress}
        step="0.1"
        onChange={handleSeek}
        // Tailwind CSS: شريط التقدم بلون الخلفية الداكن وبصمة (thumb) بلون أخضر
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer 
          [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:bg-gray-700 [&::-webkit-slider-runnable-track]:rounded-lg
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg
          
          [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-500 [&::-moz-range-thumb]:cursor-pointer
          transition-all duration-300"
        style={{
          // استخدام linear-gradient لتلوين الجزء المتقدم من الشريط
          background: `linear-gradient(to right, #10b981 ${progressPercent}%, #374151 ${progressPercent}%)`,
        }}
      />

      {/* الوقت - بخطوط نظيفة ومتباعدة */}
      <div className="flex justify-between text-sm font-mono text-gray-400 mt-2">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  )
}