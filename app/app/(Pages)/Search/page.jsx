'use client'
import React, { useState, useEffect } from 'react'
import { Play, Pause, Search, Music, Mic2, Star, Sparkles, X, MapPin, Calendar, Compass } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { menshQuran, menshQuranMurattal } from '../../utils/Data'
import { useAudio } from '../../utils/AudioContext'

const historicalRecitations = [
  { id: 1, name: "سورة الحشر والطارق", place: "مسجد السيدة زينب بالقاهرة", year: "1960", url: "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/059.mp3", surahId: 59, type: "mojawwad" },
  { id: 2, name: "سورة يوسف والرعد", place: "دولة الكويت", year: "1966", url: "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/012.mp3", surahId: 12, type: "mojawwad" },
  { id: 3, name: "سورة الإسراء والقصص", place: "المسجد الأقصى المبارك", year: "1964", url: "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/017.mp3", surahId: 17, type: "mojawwad" },
  { id: 4, name: "سورة مريم والقدر", place: "جامع بني أمية الكبير بدمشق", year: "1958", url: "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/019.mp3", surahId: 19, type: "mojawwad" },
  { id: 5, name: "سورة آل عمران", place: "جمهورية إندونيسيا", year: "1955", url: "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/003.mp3", surahId: 3, type: "mojawwad" },
  { id: 6, name: "سورة النجم والقمر", place: "مسجد الإمام الحسين بالقاهرة", year: "1962", url: "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/053.mp3", surahId: 53, type: "mojawwad" }
];

const normalizeArabic = (text) => {
  if (!text) return '';
  return text
    .replace(/[\u064B-\u065F]/g, "") // remove diacritics
    .replace(/[أإآا]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");
};

export default function SearchPage() {
  const {
    playSurah,
    togglePlay,
    currentSurahId,
    isPlaying: globalIsPlaying,
    reciterType,
  } = useAudio();

  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('surahs') // 'surahs', 'ayat', 'historical'
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [playingVerse, setPlayingVerse] = useState(null)
  const [localAudio, setLocalAudio] = useState(null)

  // Clear local audio when changing tab or query
  useEffect(() => {
    if (localAudio) {
      localAudio.pause();
      setLocalAudio(null);
      setPlayingVerse(null);
    }
  }, [activeTab]);

  // Perform search based on query & active tab
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    if (activeTab === 'ayat') {
      const timer = setTimeout(() => {
        performVerseSearch(query);
      }, 600);
      return () => clearTimeout(timer);
    } else if (activeTab === 'surahs') {
      performSurahSearch(query);
    } else if (activeTab === 'historical') {
      performHistoricalSearch(query);
    }
  }, [query, activeTab]);

  const performSurahSearch = (q) => {
    const normalizedQuery = normalizeArabic(q.trim());
    if (!normalizedQuery) return;

    // Search across mojawwad list (both lists have same Surah names/IDs)
    const filtered = menshQuran.filter(s => {
      if (/^\d+$/.test(normalizedQuery)) {
        return s.id.toString() === normalizedQuery;
      }
      return normalizeArabic(s.name).includes(normalizedQuery);
    });
    setResults(filtered);
  };

  const performHistoricalSearch = (q) => {
    const normalizedQuery = normalizeArabic(q.trim());
    if (!normalizedQuery) return;

    const filtered = historicalRecitations.filter(r => {
      return (
        normalizeArabic(r.name).includes(normalizedQuery) ||
        normalizeArabic(r.place).includes(normalizedQuery) ||
        r.year.includes(normalizedQuery)
      );
    });
    setResults(filtered);
  };

  const performVerseSearch = async (q) => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://api.quran.com/api/v4/search?q=${encodeURIComponent(q)}&language=ar`
      )
      const data = await res.json()
      setResults(data.search?.results || [])
    } catch (err) {
      console.error(err)
      setResults([])
    } finally {
      setLoading(false)
    }
  };

  // Play individual verse audio locally
  const playVerseAudio = (verseKey) => {
    const recitationId = 4; // Minshawi recitation ID on Quran.com
    const audioUrl = `https://api.quran.com/api/v4/recitations/${recitationId}/by_ayah/${verseKey}`;

    if (playingVerse === verseKey) {
      localAudio.pause();
      setPlayingVerse(null);
    } else {
      if (localAudio) localAudio.pause();
      
      // Pause global audio if playing to prevent dual sound
      if (globalIsPlaying) {
        togglePlay();
      }

      setLoading(true);
      fetch(audioUrl)
        .then(res => res.json())
        .then(data => {
          const mp3 = data.audio_files?.[0]?.url;
          if (mp3) {
            const fullUrl = mp3.startsWith('http') ? mp3 : `https://verses.quran.com/${mp3}`;
            const newAudio = new Audio(fullUrl);
            newAudio.play();
            setLocalAudio(newAudio);
            setPlayingVerse(verseKey);
            newAudio.onended = () => setPlayingVerse(null);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  };

  const handlePlayGlobalSurah = (surahId, type = 'mojawwad') => {
    if (localAudio) {
      localAudio.pause();
      setLocalAudio(null);
      setPlayingVerse(null);
    }
    
    if (currentSurahId === surahId && reciterType === type) {
      togglePlay();
    } else {
      playSurah(surahId, type, true);
    }
  };

  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('/patterns/mashrabiya.svg')", backgroundSize: '300px' }}
        />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-cream to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-accent/10 border border-accent/20 mb-8"
          >
            <Search size={40} className="text-accent" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-reem font-bold text-white mb-6">البحث والاستكشاف</h1>
          <p className="text-sand/80 text-xl font-arabic max-w-2xl mx-auto leading-relaxed">
            ابحث عن السور، أو كلمات الآيات الكريمة، أو استكشف التلاوات التاريخية النادرة للشيخ المنشاوي.
          </p>
        </div>
      </section>

      {/* Tabs Menu */}
      <section className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <div className="flex bg-white rounded-[2rem] p-2 shadow-xl border border-accent/10 mb-8 justify-around font-reem">
          <button
            onClick={() => { setActiveTab('surahs'); setQuery(''); setResults([]); }}
            className={`flex-1 py-4 text-center rounded-2xl transition-all duration-300 ${
              activeTab === 'surahs' ? 'bg-primary text-accent shadow-md' : 'text-primary/70 hover:bg-cream-dark'
            }`}
          >
            البحث في السور
          </button>
          <button
            onClick={() => { setActiveTab('ayat'); setQuery(''); setResults([]); }}
            className={`flex-1 py-4 text-center rounded-2xl transition-all duration-300 ${
              activeTab === 'ayat' ? 'bg-primary text-accent shadow-md' : 'text-primary/70 hover:bg-cream-dark'
            }`}
          >
            البحث بالكلمات والآيات
          </button>
          <button
            onClick={() => { setActiveTab('historical'); setQuery(''); setResults([]); }}
            className={`flex-1 py-4 text-center rounded-2xl transition-all duration-300 ${
              activeTab === 'historical' ? 'bg-primary text-accent shadow-md' : 'text-primary/70 hover:bg-cream-dark'
            }`}
          >
            التلاوات التاريخية النادرة
          </button>
        </div>

        {/* Input box */}
        <div className="relative group">
          <input
            type="text"
            placeholder={
              activeTab === 'surahs' ? "اكتب اسم السورة أو رقمها للبحث..." :
              activeTab === 'ayat' ? "اكتب كلمة أو آية للبحث..." :
              "ابحث ببلد التلاوة، المسجد، السنة، أو السورة..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white border-2 border-accent/20 rounded-[2.5rem] py-6 px-16 text-2xl font-reem text-primary focus:outline-none focus:border-accent shadow-2xl transition-all"
            dir="rtl"
          />
          <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-accent" size={28} />
          {query && (
            <button
              onClick={() => { setQuery(''); setResults([]); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/20 hover:text-primary transition-colors"
            >
              <X size={24} />
            </button>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        {loading && (
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/50 h-32 rounded-3xl animate-pulse border border-accent/5" />
            ))}
          </div>
        )}

        {/* 1. Surah Results */}
        {!loading && activeTab === 'surahs' && results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((surah) => {
              const isCurrent = currentSurahId === surah.id;
              const isPlayingHere = isCurrent && globalIsPlaying;
              return (
                <motion.div
                  key={surah.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-6 rounded-[2rem] shadow-lg border border-accent/10 flex justify-between items-center group hover:border-accent transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center font-serif text-primary font-bold text-lg group-hover:bg-accent group-hover:text-white transition-colors">
                      {surah.id}
                    </div>
                    <div className="text-right">
                      <h3 className="font-reem text-xl text-primary font-bold">{surah.name}</h3>
                      <span className="text-[10px] text-primary/45 tracking-widest font-sans uppercase">سور القرآن الكريم</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePlayGlobalSurah(surah.id, 'mojawwad')}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-reem text-xs transition-all shadow-sm ${
                        isCurrent && reciterType === 'mojawwad' && globalIsPlaying
                          ? 'bg-primary text-accent'
                          : 'bg-cream-dark text-primary hover:bg-accent hover:text-white'
                      }`}
                    >
                      {isCurrent && reciterType === 'mojawwad' && globalIsPlaying ? <Pause size={14} fill="currentColor" /> : 'مجوّد'}
                    </button>
                    <button
                      onClick={() => handlePlayGlobalSurah(surah.id, 'murattal')}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-reem text-xs transition-all shadow-sm ${
                        isCurrent && reciterType === 'murattal' && globalIsPlaying
                          ? 'bg-primary text-accent'
                          : 'bg-cream-dark text-primary hover:bg-accent hover:text-white'
                      }`}
                    >
                      {isCurrent && reciterType === 'murattal' && globalIsPlaying ? <Pause size={14} fill="currentColor" /> : 'مرتّل'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* 2. Verse Results */}
        {!loading && activeTab === 'ayat' && results.length > 0 && (
          <div className="space-y-6">
            {results.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-accent/10 hover:border-accent/30 transition-all flex flex-col md:flex-row justify-between items-center gap-8 group"
              >
                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end gap-3 mb-4">
                    <span className="text-xs font-sans tracking-widest text-accent uppercase font-bold">آية {item.verse_key}</span>
                    <div className="w-8 h-[1px] bg-accent/20" />
                  </div>
                  <p
                    className="text-2xl md:text-3xl font-amiri text-primary leading-loose"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </div>
                <button
                  onClick={() => playVerseAudio(item.verse_key)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg flex-shrink-0 ${
                    playingVerse === item.verse_key
                      ? 'bg-primary text-accent'
                      : 'bg-accent text-primary hover:scale-110'
                  }`}
                >
                  {playingVerse === item.verse_key ? <Pause fill="currentColor" /> : <Play fill="currentColor" className="translate-x-0.5" />}
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* 3. Historical Recitations Results */}
        {!loading && activeTab === 'historical' && results.length > 0 && (
          <div className="space-y-6">
            {results.map((item) => {
              const isCurrent = currentSurahId === item.surahId && reciterType === item.type;
              const isPlayingHere = isCurrent && globalIsPlaying;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-accent/10 hover:border-accent transition-all flex justify-between items-center gap-6"
                >
                  <div className="text-right flex-grow">
                    <h3 className="font-reem text-xl md:text-2xl text-primary font-bold mb-3 flex items-center gap-2">
                      <Star size={16} className="text-accent fill-accent" />
                      <span>تلاوة {item.name}</span>
                    </h3>
                    <div className="flex flex-wrap gap-4 text-xs font-reem text-primary/60">
                      <span className="flex items-center gap-1.5"><MapPin size={14} className="text-accent" /> {item.place}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={14} className="text-accent" /> عام {item.year}م</span>
                      <span className="flex items-center gap-1.5 bg-accent/10 px-2.5 py-0.5 rounded-lg text-accent text-[10px] uppercase font-bold font-sans">MUSHAF MOJAWWAD</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePlayGlobalSurah(item.surahId, item.type)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg flex-shrink-0 ${
                      isPlayingHere
                        ? 'bg-primary text-accent'
                        : 'bg-accent text-primary hover:scale-110'
                    }`}
                  >
                    {isPlayingHere ? <Pause fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} className="translate-x-0.5" />}
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* 4. Empty State */}
        {!loading && query && results.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Compass className="text-accent/40" size={40} />
            </div>
            <p className="text-primary/40 text-xl font-reem">لم نجد نتائج مطابقة لبحثك، حاول بكلمات أخرى.</p>
          </div>
        )}
      </section>

      <div className="py-20 flex justify-center opacity-10">
        <img src="/patterns/ornament-bottom.svg" className="w-64" alt="" />
      </div>
    </main>
  )
}
