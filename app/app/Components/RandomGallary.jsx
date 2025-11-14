'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function RandomGallery({ images }) {
  return (
    <div
      className="
        w-full 
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-5 
        gap-4
      "
    >
      {images.map((src, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="
            relative 
            aspect-square 
            rounded-xl 
            overflow-hidden 
            shadow-lg 
            border border-[#C8A64B]/15
            hover:scale-105 
            hover:shadow-2xl 
            transition-all 
            duration-300
            bg-[#0e1a16]
          "
        >
          <Image
            src={src}
            alt={`photo-${i}`}
            fill
            className="object-cover object-center"
          />
        </motion.div>
      ))}
    </div>
  )
}
