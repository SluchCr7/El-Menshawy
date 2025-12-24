'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Play, BookOpen, Mic2, Star } from 'lucide-react'

export default function Hero() {
  const router = useRouter()

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Image with Parallax-like effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero_bg.png"
          alt="Islamic Pattern Background"
          fill
          className="object-cover scale-110 animate-subtle-zoom"
          priority
        />
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 via-primary-dark/40 to-primary-dark/95" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-primary-dark/60" />
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/patterns/mashrabiya.svg')",
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm"
        >
          <Star className="text-accent fill-accent" size={12} />
          <span className="text-accent text-xs font-sans tracking-[0.3em] uppercase">The Voice of Heaven</span>
          <Star className="text-accent fill-accent" size={12} />
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-reem font-bold text-white leading-tight">
            الشيخ محمد صديق <br />
            <span className="text-accent text-glow">المنشاوي</span>
          </h1>
        </motion.div>

        {/* Subtitle / Bio Snippet */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl text-sand/90 text-xl md:text-2xl font-arabic leading-relaxed mb-12"
        >
          رِيحانَةِ القُرآنِ وصاحبُ الصّوتِ البَاكِي، الذي خَلَّد اسمه بحروفٍ من نور في تاريخ التلاوة المصرية والعالمية.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <button
            onClick={() => router.push('/Murattal')}
            className="group relative flex items-center justify-center gap-4 px-10 py-5 bg-accent text-primary font-bold rounded-2xl overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Play className="relative z-10 fill-primary" size={24} />
            <span className="relative z-10 text-xl font-reem">المصحف المرتل</span>
          </button>

          <button
            onClick={() => router.push('/Mojawwad')}
            className="group flex items-center justify-center gap-4 px-10 py-5 border-2 border-accent/40 text-accent font-bold rounded-2xl backdrop-blur-md transition-all hover:bg-accent/10 hover:border-accent"
          >
            <Mic2 className="group-hover:scale-110 transition-transform" size={24} />
            <span className="text-xl font-reem">المصحف المجود</span>
          </button>
        </motion.div>
      </div>

      {/* Hero Bottom Ornament */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 pointer-events-none"
        style={{
          backgroundImage: "url('/patterns/ornament-bottom.svg')",
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Floating Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-accent/50 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-accent to-transparent mx-auto" />
      </motion.div>
    </section>
  )
}
