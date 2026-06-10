'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, BookOpen, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const verses = [
  {
    text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
    reference: "سورة البقرة - الآية 255",
    verseKey: "2:255"
  },
  {
    text: "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ الَّليْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ",
    reference: "سورة آل عمران - الآية 190",
    verseKey: "3:190"
  },
  {
    text: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ ۖ فَلْيَسْتَجِيبُوا لِي وَلْيُؤْمِنُوا بِي لَعَلَّهُمْ يَرْشُدُونَ",
    reference: "سورة البقرة - الآية 186",
    verseKey: "2:186"
  }
];

export default function DailyVerseCard() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const day = new Date().getDate();
    setIndex(day % verses.length);
  }, []);

  useEffect(() => {
    return () => {
      if (audio) audio.pause();
    };
  }, [audio]);

  const handlePlay = async () => {
    if (playing) {
      if (audio) audio.pause();
      setPlaying(false);
      return;
    }

    setLoading(true);
    try {
      const recitationId = 4; // Minshawi
      const response = await fetch(`https://api.quran.com/api/v4/recitations/${recitationId}/by_ayah/${verses[index].verseKey}`);
      const data = await response.json();
      const mp3 = data.audio_files?.[0]?.url;

      if (mp3) {
        const fullUrl = mp3.startsWith('http') ? mp3 : `https://verses.quran.com/${mp3}`;
        const newAudio = new Audio(fullUrl);
        newAudio.play();
        setAudio(newAudio);
        setPlaying(true);
        newAudio.onended = () => setPlaying(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const verse = verses[index];

  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none"
        style={{ backgroundImage: "url('/patterns/mashrabiya.svg')", backgroundSize: '200px' }}
      />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[3rem] p-8 md:p-14 shadow-spiritual-shadow border border-accent/15 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
          {/* Corner Ornaments */}
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-accent/30 rounded-tr-[3rem]" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-accent/30 rounded-bl-[3rem]" />

          {/* Icon / Action Column */}
          <div className="flex flex-col items-center justify-center gap-4 flex-shrink-0">
            <button
              onClick={handlePlay}
              disabled={loading}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all ${
                playing 
                  ? 'bg-primary text-accent' 
                  : 'bg-accent text-primary hover:scale-105 shadow-[0_10px_25px_rgba(212,175,55,0.3)]'
              }`}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : playing ? (
                <Pause size={28} fill="currentColor" />
              ) : (
                <Play size={28} fill="currentColor" className="translate-x-0.5" />
              )}
            </button>
            <span className="text-[10px] font-sans tracking-[0.25em] text-primary/40 uppercase font-bold">Listen Now</span>
          </div>

          {/* Text Content Column */}
          <div className="flex-1 text-center md:text-right space-y-6">
            <div className="flex items-center gap-2 justify-center md:justify-start text-accent">
              <BookOpen size={16} />
              <span className="text-xs font-sans tracking-[0.3em] uppercase font-bold">Daily Verse</span>
            </div>
            
            <p className="text-2xl md:text-3xl font-amiri leading-loose text-primary">
              {verse.text}
            </p>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-accent/5 pt-6 mt-4">
              <span className="text-accent text-sm font-reem font-bold">{verse.reference}</span>
              
              <Link 
                href="/Dhikr"
                className="text-primary/70 hover:text-accent font-reem text-sm flex items-center gap-1 transition-colors font-bold group"
              >
                <span>الذهاب لصفحة الأذكار والورد</span>
                <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
