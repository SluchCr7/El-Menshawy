'use client'
import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Play, ArrowLeft, ExternalLink, Calendar, Star } from 'lucide-react'
import { videos } from '@/app/utils/Data'

export default function VideosSection() {
  const randomVideos = useMemo(() => {
    const shuffled = [...videos].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 3)
  }, [])

  return (
    <section className="relative w-full py-32 bg-cream overflow-hidden">
      {/* Background Ornament */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-[0.03] pointer-events-none">
        <img src="/patterns/mandala-bg.svg" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-right md:text-right"
          >
            <span className="text-accent text-sm font-sans tracking-[0.4em] uppercase mb-4 block">Visual Library</span>
            <h2 className="text-4xl md:text-5xl font-reem font-bold text-primary mb-6">المكتبة المرئية النادرة</h2>
            <p className="text-primary/70 text-lg font-arabic max-w-2xl leading-relaxed">
              كنوزٌ بصرية خلدتها العدسات لفضيلة الشيخ، تجمع بين لقاءات نادرة وتلاوات صورت خصيصاً للتلفاز في فترات مختلفة من حياته.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/Videos">
              <button className="group flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl hover:bg-accent hover:text-primary transition-all duration-300 shadow-xl hover:-translate-y-1">
                <span className="font-reem text-lg">كل الفيديوهات</span>
                <ArrowLeft className="group-hover:-translate-x-2 transition-transform duration-300" size={20} />
              </button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {randomVideos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-spiritual-shadow bg-white border border-accent/15 group-hover:border-accent/40 group-hover:shadow-2xl transition-all duration-500 p-3">
                {/* Image Container with inner frames */}
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-inner">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                  />
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-primary/15 group-hover:bg-primary/45 transition-colors duration-500" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 rounded-full bg-accent text-primary flex items-center justify-center shadow-2xl border-4 border-white/20 hover:scale-110 transition-transform shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                    >
                      <Play fill="currentColor" size={26} className="translate-x-0.5" />
                    </a>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <span className="px-3 py-1 bg-primary/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-sans font-bold uppercase rounded-full">YouTube HD</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6">
                  <h3 className="text-xl font-reem font-bold text-primary group-hover:text-accent transition-colors line-clamp-2 leading-relaxed h-14 text-right">
                    {video.title}
                  </h3>

                  <div className="mt-8 flex items-center justify-between border-t border-accent/10 pt-6">
                    <div className="flex items-center gap-2 text-primary/40 text-xs font-sans">
                      <Calendar size={14} className="text-accent" />
                      <span className="font-bold">Archive Collection</span>
                    </div>
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent flex items-center gap-2 font-reem hover:underline"
                    >
                      <span className="text-sm font-bold">مشاهدة</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
