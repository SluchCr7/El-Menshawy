'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { FaPlayCircle, FaBookOpen } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function HeroSection() {
  const router = useRouter();

  const buttons = [
    {
      text: "استماع بالترتيل",
      icon: <FaPlayCircle size={24} />,
      onClick: () => router.push('/listen/tartil')
    },
    {
      text: "استماع بالتجويد",
      icon: <FaBookOpen size={24} />,
      onClick: () => router.push('/listen/tajweed')
    }
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* صورة الخلفية */}
      <div className="absolute inset-0">
        <Image
          src="/assets/sediq4.jpg"
          alt="الشيخ محمد صديق المنشاوي"
          fill
          className="object-cover object-center brightness-75"
          priority
        />
        {/* Overlay متدرج */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>
      </div>

      {/* محتوى النصوص */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 md:px-0 max-w-4xl">
        
        {/* العنوان */}
        <motion.h1 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl mb-4 font-[Cairo]"
        >
          استمتع بالاستماع إلى المصحف الشريف
        </motion.h1>

        {/* الوصف */}
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-2xl text-gray-200 mb-10 drop-shadow-md font-[Cairo]"
        >
          اختر الطريقة التي تناسبك: بالتجويد لتعلم أحكام التلاوة، أو بالترتيل للاستماع الهادئ والمريح.
        </motion.p>

        {/* الأزرار */}
        <div className="flex flex-col md:flex-row gap-6">
          {buttons.map((btn, index) => (
            <motion.button
              key={index}
              onClick={btn.onClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-teal-400 text-white font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <motion.div 
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                {btn.icon}
              </motion.div>
              <span className="text-lg">{btn.text}</span>
            </motion.button>
          ))}
        </div>

        {/* زخارف صغيرة */}
        {/* <motion.div 
          className="absolute bottom-10 w-full flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="w-12 h-1 bg-green-400 rounded-full animate-pulse"></div>
          <div className="w-8 h-1 bg-teal-400 rounded-full animate-pulse delay-200"></div>
          <div className="w-6 h-1 bg-green-300 rounded-full animate-pulse delay-400"></div>
        </motion.div> */}

      </div>
    </section>
  )
}
