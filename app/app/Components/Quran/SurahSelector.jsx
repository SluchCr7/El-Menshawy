"use client"
import React from 'react'
import { ChevronDown, ListMusic } from 'lucide-react'

export default function SurahSelector({ surahId, setSurahId, surahs }) {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
            <ListMusic size={16} />
          </div>
          <label className="text-white font-reem text-xl">قائمة السور</label>
        </div>
        <span className="text-accent/40 text-[10px] font-sans uppercase tracking-[0.3em] font-bold">Heritage Library</span>
      </div>

      <div className="relative group">
        <select
          value={surahId}
          onChange={(e) => setSurahId(Number(e.target.value))}
          className="w-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 text-white text-2xl font-reem appearance-none cursor-pointer focus:outline-none focus:border-accent/50 focus:bg-white/10 group-hover:bg-white/10 transition-all text-right pr-6 shadow-xl"
          dir="rtl"
        >
          {surahs.map((surah) => (
            <option
              key={surah.id}
              value={surah.id}
              className="bg-[#041E18] text-white p-4"
            >
              {surah.id}. {surah.name}
            </option>
          ))}
        </select>

        <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none text-accent group-hover:scale-110 transition-transform bg-white/5 p-2 rounded-xl border border-white/10">
          <ChevronDown size={20} />
        </div>

        {/* Shine effect on selector */}
        <div className="absolute top-0 right-0 w-1/2 h-[1px] bg-gradient-to-l from-accent/30 to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

