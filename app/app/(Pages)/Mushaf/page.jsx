'use client'
import React, { useState } from 'react';
import { Book, Download, Eye, FileText, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MushafPage() {
  const [showReader, setShowReader] = useState(false);

  const mushafs = [
    {
      title: "مصحف المدينة المنورة",
      description: "النسخة الرسمية الصادرة عن مجمع الملك فهد لطباعة المصحف الشريف بالمدينة المنورة. طبعة مريحة للعين وبأعلى دقة.",
      size: "148 MB",
      format: "PDF",
      downloadUrl: "https://archive.org/download/mushaf-al-madinah-pdf/mushaf-al-madinah.pdf"
    },
    {
      title: "مصحف التجويد الملون",
      description: "مصحف يحتوي على ترميز لوني خاص لتسهيل تطبيق أحكام التجويد أثناء القراءة، ممتاز للمبتدئين والمتعلمين.",
      size: "165 MB",
      format: "PDF",
      downloadUrl: "https://archive.org/download/quran-tajweed-color/quran-tajweed-color.pdf"
    },
    {
      title: "المصحف الشريف بالرسم العثماني (نسخة خفيفة)",
      description: "نسخة مضغوطة ومنسقة للتحميل السريع والقراءة السلسة على الأجهزة المحمولة والأجهزة ذات السعات المنخفضة.",
      size: "42 MB",
      format: "PDF",
      downloadUrl: "https://archive.org/download/mushaf-tajweed-colored/mushaf-tajweed.pdf"
    }
  ];

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
            className="inline-block p-4 rounded-full bg-accent/10 border border-accent/20 mb-8 text-accent"
          >
            <Book size={40} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-reem font-bold text-white mb-6"
          >
            المصحف الشريف
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sand/80 text-xl font-arabic max-w-2xl mx-auto leading-relaxed"
          >
            تصفح المصحف الإلكتروني مباشرة أو قم بتحميل أرقى طبعات المصحف الشريف بنسخ PDF عالية الجودة.
          </motion.p>
        </div>
      </section>

      {/* Mushaf Download Section */}
      <section className="py-20 px-6 md:px-10 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          {/* Interactive Reader CTA */}
          <div className="mb-16 bg-gradient-to-br from-primary to-primary-dark text-white rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden border border-accent/20">
            <div className="absolute inset-0 opacity-5 bg-islamic-pattern bg-repeat pointer-events-none" />
            <div className="absolute bottom-[-50px] left-[-50px] w-80 h-80 bg-accent/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="text-right flex-1">
                <span className="text-accent font-sans text-xs tracking-[0.3em] uppercase block mb-3 font-bold">Interactive Reading</span>
                <h2 className="text-3xl md:text-4xl font-reem font-bold text-white mb-6">المصحف الإلكتروني التفاعلي</h2>
                <p className="text-sand/80 font-arabic text-lg leading-relaxed max-w-3xl">
                  افتح المصحف الشريف وتصفح السور والآيات مباشرة من متصفحك مع تفاسير متكاملة وإمكانية قراءة النص بوضوح تام.
                </p>
              </div>
              <div>
                <button
                  onClick={() => setShowReader(!showReader)}
                  className="group flex items-center justify-center gap-3 px-10 py-5 bg-accent text-primary font-bold rounded-2xl shadow-[0_15px_40px_rgba(212,175,55,0.25)] hover:scale-105 transition-transform"
                >
                  <span className="font-reem text-xl">{showReader ? "إغلاق المصحف" : "قراءة الآن"}</span>
                  <Eye className="group-hover:scale-110 transition-transform" size={22} />
                </button>
              </div>
            </div>

            {/* Embedded Iframe Reader */}
            <AnimatePresence>
              {showReader && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: '700px' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full mt-10 rounded-2xl overflow-hidden border border-accent/30 shadow-inner bg-white"
                >
                  <iframe
                    src="https://quran.com/?locale=ar"
                    title="Quran Reader"
                    className="w-full h-full border-none"
                    loading="lazy"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Downloads List */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-reem font-bold text-primary mb-4">تحميل المصاحف الشريفة (PDF)</h2>
            <p className="text-primary/40 font-sans tracking-[0.2em] uppercase text-xs">High Resolution Downloads</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {mushafs.map((mushaf, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2.5rem] p-10 border border-accent/10 hover:border-accent/30 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-8">
                    <FileText size={32} />
                  </div>
                  <h3 className="text-2xl font-reem font-bold text-primary mb-4">{mushaf.title}</h3>
                  <p className="text-primary/70 font-arabic text-base leading-relaxed mb-8">{mushaf.description}</p>
                </div>

                <div className="border-t border-accent/5 pt-6 flex items-center justify-between">
                  <div className="text-right">
                    <span className="text-xs text-primary/40 font-sans block">الحجم / الصيغة</span>
                    <span className="text-primary font-bold font-sans text-sm">{mushaf.size} ({mushaf.format})</span>
                  </div>

                  <a
                    href={mushaf.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-accent hover:text-primary transition-colors rounded-xl font-reem font-bold shadow-md"
                  >
                    <span>تحميل</span>
                    <Download size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ornament Bottom */}
      <div className="py-20 flex justify-center opacity-20">
        <img src="/patterns/ornament-bottom.svg" className="w-64" alt="" />
      </div>
    </main>
  );
}
