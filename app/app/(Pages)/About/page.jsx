'use client'
import React from 'react'
import Image from 'next/image'
import { sheikhAlMinshawi } from '@/app/utils/Data'
import RandomGallery from '@/app/Components/RandomGallary'
import { motion } from 'framer-motion'
import { History, Award, BookOpen, Globe, User, Heart, ChevronRight } from 'lucide-react'

export default function AboutPage() {
  const s = sheikhAlMinshawi;

  const galleryImages = [
    "/assets/sediq5jpg.jpg",
    "/assets/sediq1.jpg",
    "/assets/sediq2.jpg",
    "/assets/sediq3.jpg",
    "/assets/sediq4.jpg",
  ];

  return (
    <main className="min-h-screen bg-cream">
      {/* 1. Hero / Title Section */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-primary-dark">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('/patterns/mashrabiya.svg')", backgroundSize: '400px' }}
        />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cream to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 text-right"
            >
              <div className="flex items-center justify-end gap-3 mb-6">
                <span className="text-accent text-sm font-sans tracking-[0.4em] uppercase">Documenting Excellence</span>
                <div className="w-12 h-[1px] bg-accent" />
              </div>
              <h1 className="text-6xl md:text-8xl font-reem font-bold text-white mb-8 leading-tight">
                رِيـحـانَـةِ <br />
                <span className="text-accent">القُـرآنِ</span>
              </h1>
              <p className="text-sand/80 text-xl md:text-2xl font-arabic max-w-2xl leading-relaxed">
                سيرة عطرة لفضيلة الشيخ محمد صديق المنشاوي، صاحب الصوت الذي وحّد قلوب المسلمين في شرق الأرض وغربها على خشوع الآيات.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative w-80 h-[32rem] md:w-[28rem] rounded-[4rem] overflow-hidden border-8 border-white/10 shadow-2xl"
            >
              <Image
                src="/assets/sediq2.jpg"
                alt={s.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-8 right-8 text-white">
                <p className="text-sm font-sans tracking-widest opacity-60">Legacy Image</p>
                <p className="text-2xl font-reem font-bold text-accent">1920 - 1969</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Quick Info Cards */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'الاسم بالتفصيل', value: s.fullName, icon: <User className="text-accent" /> },
            { label: 'مكان الميلاد', value: s.birth.place, icon: <Globe className="text-accent" /> },
            { label: 'عدد الأولاد', value: `${s.family.childrenCount} ابناً وابنة`, icon: <Heart className="text-accent" /> },
            { label: 'الإرث الصوتي', value: 'المصحف كاملاً مرتلاً ومجوداً', icon: <BookOpen className="text-accent" /> },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[2rem] shadow-xl border border-accent/10 flex flex-col items-start gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                {item.icon}
              </div>
              <p className="text-primary/40 font-sans text-xs uppercase tracking-widest">{item.label}</p>
              <p className="text-primary font-reem font-bold text-xl">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Deep Bio Sections */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-16">

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-reem font-bold text-primary flex items-center gap-4">
                <History className="text-accent" /> نبذة عن حياته
              </h2>
              <div className="prose prose-xl font-arabic text-primary/80 leading-loose space-y-8 max-w-none">
                <p className="border-r-4 border-accent pr-6 bg-accent/5 p-8 rounded-2xl">{s.summary.paragraph1}</p>
                <p>{s.summary.paragraph2}</p>
                <p>{s.summary.paragraph3}</p>
                <p className="bg-primary/5 p-8 rounded-2xl italic">{s.summary.paragraph4}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-primary text-cream p-12 rounded-[3rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
                <img src="/patterns/mandala-bg.svg" alt="" className="w-full h-full" />
              </div>
              <h3 className="text-3xl font-reem font-bold text-accent mb-10 flex items-center gap-4">
                <Award /> أهم المحطات والإنجازات
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {s.career.achievements.map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start bg-white/5 p-6 rounded-2xl border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                    <p className="text-lg font-arabic">{item}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Sidebar / Stats */}
          <aside className="lg:col-span-4 space-y-10">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-accent/10">
              <h4 className="text-2xl font-reem font-bold text-primary mb-8 border-b border-accent/10 pb-4">تذكره رحمة الله</h4>
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <span className="text-accent text-sm font-sans uppercase">الميلاد</span>
                  <p className="text-primary font-reem text-lg leading-relaxed">{s.birth.date}</p>
                  <p className="text-primary/40 text-sm font-arabic">{s.birth.place}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-accent text-sm font-sans uppercase">الوفاة</span>
                  <p className="text-primary font-reem text-lg leading-relaxed">{s.death.date}</p>
                  <p className="text-primary/40 text-sm font-arabic">بعمر {s.death.age} عاماً - {s.death.cause}</p>
                </div>
              </div>

              <div className="mt-12">
                <h5 className="text-accent text-xs font-sans uppercase tracking-widest mb-6">دول تشرفت بتلاوته</h5>
                <div className="flex flex-wrap gap-2">
                  {s.career.countriesVisited.map(country => (
                    <span key={country} className="px-3 py-1 bg-cream rounded-full text-xs font-arabic text-primary/70 border border-primary/5">
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-accent/10 rounded-[2.5rem] p-10 border border-accent/20">
              <h4 className="text-2xl font-reem font-bold text-primary mb-6">إرثٌ خالد</h4>
              <p className="text-primary/70 font-arabic text-lg leading-relaxed mb-8">
                تلاوات الشيخ ليست مجرد تسجيلات، بل هي مدرسة قائمة بذاتها تنهل منها الأجيال معاني الخشوع والتدبر.
              </p>
              <div className="flex flex-col gap-4">
                <a href="#" className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:translate-x-[-5px] transition-transform">
                  <span className="font-reem text-primary">المكتبة الصوتية</span>
                  <ChevronRight className="text-accent" />
                </a>
                <a href="#" className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:translate-x-[-5px] transition-transform">
                  <span className="font-reem text-primary">المكتبة المرئية</span>
                  <ChevronRight className="text-accent" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 4. Gallery Section */}
      <section className="py-24 bg-primary-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-reem font-bold text-accent mb-4">معرض الصور التاريخية</h2>
            <p className="text-sand/50 font-sans tracking-[0.3em] uppercase text-xs">A glimpse into history</p>
          </div>
          <RandomGallery images={galleryImages} />
        </div>
      </section>

      <div className="py-20 flex justify-center opacity-10">
        <img src="/patterns/ornament-bottom.svg" className="w-64" alt="" />
      </div>
    </main>
  );
}