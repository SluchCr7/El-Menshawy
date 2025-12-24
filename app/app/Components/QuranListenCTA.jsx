'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Play, BookOpen, Music, Headphones } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function QuranListenCTA() {
  const router = useRouter();

  const cards = [
    {
      title: "المصحف المرتل",
      desc: "تلاوة هادئة خاشعة، مثالية للحفظ والمراجعة والاستماع اليومي.",
      icon: <Music className="text-accent" size={32} />,
      link: '/Murattal',
      bgColor: 'bg-primary/40'
    },
    {
      title: "المصحف المجود",
      desc: "تلاوة تعليمية بأحكام التجويد، تبرز جماليات المقامات وكمال الأداء.",
      icon: <BookOpen className="text-accent" size={32} />,
      link: '/Mojawwad',
      bgColor: 'bg-primary/60'
    }
  ];

  return (
    <section className="relative w-full py-32 overflow-hidden">
      {/* Background with Image and Blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/quran3.jpeg"
          alt="Quran Background"
          fill
          className="object-cover brightness-[0.2]"
        />
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-primary-dark" />
      </div>

      {/* Decorative Islamic Pattern */}
      <div className="absolute inset-0 opacity-[0.05] z-1"
        style={{ backgroundImage: "url('/patterns/mashrabiya.svg')", backgroundSize: '300px' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block p-4 rounded-full bg-accent/10 border border-accent/20 mb-8"
          >
            <Headphones size={40} className="text-accent" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-reem font-bold text-white mb-8"
          >
            ابدأ رحلتك مع كتاب الله
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sand/80 text-xl font-arabic max-w-3xl mx-auto leading-relaxed"
          >
            استمع إلى التلاوات القرآنية الخالدة بصوت فضيلة الشيخ محمد صديق المنشاوي، اختر أسلوب التلاوة الذي يلامس قلبك.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              whileHover={{ y: -10 }}
              className={`relative group cursor-pointer rounded-[2.5rem] p-10 md:p-14 overflow-hidden border border-accent/20 shadow-2xl ${card.bgColor} backdrop-blur-xl transition-all duration-500`}
              onClick={() => router.push(card.link)}
            >
              {/* Pattern inside card */}
              <div className="absolute top-0 right-0 w-48 h-48 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <img src="/patterns/mandala-bg.svg" alt="" className="w-full h-full object-contain rotate-12" />
              </div>

              <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-right gap-6">
                <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform">
                  {card.icon}
                </div>

                <h3 className="text-3xl font-reem font-bold text-accent group-hover:text-white transition-colors">
                  {card.title}
                </h3>

                <p className="text-cream/70 text-lg leading-relaxed font-arabic">
                  {card.desc}
                </p>

                <div className="mt-4 flex items-center gap-3 text-accent font-bold font-reem">
                  <span className="text-xl">استمع الآن</span>
                  <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all">
                    <Play size={18} fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 blur-[80px] rounded-full group-hover:bg-accent/20 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
