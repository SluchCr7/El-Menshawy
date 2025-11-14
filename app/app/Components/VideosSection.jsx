'use client'
import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { videos } from '@/app/utils/Data' // تأكد أن ملف البيانات موجود في هذا المسار

export default function VideosSection() {
  // 🌀 اختيار 3 فيديوهات عشوائية
  const randomVideos = useMemo(() => {
    const shuffled = [...videos].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 3)
  }, [])

  return (
    <section className="relative w-full py-20 bg-[#0A2F24] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* العنوان */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-4xl md:text-5xl font-bold text-[#C8A64B] mb-12"
        >
          أهم الفيديوهات الخاصة بالشيخ
        </motion.h2>

        {/* شبكة الفيديوهات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {randomVideos.map((video, index) => (
            <motion.a
              key={index}
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg bg-[#0B3D2E]/40 border border-[#C8A64B]/20 hover:border-[#C8A64B]/40 transition"
            >
              {/* صورة الفيديو */}
              <div className="relative w-full h-56">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:brightness-75 transition"
                />
                {/* Overlay تشغيل */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <div className="bg-[#C8A64B]/90 text-[#0B3D2E] px-4 py-2 rounded-full font-bold text-sm">
                    ▶ شاهد الآن
                  </div>
                </div>
              </div>

              {/* العنوان */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold leading-relaxed text-[#F7F6F2] line-clamp-2">
                  {video.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>

        {/* زر عرض المزيد */}
        <div className="flex justify-center mt-14">
          <Link href="/videos">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-[#C8A64B] text-[#0B3D2E] px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#D9C7A3] transition"
            >
              عرض المزيد من الفيديوهات
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  )
}
