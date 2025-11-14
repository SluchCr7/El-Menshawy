'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { FaPlayCircle, FaBookOpen } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function QuranListenCTA() {
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
    <section className="bg-[#0B3D2E] py-16 px-4 flex flex-col items-center text-white">
      {/* عنوان رئيسي */}
      <motion.h2 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-extrabold text-center mb-6"
      >
        استمتع بالاستماع إلى المصحف الشريف
      </motion.h2>

      {/* وصف قصير */}
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center text-lg md:text-xl text-gray-200 max-w-2xl mb-12"
      >
        اختر الطريقة التي تناسبك للاستماع إلى القرآن الكريم: بالتجويد لتعلم أحكام التلاوة، أو بالترتيل للاستماع الهادئ والمريح.
      </motion.p>

      {/* أزرار */}
      <div className="flex flex-col md:flex-row gap-6">
        {buttons.map((btn, index) => (
          <motion.button
            key={index}
            onClick={btn.onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-teal-400 text-white font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {btn.icon}
            <span className="text-lg">{btn.text}</span>
          </motion.button>
        ))}
      </div>
    </section>
  )
}
