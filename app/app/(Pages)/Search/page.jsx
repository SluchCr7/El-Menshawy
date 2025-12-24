'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { Play, Pause, Search, Music, Mic2, Star, Sparkles, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [playingVerse, setPlayingVerse] = useState(null)
  const [audio, setAudio] = useState(null)

  // Simple debounce implementation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        performSearch(query)
      } else {
        setResults([])
      }
    }, 600)

    return () => clearTimeout(timer)
  }, [query])

  const performSearch = async (q) => {
    setLoading(true)
    try {
      // Using Quran.com API v4
      const res = await fetch(
        `https://api.quran.com/api/v4/search?q=${encodeURIComponent(q)}&language=ar`
      )
      const data = await res.json()
      // The Quran.com search API returns results in data.search.results
      setResults(data.search?.results || [])
    } catch (err) {
      console.error(err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const playAudio = (verseKey) => {
    // Note: To play specifically Minshawi audio, we'd need the recitation ID (Minshawi is usually 4)
    const audioUrl = `https://api.quran.com/api/v4/recitations/4/by_ayah/${verseKey}`

    if (playingVerse === verseKey) {
      audio.pause()
      setPlayingVerse(null)
    } else {
      if (audio) audio.pause()
      // We need to fetch the actual MP3 URL from the ayah audio API
      fetch(audioUrl)
        .then(res => res.json())
        .then(data => {
          const mp3 = data.audio_files?.[0]?.url;
          if (mp3) {
            const fullUrl = mp3.startsWith('http') ? mp3 : `https://verses.quran.com/${mp3}`;
            const newAudio = new Audio(fullUrl);
            newAudio.play();
            setAudio(newAudio);
            setPlayingVerse(verseKey);
            newAudio.onended = () => setPlayingVerse(null);
          }
        })
        .catch(console.error);
    }
  }

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
          <h1 className="text-5xl md:text-7xl font-reem font-bold text-white mb-6">بحث الآيات</h1>
          <p className="text-sand/80 text-xl font-arabic max-w-2xl mx-auto leading-relaxed">
            ابحث عن أي آية في القرآن الكريم واستمع إليها بصوت الشيخ المنشاوي مباشرة.
          </p>
        </div>
      </section>

      {/* Search Input Area */}
      <section className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <div className="relative group">
          <input
            type="text"
            placeholder="اكتب كلمة أو آية للبحث..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white border-2 border-accent/20 rounded-[2.5rem] py-6 px-16 text-2xl font-reem text-primary focus:outline-none focus:border-accent shadow-2xl transition-all"
            dir="rtl"
          />
          <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-accent" size={28} />
          {query && (
            <button
              onClick={() => setQuery('')}
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

        {!loading && results.length > 0 && (
          <div className="space-y-6">
            <p className="text-primary/40 text-sm font-sans tracking-[0.2em] mb-8 uppercase text-center">
              Found {results.length} matches in the Holy Quran
            </p>
            {results.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-accent/10 hover:border-accent/30 transition-all flex flex-col md:flex-row justify-between items-center gap-8 group"
              >
                <div className="flex-1 text-right">
                  <div className="flex items-center justify-end gap-3 mb-4">
                    <span className="text-xs font-sans tracking-widest text-accent uppercase font-bold">Verse {item.verse_key}</span>
                    <div className="w-8 h-[1px] bg-accent/20" />
                  </div>
                  <p
                    className="text-2xl md:text-3xl font-amiri text-primary leading-loose"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </div>
                <button
                  onClick={() => playAudio(item.verse_key)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${playingVerse === item.verse_key
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

        {!loading && query && results.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="text-accent/40" size={40} />
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
