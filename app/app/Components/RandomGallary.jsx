'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function RandomGallery({ images }) {
  const [positions, setPositions] = useState([])

  // حساب أماكن عشوائية لكل صورة
  const generatePositions = () => {
    const newPositions = images.map(() => ({
      top: Math.random() * 70 + 5,   // بين 5% و 75%
      left: Math.random() * 70 + 5,  // بين 5% و 75%
      rotate: (Math.random() * 20) - 10, // -10deg إلى 10deg
      scale: Math.random() * 0.3 + 0.9,  // 0.9 إلى 1.2
    }))
    setPositions(newPositions)
  }

  useEffect(() => {
    generatePositions()

    // إعادة ترتيب عند تغيير حجم الشاشة
    window.addEventListener('resize', generatePositions)
    return () => window.removeEventListener('resize', generatePositions)
  }, [])

  return (
    <div className="relative w-full h-[90vh] overflow-hidden bg-black rounded-xl">
      {images.map((src, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: `${positions[i]?.top}%`,
            left: `${positions[i]?.left}%`,
            transform: `rotate(${positions[i]?.rotate}deg) scale(${positions[i]?.scale})`
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: positions[i]?.scale }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          className="shadow-xl rounded-xl overflow-hidden border border-white/10 hover:z-50 hover:scale-[1.15] hover:rotate-0 transition-all duration-300"
        >
          <Image
            src={src}
            alt={`photo-${i}`}
            width={350}
            height={350}
            className="object-cover"
          />
        </motion.div>
      ))}
    </div>
  )
}
