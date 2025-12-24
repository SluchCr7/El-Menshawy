'use client'
import React from 'react';
import { Play, Music, Mic2, Star } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SurahCard = ({ surah, reciterType }) => {
  const isMurattal = reciterType === 'murattal';
  const label = isMurattal ? 'المصحف المرتل' : 'المصحف المجود';

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link
        href={`/Play/${surah.id}?type=${reciterType}`}
        className="group relative block bg-white rounded-[2rem] p-6 shadow-spiritual-shadow hover:shadow-2xl transition-all duration-500 border border-accent/10 overflow-hidden"
      >
        {/* Background Decorative Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
          <img src="/patterns/mandala-bg.svg" alt="" className="w-full h-full object-contain rotate-45" />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Surah Number Icon */}
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-accent transition-colors duration-500">
                <span className="text-xl font-serif font-bold text-primary group-hover:text-white transition-colors">
                  {surah.id}
                </span>
              </div>
              {/* Corner Ornaments */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-accent/30 rounded-tl-md" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-accent/30 rounded-br-md" />
            </div>

            <div className="text-right">
              <h3 className="text-2xl font-reem font-bold text-primary group-hover:text-accent transition-colors mb-1">
                {surah.name}
              </h3>
              <div className="flex items-center gap-2">
                {isMurattal ? <Music size={12} className="text-accent" /> : <Mic2 size={12} className="text-accent" />}
                <p className="text-xs font-sans tracking-widest text-primary/40 uppercase group-hover:text-primary/60 transition-colors">
                  {label}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="w-12 h-12 rounded-full border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white group-hover:border-transparent transition-all duration-500 shadow-lg">
            <Play size={20} fill="currentColor" className="translate-x-0.5" />
          </div>
        </div>

        {/* Hover Progress bar indicator at bottom */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent transition-all duration-700 group-hover:w-full" />
      </Link>
    </motion.div>
  );
};

export default SurahCard;