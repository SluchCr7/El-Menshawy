"use client"
import React from 'react'
import { ChevronDown, Search } from 'lucide-react'

export default function SurahSelector({ surahId, setSurahId, surahs }) {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between px-2">
        <label className="text-accent font-reem text-lg">اختر السورة</label>
        <span className="text-sand/40 text-xs font-sans uppercase tracking-[0.2em]">{surahs.length} Surahs Available</span>
      </div>

      <div className="relative group">
        <select
          value={surahId}
          onChange={(e) => setSurahId(Number(e.target.value))}
          className="w-full bg-primary/20 backdrop-blur-xl border border-accent/20 rounded-2xl p-5 text-cream text-xl font-reem appearance-none cursor-pointer focus:outline-none focus:border-accent group-hover:bg-primary/30 transition-all text-right pr-6"
          dir="rtl"
        >
          {surahs.map((surah) => (
            <option
              key={surah.id}
              value={surah.id}
              className="bg-primary-dark text-cream p-4"
            >
              {surah.id}. {surah.name}
            </option>
          ))}
        </select>

        <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none text-accent group-hover:scale-110 transition-transform">
          <ChevronDown size={24} />
        </div>

        {/* Decorative corner glow */}
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-accent/30 rounded-tr-xl pointer-events-none" />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-accent/30 rounded-bl-xl pointer-events-none" />
      </div>
    </div>
  )
}
