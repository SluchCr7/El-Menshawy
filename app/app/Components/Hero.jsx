// // 'use client'
// // import React from 'react'
// // import Image from 'next/image'
// // import { motion } from 'framer-motion'
// // import { useRouter } from 'next/navigation'

// // export default function Hero() {
// //   const router = useRouter()

// //   return (
// //     <section className="relative w-full min-h-screen bg-[#0A2F24] flex flex-col justify-center items-center overflow-hidden text-white">
      
// //       {/* ✨ خلفية زخرفية متحركة */}
// //       <div className="absolute inset-0">
// //         <div
// //           className="absolute inset-0 opacity-[0.08]"
// //           style={{
// //             backgroundImage: "url('/patterns/mashrabiya.svg')",
// //             backgroundSize: '300px',
// //             backgroundRepeat: 'repeat',
// //           }}
// //         />
// //         <motion.div
// //           animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
// //           transition={{ duration: 10, repeat: Infinity }}
// //           className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C8A64B22,transparent_60%)]"
// //         />
// //       </div>

// //       {/* 🕌 المحتوى الرئيسي */}
// //       <div className="relative z-10 max-w-6xl mx-auto text-center px-6 flex flex-col items-center gap-10">

// //         {/* صورة الشيخ داخل إطار هندسي */}
// //         <motion.div
// //           initial={{ opacity: 0, scale: 0.8, y: 40 }}
// //           animate={{ opacity: 1, scale: 1, y: 0 }}
// //           transition={{ duration: 1 }}
// //           className="relative"
// //         >
// //           {/* إطار زخرفي هندسي */}
// //           <div className="absolute inset-0 -z-10 rotate-45 opacity-30">
// //             <img src="/patterns/geometric-frame.svg" alt="frame" className="w-[320px] mx-auto" />
// //           </div>

// //           {/* الصورة */}
// //           <div className="w-[280px] h-[320px] rounded-[2rem] overflow-hidden border-2 border-[#C8A64B]/70 shadow-[0_0_45px_#C8A64B33]">
// //             <Image
// //               src="/assets/sediq1.jpg"
// //               alt="الشيخ محمد صديق المنشاوي"
// //               width={500}
// //               height={600}
// //               className="w-full h-full object-cover"
// //             />
// //           </div>

// //           {/* وهج ذهبي خلف الصورة */}
// //           <motion.div
// //             animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
// //             transition={{ duration: 6, repeat: Infinity }}
// //             className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,#C8A64B55,transparent_70%)] blur-2xl"
// //           />
// //         </motion.div>

// //         {/* النصوص */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 40 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 1, delay: 0.4 }}
// //           className="space-y-6"
// //         >
// //           <h1 className="text-4xl md:text-5xl font-['Amiri'] text-[#C8A64B] font-bold leading-relaxed">
// //             الشيخ محمد صديق المنشاوي
// //           </h1>
// //           <p className="text-gray-200 text-lg md:text-xl font-['Cairo'] max-w-2xl mx-auto">
// //             أحد أعظم قراء القرآن الكريم بصوتٍ يأسر الأرواح ويُبقي التلاوة خالدة عبر الأجيال.
// //           </p>
// //         </motion.div>

// //         {/* الأزرار */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.8, delay: 0.8 }}
// //           className="flex flex-wrap justify-center gap-5 pt-4"
// //         >
// //           <button
// //             onClick={() => router.push('/Listen')}
// //             className="px-10 py-3 rounded-full bg-[#C8A64B] text-[#0A2F24] font-semibold font-['Cairo'] shadow-lg shadow-[#C8A64B55] hover:scale-105 hover:bg-[#e3c26f] transition-all"
// //           >
// //             🎧 استمع الآن
// //           </button>
// //           <button
// //             onClick={() => router.push('/About')}
// //             className="px-10 py-3 rounded-full border border-[#C8A64B] text-[#C8A64B] font-['Cairo'] hover:bg-[#C8A64B]/10 transition-all"
// //           >
// //             عن الشيخ
// //           </button>
// //         </motion.div>
// //       </div>

// //       {/* زخرفة سفلية */}
// //       {/* <motion.img
// //         src="/patterns/ornament-bottom.svg"
// //         alt="Ornament"
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 0.6, y: 0 }}
// //         transition={{ duration: 1.2 }}
// //         className="absolute bottom-4 left-1/2 -translate-x-1/2 w-56"
// //       /> */}
// //     </section>
// //   )
// // }

// 'use client'
// import React, { useState } from 'react'
// import Image from 'next/image'
// import { motion, useMotionValue, useTransform } from 'framer-motion'
// import { useRouter } from 'next/navigation'

// export default function Hero() {
//   const router = useRouter()
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

//   // حركة ثلاثية الأبعاد للإطار والنصوص بناءً على موقع الماوس
//   const x = useMotionValue(0)
//   const y = useMotionValue(0)
//   const rotateX = useTransform(y, [0, 1], [15, -15])
//   const rotateY = useTransform(x, [0, 1], [-15, 15])

//   const handleMouseMove = (e) => {
//     const { innerWidth, innerHeight } = window
//     setMousePosition({
//       x: e.clientX / innerWidth,
//       y: e.clientY / innerHeight,
//     })
//     x.set(e.clientX / innerWidth)
//     y.set(e.clientY / innerHeight)
//   }

//   return (
//     <section
//       className="relative w-full min-h-screen bg-gradient-to-b from-[#081F18] to-[#0A2F24] flex flex-col justify-center items-center overflow-hidden text-white"
//       onMouseMove={handleMouseMove}
//     >
//       {/* الخلفية المتحركة */}
//       <motion.div
//         animate={{ rotate: [0, 360] }}
//         transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
//         className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C8A64B22,transparent_60%)]"
//       />

//       {/* المحتوى الرئيسي */}
//       <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">

//         {/* صورة شخصية بإطار ديناميكي 3D */}
//         <motion.div
//           style={{ rotateX, rotateY }}
//           transition={{ type: 'spring', stiffness: 50, damping: 20 }}
//           className="relative flex-shrink-0 cursor-pointer perspective-1000"
//         >
//           {/* إطار هندسي متحرك */}
//           <motion.div
//             animate={{ rotate: [0, 10, -10, 0] }}
//             transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
//             className="absolute inset-0 -z-10 flex justify-center items-center"
//           >
//             <img
//               src="/patterns/geometric-frame.svg"
//               alt="frame"
//               className="w-80 md:w-96 opacity-40"
//             />
//           </motion.div>

//           {/* الصورة الشخصية */}
//           <div className="relative w-64 md:w-80 h-80 md:h-96 rounded-3xl overflow-hidden border-4 border-[#C8A64B]/60 shadow-[0_0_60px_#C8A64B33]">
//             <Image
//               src="/assets/sediq1.jpg"
//               alt="الشيخ محمد صديق المنشاوي"
//               fill
//               className="object-cover"
//             />
//           </div>

//           {/* وهج خلف الصورة */}
//           <motion.div
//             animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
//             transition={{ duration: 6, repeat: Infinity }}
//             className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,#C8A64B55,transparent_70%)] blur-3xl rounded-3xl"
//           />
//         </motion.div>

//         {/* النصوص والمحتوى مع تأثير Parallax */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1, delay: 0.5 }}
//           style={{
//             x: useTransform(x, [0, 1], [-30, 30]),
//             y: useTransform(y, [0, 1], [-20, 20]),
//           }}
//           className="flex-1 flex flex-col gap-6 md:gap-8 text-center md:text-left"
//         >
//           <h1 className="text-4xl md:text-6xl font-['Amiri'] text-[#C8A64B] font-bold leading-tight">
//             الشيخ محمد صديق المنشاوي
//           </h1>
//           <p className="text-gray-200 text-lg md:text-xl font-['Cairo'] max-w-xl">
//             أحد أعظم قراء القرآن الكريم، بصوتٍ يأسر القلوب ويُخلّد التلاوة عبر الأجيال.
//           </p>

//           {/* أزرار CTA */}
//           <div className="flex flex-wrap gap-5 mt-4 justify-center md:justify-start">
//             <motion.button
//               whileHover={{ scale: 1.05, rotateZ: 2 }}
//               whileTap={{ scale: 0.95, rotateZ: -2 }}
//               onClick={() => router.push('/Listen')}
//               className="px-8 py-3 rounded-full bg-[#C8A64B] text-[#0A2F24] font-semibold font-['Cairo'] shadow-lg shadow-[#C8A64B55] transition-all"
//             >
//               🎧 استمع الآن
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05, rotateZ: 2 }}
//               whileTap={{ scale: 0.95, rotateZ: -2 }}
//               onClick={() => router.push('/About')}
//               className="px-8 py-3 rounded-full border border-[#C8A64B] text-[#C8A64B] font-['Cairo'] hover:bg-[#C8A64B]/10 transition-all"
//             >
//               عن الشيخ
//             </motion.button>
//           </div>
//         </motion.div>
//       </div>

//       {/* زخرفة سفلية ديناميكية */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 0.6, y: 0 }}
//         transition={{ duration: 1.2 }}
//         className="absolute bottom-6 left-1/2 -translate-x-1/2 w-60 md:w-72"
//       >
//         <img src="/patterns/ornament-bottom.svg" alt="ornament" className="w-full" />
//       </motion.div>
//     </section>
//   )
// }
'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function BioSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* 🌄 خلفية الصورة */}
      <Image
        src="/assets/quran3.jpeg" 
        alt="الشيخ محمد صديق المنشاوي"
        fill
        className="object-cover object-center opacity-90"
        priority
      />

      {/* 🌓 طبقة overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B3D2E]/80 via-[#0B3D2E]/70 to-[#0B3D2E]/90 backdrop-blur-[2px]" />

      {/* ✨ محتوى النص */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-4xl px-6 text-center text-[#F7F6F2]"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#C8A64B]">
          الشيخ محمد صديق المنشاوي
        </h2>

        <p className="text-lg md:text-xl leading-relaxed text-[#F7F6F2]/90">
          أحد أعلام تلاوة القرآن الكريم في القرن العشرين، امتاز بصوته الخاشع
          وتجويده البديع الذي يخاطب القلوب قبل الآذان. ترك الشيخ المنشاوي إرثًا
          خالدًا من التلاوات التي تملأ المسامع بالسكينة والروحانية، وظلّ صوته
          رمزًا للخشوع والتدبر في تلاوة كتاب الله.
        </p>

        <div className="mt-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-[#C8A64B] text-[#0B3D2E] px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-[#D9C7A3] transition"
          >
            اقرأ المزيد عن الشيخ
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
