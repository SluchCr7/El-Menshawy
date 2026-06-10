'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Sun, Moon, RotateCcw, Play, Pause, Check, Volume2, BookOpen, Compass, Award } from 'lucide-react';

// Selected daily Quranic verses (Minshawi audio recitations from Quran.com)
const dailyVerses = [
  {
    text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
    reference: "سورة البقرة - الآية 255",
    translation: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.",
    verseKey: "2:255"
  },
  {
    text: "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ الَّليْلِ وَالنَّهَارِ لَآيَاتٍ لِّأُولِي الْأَلْبَابِ",
    reference: "سورة آل عمران - الآية 190",
    translation: "Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding.",
    verseKey: "3:190"
  },
  {
    text: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ ۖ فَلْيَسْتَجِيبُوا لِي وَلْيُؤْمِنُوا بِي لَعَلَّهُمْ يَرْشُدُونَ",
    reference: "سورة البقرة - الآية 186",
    translation: "And when My servants ask you concerning Me, indeed I am near. I respond to the invocation of the supplicant when he calls upon Me. So let them respond to Me and believe in Me that they may be guided.",
    verseKey: "2:186"
  },
  {
    text: "هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ ۖ عَالِمُ الْغَيْبِ وَالشَّهَادَةِ ۖ هُوَ الرَّحْمَٰنُ الرَّحِيمُ",
    reference: "سورة الحشر - الآية 22",
    translation: "He is Allah, other than whom there is no deity, Knower of the unseen and the witnessed. He is the Entirely Merciful, the Especially Merciful.",
    verseKey: "59:22"
  }
];

const morningAzkar = [
  { id: 'm1', text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ.", count: 1, maxCount: 1 },
  { id: 'm2', text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ.", count: 1, maxCount: 1 },
  { id: 'm3', text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ: عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ.", count: 3, maxCount: 3 },
  { id: 'm4', text: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ.", count: 3, maxCount: 3 },
  { id: 'm5', text: "رَضِيتُ بِاللَّهِ رَبَّاً، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صلى الله عليه وسلم نَبِيَّاً.", count: 3, maxCount: 3 }
];

const eveningAzkar = [
  { id: 'e1', text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ.", count: 1, maxCount: 1 },
  { id: 'e2', text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ.", count: 1, maxCount: 1 },
  { id: 'e3', text: "اللَّهُمَّ عافِني في بَدَني، اللَّهُمَّ عافِني في سَمْعي، اللَّهُمَّ عافِني في بَصَري، لا إلهَ إلاَّ أنْتَ.", count: 3, maxCount: 3 },
  { id: 'e4', text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ، وَالفَقْرِ، وَأَعُوذُ بِكَ مِنْ عَذَابِ القَبْرِ، لا إلهَ إلاَّ أنْتَ.", count: 3, maxCount: 3 },
  { id: 'e5', text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ.", count: 3, maxCount: 3 }
];

const dhikrTemplates = [
  "سُبْحَانَ اللَّهِ",
  "الْحَمْدُ لِلَّهِ",
  "لَا إِلَٰهَ إِلَّا اللَّهُ",
  "اللَّهُ أَكْبَرُ",
  "أَسْتَغْفِرُ اللَّهَ",
  "صَلَّى اللَّهُ عَلَىٰ مُحَمَّدٍ"
];

export default function DhikrPage() {
  const [selectedDhikr, setSelectedDhikr] = useState(dhikrTemplates[0]);
  const [tasbihCount, setTasbihCount] = useState(0);
  const [azkarTab, setAzkarTab] = useState('morning'); // 'morning' or 'evening'
  const [activeAzkarList, setActiveAzkarList] = useState(morningAzkar);
  const [verseIndex, setVerseIndex] = useState(0);
  const [playingVerse, setPlayingVerse] = useState(false);
  const [verseAudio, setVerseAudio] = useState(null);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Set daily verse index based on day of month
  useEffect(() => {
    const day = new Date().getDate();
    setVerseIndex(day % dailyVerses.length);
  }, []);

  // Update active list when tab changes
  useEffect(() => {
    setActiveAzkarList(azkarTab === 'morning' ? [...morningAzkar] : [...eveningAzkar]);
  }, [azkarTab]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (verseAudio) {
        verseAudio.pause();
      }
    };
  }, [verseAudio]);

  const handleDecrementZikr = (id) => {
    setActiveAzkarList(prev =>
      prev.map(item => {
        if (item.id === id && item.count > 0) {
          playClickSound(900); // Higher frequency for Zikr ticks
          return { ...item, count: item.count - 1 };
        }
        return item;
      })
    );
  };

  const resetAzkar = () => {
    setActiveAzkarList(azkarTab === 'morning' 
      ? morningAzkar.map(item => ({ ...item })) 
      : eveningAzkar.map(item => ({ ...item }))
    );
  };

  // Synthesize digital tasbih clicking sound using Web Audio API
  const playClickSound = (frequency = 600) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime); // Subtle volume
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.08); // Decays quickly

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      console.warn("Audio Context beep synthesizer failed:", e);
    }
  };

  const handleTasbihTap = () => {
    setTasbihCount(prev => prev + 1);
    playClickSound(600); // Standard digital click frequency
  };

  const resetTasbih = () => {
    setTasbihCount(0);
    playClickSound(400); // Deep sound for reset
  };

  const handlePlayVerse = async (verseKey) => {
    if (playingVerse) {
      if (verseAudio) verseAudio.pause();
      setPlayingVerse(false);
      return;
    }

    setLoadingAudio(true);
    try {
      const recitationId = 4; // Sheikh Minshawi
      const response = await fetch(`https://api.quran.com/api/v4/recitations/${recitationId}/by_ayah/${verseKey}`);
      const data = await response.json();
      const mp3 = data.audio_files?.[0]?.url;

      if (mp3) {
        const fullUrl = mp3.startsWith('http') ? mp3 : `https://verses.quran.com/${mp3}`;
        const newAudio = new Audio(fullUrl);
        newAudio.play();
        setVerseAudio(newAudio);
        setPlayingVerse(true);
        newAudio.onended = () => setPlayingVerse(false);
      }
    } catch (err) {
      console.error("Failed to load verse audio", err);
    } finally {
      setLoadingAudio(false);
    }
  };

  const activeVerse = dailyVerses[verseIndex];

  return (
    <main className="min-h-screen bg-cream">
      {/* Page Header */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('/patterns/mashrabiya.svg')", backgroundSize: '300px' }}
        />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-cream to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-accent/10 border border-accent/20 mb-8 animate-pulse"
          >
            <Compass size={40} className="text-accent" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-reem font-bold text-white mb-6">الأذكار والورد اليومي</h1>
          <p className="text-sand/80 text-xl font-arabic max-w-2xl mx-auto leading-relaxed">
            الورد القرآني اليومي، أذكار الصباح والمساء التفاعلية، والمسبحة الإلكترونية المطورة.
          </p>
        </div>
      </section>

      {/* Main Sections Wrapper */}
      <section className="py-12 px-6 md:px-10 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Column 1 & 2: Daily Verse and Azkar Counters */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* 1. Daily Verse (الآية اليومية) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-spiritual-shadow border border-accent/15 relative overflow-hidden"
            >
              {/* Corner Ornaments */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-accent/30 rounded-tr-[2.5rem]" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-accent/30 rounded-bl-[2.5rem]" />

              <div className="flex items-center justify-between mb-8 border-b border-accent/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <BookOpen size={20} />
                  </div>
                  <h2 className="text-2xl font-reem font-bold text-primary">الورد القرآني اليومي</h2>
                </div>
                
                <button
                  onClick={() => handlePlayVerse(activeVerse.verseKey)}
                  disabled={loadingAudio}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    playingVerse 
                      ? 'bg-primary text-accent' 
                      : 'bg-accent text-primary hover:scale-105 shadow-md'
                  } disabled:opacity-50`}
                  title="استمع للآية بصوت الشيخ المنشاوي"
                >
                  {loadingAudio ? (
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : playingVerse ? (
                    <Pause size={18} fill="currentColor" />
                  ) : (
                    <Play size={18} fill="currentColor" className="translate-x-0.5" />
                  )}
                </button>
              </div>

              <div className="text-center md:text-right py-4 space-y-6">
                <p className="text-3xl md:text-4xl font-amiri leading-loose text-primary tracking-wide">
                  {activeVerse.text}
                </p>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-8 h-[1px] bg-accent/30" />
                  <span className="text-accent text-sm font-reem font-bold">{activeVerse.reference}</span>
                </div>
                <p className="text-stone-500 font-sans leading-relaxed text-sm text-right border-t border-accent/5 pt-6 bg-cream/30 p-4 rounded-2xl">
                  {activeVerse.translation}
                </p>
              </div>
            </motion.div>

            {/* 2. Interactive Azkar Card (أذكار الصباح والمساء التفاعلية) */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-spiritual-shadow border border-accent/15">
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-accent/10 pb-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <Award size={20} />
                  </div>
                  <h2 className="text-2xl font-reem font-bold text-primary">أذكار اليوم</h2>
                </div>

                <div className="flex bg-cream p-1.5 rounded-2xl border border-accent/10 font-reem">
                  <button
                    onClick={() => setAzkarTab('morning')}
                    className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                      azkarTab === 'morning' ? 'bg-primary text-accent shadow-md' : 'text-primary/60 hover:text-primary'
                    }`}
                  >
                    <Sun size={16} />
                    <span>أذكار الصباح</span>
                  </button>
                  <button
                    onClick={() => setAzkarTab('evening')}
                    className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                      azkarTab === 'evening' ? 'bg-primary text-accent shadow-md' : 'text-primary/60 hover:text-primary'
                    }`}
                  >
                    <Moon size={16} />
                    <span>أذكار المساء</span>
                  </button>
                </div>
              </div>

              {/* Azkar Checklist */}
              <div className="space-y-6">
                {activeAzkarList.map((item) => {
                  const isDone = item.count === 0;
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      onClick={() => handleDecrementZikr(item.id)}
                      className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-6 ${
                        isDone
                          ? 'bg-emerald-50/20 border-emerald-200 shadow-inner'
                          : 'bg-cream/20 border-accent/10 hover:border-accent/30 hover:bg-cream/40 shadow-sm'
                      }`}
                    >
                      <div className="text-right flex-1">
                        <p className={`text-lg md:text-xl font-amiri leading-relaxed ${isDone ? 'text-primary/50 line-through' : 'text-primary'}`}>
                          {item.text}
                        </p>
                      </div>

                      {/* Count Circle */}
                      <div className={`w-14 h-14 rounded-full flex flex-col items-center justify-center font-reem flex-shrink-0 transition-colors ${
                        isDone 
                          ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                          : 'bg-primary text-accent shadow-sm'
                      }`}>
                        {isDone ? (
                          <Check size={24} />
                        ) : (
                          <>
                            <span className="text-lg font-bold">{item.count}</span>
                            <span className="text-[8px] opacity-65 font-sans leading-none uppercase">REMAIN</span>
                          </>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={resetAzkar}
                  className="flex items-center gap-2 text-primary/50 hover:text-accent font-reem text-sm font-bold transition-colors py-2 px-4 hover:bg-cream/50 rounded-xl"
                >
                  <RotateCcw size={16} />
                  <span>إعادة تعيين الأذكار</span>
                </button>
              </div>

            </div>

          </div>

          {/* Column 3: Golden Tasbih Counter (المسبحة الإلكترونية) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-b from-[#05231c] to-[#02130f] border border-[#d4af37]/30 rounded-[2.5rem] p-8 text-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] text-white sticky top-28"
            >
              <div className="absolute inset-0 opacity-[0.02] bg-islamic-pattern bg-repeat rounded-[2.5rem] pointer-events-none" />

              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5 relative z-10">
                <h2 className="font-reem font-bold text-xl text-[#d4af37] flex items-center gap-2">
                  <Sparkles size={18} /> المسبحة الإلكترونية
                </h2>
                
                {/* Sound toggle */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-2 rounded-xl transition-all ${soundEnabled ? 'text-accent hover:bg-white/5' : 'text-stone-500 hover:bg-white/5'}`}
                  title={soundEnabled ? "إيقاف الصوت" : "تشغيل الصوت"}
                >
                  <Volume2 size={20} />
                </button>
              </div>

              {/* Select Dhikr Template */}
              <div className="mb-8 relative z-10 text-right">
                <label className="text-[10px] text-stone-400 font-reem block mb-2 mr-1">اختر الذكر المفضل:</label>
                <select
                  value={selectedDhikr}
                  onChange={(e) => {
                    setSelectedDhikr(e.target.value);
                    playClickSound(500);
                  }}
                  className="w-full bg-black/45 border border-white/10 rounded-xl p-3 text-[#d4af37] font-reem text-base focus:outline-none focus:border-[#d4af37]/50 shadow-inner"
                  dir="rtl"
                >
                  {dhikrTemplates.map((d, idx) => (
                    <option key={idx} value={d} className="bg-[#05231c] text-white">
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Counter Display Screen */}
              <div className="bg-black/40 border border-white/5 rounded-[2rem] p-8 mb-10 shadow-inner relative z-10">
                <span className="text-[10px] text-stone-400 font-sans tracking-[0.2em] uppercase block mb-1">TASBIH COUNT</span>
                <div className="text-6xl font-sans font-bold text-accent tracking-wider select-none">
                  {tasbihCount.toString().padStart(4, '0')}
                </div>
                <div className="mt-3 text-sm font-reem text-stone-300 min-h-6 truncate">
                  {selectedDhikr}
                </div>
              </div>

              {/* Big Golden Tap Button */}
              <div className="flex justify-center mb-8 relative z-10">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTasbihTap}
                  className="w-44 h-44 rounded-full bg-gradient-to-tr from-[#b3912b] via-[#e5c158] to-[#d4af37] text-[#05231c] flex items-center justify-center font-reem font-bold text-2xl shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] border-4 border-[#05231c] relative group transition-all"
                >
                  {/* Outer breathing ring */}
                  <div className="absolute -inset-2 rounded-full border border-[#d4af37]/20 group-hover:border-[#d4af37]/40 transition-colors animate-pulse" />
                  
                  <div className="flex flex-col items-center select-none">
                    <span className="text-3xl font-extrabold tracking-wide uppercase">اضغط</span>
                    <span className="text-[10px] tracking-widest opacity-60 font-sans">TAP HERE</span>
                  </div>
                </motion.button>
              </div>

              {/* Reset controls */}
              <div className="flex justify-center relative z-10">
                <button
                  onClick={resetTasbih}
                  className="flex items-center gap-2 text-stone-400 hover:text-accent font-reem text-sm font-bold transition-all py-2.5 px-6 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10"
                >
                  <RotateCcw size={16} />
                  <span>تصفير العداد</span>
                </button>
              </div>

            </motion.div>
          </div>

        </div>
      </section>

      <div className="py-20 flex justify-center opacity-10">
        <img src="/patterns/ornament-bottom.svg" className="w-64" alt="" />
      </div>
    </main>
  );
}
