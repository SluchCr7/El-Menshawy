'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

export const quotes = [
  {
    text: "صوت الشيخ محمد صديق المنشاوي هو أحد أكثر الأصوات خشوعًا وتأثيرًا في تاريخ التلاوة، يفتح أبواب القلوب قبل الآذان.",
    author: "الشيخ محمود خليل الحصري",
    title: "شيخ عموم المقارئ المصرية الأسبق"
  },
  {
    text: "إن تلاوة المنشاوي لا تُسمع بالأذن فقط، بل تُتلى على القلوب مباشرة، فيها صدق الإيمان وصفاء الروح.",
    author: "الدكتور عبدالصبور شاهين",
    title: "مفكر إسلامي"
  },
  {
    text: "المنشاوي مدرسة فريدة في الخشوع والتجويد، جمع بين الإتقان الفني والروحانية العالية.",
    author: "الشيخ مصطفى إسماعيل",
    title: "عبقري التلاوة"
  },
  {
    text: "ما من قارئٍ جعل المستمع يعيش مع الآية كما يفعل المنشاوي، صوته يوقظ القلب من غفلته.",
    author: "الشيخ أبو العينين شعيشع",
    title: "نقيب القراء الأسبق"
  },
]

export default function QuotesSlider() {
  const [index, setIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [autoplay])

  const nextQuote = () => {
    setAutoplay(false)
    setIndex((prev) => (prev + 1) % quotes.length)
  }
  const prevQuote = () => {
    setAutoplay(false)
    setIndex((prev) => (prev - 1 + quotes.length) % quotes.length)
  }

  return (
    <section className="relative w-full py-32 bg-primary-dark overflow-hidden border-y border-accent/10">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none">
        <img src="/patterns/ornament-top.svg" alt="" className="w-full h-full object-contain rotate-180" />
      </div>
      <div className="absolute bottom-0 left-0 w-96 h-96 opacity-10 pointer-events-none">
        <img src="/patterns/ornament-top.svg" alt="" className="w-full h-full object-contain" />
      </div>

      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url('/patterns/geometric-repeat.svg')", backgroundSize: '100px' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-sans tracking-[0.4em] uppercase mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-reem font-bold text-white">قالوا عن القارئ الباكي</h2>
          <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full opacity-50" />
        </motion.div>

        <div className="relative min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl mx-auto"
            >
              <div className="relative group">
                {/* Decorative Frame */}
                <div className="absolute -inset-4 border border-accent/10 rounded-[3rem] opacity-50 pointer-events-none" />
                <div className="absolute -inset-8 border border-accent/5 rounded-[4rem] opacity-30 pointer-events-none" />

                <div className="bg-primary/40 backdrop-blur-xl border border-accent/20 rounded-[2.5rem] p-10 md:p-16 shadow-2xl relative">
                  <Quote className="absolute -top-6 left-12 text-accent opacity-20" size={60} />

                  <blockquote className="text-2xl md:text-3xl lg:text-4xl font-amiri leading-relaxed text-cream text-center mb-10 italic">
                    {quotes[index].text}
                  </blockquote>

                  <div className="flex flex-col items-center">
                    <h4 className="text-accent font-reem text-2xl mb-1 tracking-wide">
                      — {quotes[index].author}
                    </h4>
                    <span className="text-sand/60 text-sm font-sans uppercase tracking-[0.2em]">
                      {quotes[index].title}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none px-4 lg:-px-20">
            <button
              onClick={prevQuote}
              className="pointer-events-auto w-14 h-14 rounded-full border border-accent/20 bg-primary/50 backdrop-blur-md text-accent flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300 shadow-lg"
            >
              <ChevronRight size={28} />
            </button>
            <button
              onClick={nextQuote}
              className="pointer-events-auto w-14 h-14 rounded-full border border-accent/20 bg-primary/50 backdrop-blur-md text-accent flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300 shadow-lg"
            >
              <ChevronLeft size={28} />
            </button>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-4 mt-16">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIndex(i); setAutoplay(false); }}
              className="group relative h-2"
            >
              <div className={`h-full transition-all duration-500 rounded-full ${i === index ? 'w-10 bg-accent' : 'w-4 bg-accent/20 group-hover:bg-accent/40'
                }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
