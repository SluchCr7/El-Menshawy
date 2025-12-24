'use client'
import React from 'react';
import { menshQuranMurattal } from '../../utils/Data';
import SurahCard from '../../Components/SurahCard';
import { Music, Headphones, Search, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const MurattalQuranPage = () => {
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
            className="inline-block p-4 rounded-full bg-accent/10 border border-accent/20 mb-8"
          >
            <Music size={40} className="text-accent" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-reem font-bold text-white mb-6"
          >
            المصحف المرتل
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sand/80 text-xl font-arabic max-w-2xl mx-auto leading-relaxed"
          >
            استمع إلى الختمة المرتلة كاملة برواية حفص عن عاصم، بصوت فضيلة الشيخ محمد صديق المنشاوي، بجودة صوتية عالية ونقية.
          </motion.p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 px-6 md:px-10 lg:px-16 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          {/* Quick Stats / Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 bg-white/80 backdrop-blur-md p-6 rounded-[2rem] shadow-xl border border-accent/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Sparkles size={20} />
              </div>
              <div className="text-right">
                <p className="text-xs font-sans uppercase tracking-[0.2em] text-primary/40">Total Content</p>
                <p className="text-xl font-reem font-bold text-primary">{menshQuranMurattal.length} سورة مباركة</p>
              </div>
            </div>

            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="ابحث عن سورة..."
                className="w-full bg-cream/50 border border-accent/20 rounded-2xl py-4 px-12 text-primary focus:outline-none focus:border-accent transition-colors font-reem"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-accent" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menshQuranMurattal.map((surah) => (
              <SurahCard
                key={surah.id}
                surah={surah}
                reciterType="murattal"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer Ornament */}
      <div className="py-20 flex justify-center opacity-20">
        <img src="/patterns/ornament-bottom.svg" className="w-64" alt="" />
      </div>
    </main>
  );
};

export default MurattalQuranPage;