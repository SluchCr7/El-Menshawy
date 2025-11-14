'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export const quotes = [
  {
    text: "صوت الشيخ محمد صديق المنشاوي هو أحد أكثر الأصوات خشوعًا وتأثيرًا في تاريخ التلاوة، يفتح أبواب القلوب قبل الآذان.",
    author: "الشيخ محمود خليل الحصري",
  },
  {
    text: "إن تلاوة المنشاوي لا تُسمع بالأذن فقط، بل تُتلى على القلوب مباشرة، فيها صدق الإيمان وصفاء الروح.",
    author: "الدكتور عبدالصبور شاهين",
  },
  {
    text: "المنشاوي مدرسة فريدة في الخشوع والتجويد، جمع بين الإتقان الفني والروحانية العالية.",
    author: "الشيخ مصطفى إسماعيل",
  },
  {
    text: "ما من قارئٍ جعل المستمع يعيش مع الآية كما يفعل المنشاوي، صوته يوقظ القلب من غفلته.",
    author: "الشيخ أبو العينين شعيشع",
  },
]

export default function QuotesSlider() {
  const [index, setIndex] = useState(0)

  const nextQuote = () => setIndex((prev) => (prev + 1) % quotes.length)
  const prevQuote = () =>
    setIndex((prev) => (prev - 1 + quotes.length) % quotes.length)

  return (
    <section className="relative w-full py-24 bg-[#0B3D2E] text-[#F7F6F2] overflow-hidden">
      {/* زخرفة خلفية خفيفة */}
      <div className="absolute inset-0 opacity-[0.06] bg-[url('/patterns/islamic-pattern.svg')] bg-repeat" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
        {/* العنوان */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-[#C8A64B] mb-12"
        >
          أقوال العلماء عن الشيخ المنشاوي
        </motion.h2>

        {/* السلايدر */}
        <div className="relative w-full min-h-[260px] md:min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute w-full"
            >
              <div className="bg-[#0A2F24]/80 border border-[#C8A64B]/20 shadow-xl rounded-2xl p-8 md:p-10 relative">
                <FaQuoteRight className="absolute top-5 right-6 text-[#C8A64B]/30 text-3xl" />
                <p className="text-lg md:text-xl leading-relaxed italic mb-6">
                  “{quotes[index].text}”
                </p>
                <h4 className="text-[#C8A64B] font-semibold text-lg">
                  — {quotes[index].author}
                </h4>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* أزرار التنقل */}
        <div className="flex justify-center items-center gap-8 mt-12">
          <button
            onClick={prevQuote}
            className="w-12 h-12 flex items-center justify-center bg-[#C8A64B]/20 border border-[#C8A64B]/40 text-[#C8A64B] rounded-full hover:bg-[#C8A64B]/40 hover:text-[#0B3D2E] transition"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={nextQuote}
            className="w-12 h-12 flex items-center justify-center bg-[#C8A64B]/20 border border-[#C8A64B]/40 text-[#C8A64B] rounded-full hover:bg-[#C8A64B]/40 hover:text-[#0B3D2E] transition"
          >
            <FaChevronRight size={20} />
          </button>
        </div>

        {/* النقاط (Indicators) */}
        <div className="flex justify-center gap-2 mt-8">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index
                  ? 'bg-[#C8A64B] w-6'
                  : 'bg-[#C8A64B]/40 hover:bg-[#C8A64B]/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
