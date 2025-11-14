'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { FaPlayCircle, FaBookOpen } from 'react-icons/fa'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const router = useRouter();

  const buttons = [
    {
      text: "استماع بالترتيل",
      icon: <FaPlayCircle size={24} />,
      link: "/listen/tartil"
    },
    {
      text: "استماع بالتجويد",
      icon: <FaBookOpen size={24} />,
      link: "/listen/tajweed"
    }
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden">

      {/* الخلفية */}
      <div className="absolute inset-0">
        <Image
          src="/assets/sediq2.jpg"
          alt="الشيخ محمد صديق المنشاوي"
          fill
          className="object-cover object-center brightness-[0.45]"
          priority
        />

        {/* طبقة تزيين ذهبية خفيفة */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90"></div>

        {/* زخرفة إسلامية أعلى يمين */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 0.25, y: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 right-0 w-72 h-72 bg-[url('/patterns/islamic-gold.png')] bg-contain bg-no-repeat opacity-20 pointer-events-none"
        />
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-20 text-center px-6 max-w-3xl">

        {/* عنوان */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-2xl font-[Cairo]"
        >
          استمع إلى القرآن الكريم بصوت  
          <span className="text-[#D4B45A]"> الشيخ محمد صديق المنشاوي </span>
        </motion.h1>

        {/* وصف */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg md:text-2xl text-gray-200 mt-6 mb-10 leading-relaxed font-[Cairo]"
        >
          اختر أسلوب التلاوة المفضل لديك — ترتيل هادئ خاشع، أو تجويد لتعلم الأحكام.
        </motion.p>

        {/* الأزرار */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          {buttons.map((btn, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.07, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push(btn.link)}
              className="flex items-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r 
                         from-[#0e8f66] to-[#0fae80] text-white font-semibold 
                         shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {btn.icon}
              <span className="text-lg">{btn.text}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* خط زخرفي أسفل */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
          className="mt-16 mx-auto w-48 h-[2px] bg-gradient-to-r from-transparent via-[#D4B45A] to-transparent"
        />
      </div>

    </section>
  );
}
