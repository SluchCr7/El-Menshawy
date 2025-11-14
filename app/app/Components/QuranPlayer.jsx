// "use client"
// import React, { useState, useRef, useEffect } from "react"
// import { menshQuran } from "../utils/Data" // تأكد من وجود هذا الملف والبيانات
// import PlayerHeader from "./Quran/PlayerHeader"
// import SurahSelector from "./Quran/SurahSelector"
// import SurahInfo from "./Quran/SurahInfo"
// import PlayerControls from "./Quran/PlayersControl"
// import ProgressBar from "./Quran/ProgressBar"

// export default function QuranPlayer() {
//   // ... (الحالة والـ Hooks تبقى كما هي)
//   const [surahId, setSurahId] = useState(1)
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [progress, setProgress] = useState(0)
//   const [duration, setDuration] = useState(0)
//   const audioRef = useRef(null)

//   // 🟢 تحميل السورة الجديدة
//   useEffect(() => {
//     const audio = audioRef.current
//     if (!audio) return
//     const currentSurah = menshQuran.find((s) => s.id === surahId)
//     if (!currentSurah) return
//     audio.src = currentSurah.url
//     audio.load()
//     // تبقى حالة التشغيل على false حتى يقوم المستخدم بالضغط
//     setIsPlaying(false)
//     setProgress(0)
//     setDuration(0)
//   }, [surahId])

//   // 🟢 متابعة التقدم
//   useEffect(() => {
//     const audio = audioRef.current
//     if (!audio) return
//     const updateProgress = () => setProgress(audio.currentTime || 0)
//     const handleLoaded = () =>
//       setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
    
//     // لإعادة التشغيل تلقائيًا عند الانتهاء (اختياري)
//     const handleEnded = () => {
//       setIsPlaying(false);
//       nextSurah(); 
//     };

//     audio.addEventListener("timeupdate", updateProgress)
//     audio.addEventListener("loadedmetadata", handleLoaded)
//     audio.addEventListener("ended", handleEnded) 
    
//     return () => {
//       audio.removeEventListener("timeupdate", updateProgress)
//       audio.removeEventListener("loadedmetadata", handleLoaded)
//       audio.removeEventListener("ended", handleEnded)
//     }
//   }, [surahId]) // يتم التحديث عند تغيير السورة لضمان عمل الدالة `handleEnded` بشكل صحيح

//   // 🟢 تشغيل/إيقاف
//   const togglePlay = () => {
//     const audio = audioRef.current
//     if (!audio) return
//     if (isPlaying) {
//       audio.pause()
//       setIsPlaying(false)
//     } else {
//       // استخدام Try/Catch للتعامل مع متصفحات تمنع التشغيل التلقائي
//       audio.play().then(() => setIsPlaying(true)).catch(e => {
//         console.error("Failed to play audio:", e)
//         setIsPlaying(false)
//       })
//     }
//   }

//   const nextSurah = () => surahId < menshQuran.length && setSurahId(surahId + 1)
//   const prevSurah = () => surahId > 1 && setSurahId(surahId - 1)

//   const formatTime = (sec) => {
//     if (!Number.isFinite(sec) || sec <= 0) return "0:00"
//     const m = Math.floor(sec / 60)
//     const s = Math.floor(sec % 60).toString().padStart(2, "0")
//     return `${m}:${s}`
//   }

//   // --- التصميم الجديد ---
//   return (
//     // الخلفية أصبحت بسيطة أو بيضاء/فاتحة لتناسب الموقع، والمشغل له خلفية داكنة فاخرة.
//     <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
//       <audio ref={audioRef} className="hidden" />

//       {/* الحاوية الجديدة: تصميم زجاجي (Glassmorphism) أو داكن أنيق */}
//       <div className="w-full max-w-xl p-8 rounded-3xl shadow-2xl bg-gray-900/90 backdrop-blur-sm border border-green-700/50">
        
//         {/* المكونات بترتيب منطقي: العنوان -> معلومات السورة -> اختيار السورة -> شريط التحكم/التقدم */}
//         <PlayerHeader />
        
//         <SurahInfo surahs={menshQuran} surahId={surahId} /> 
        
//         <SurahSelector surahId={surahId} setSurahId={setSurahId} surahs={menshQuran} />

//         <ProgressBar
//           progress={progress}
//           duration={duration}
//           setProgress={setProgress}
//           audioRef={audioRef}
//           formatTime={formatTime}
//         />

//         <PlayerControls
//           isPlaying={isPlaying}
//           togglePlay={togglePlay}
//           nextSurah={nextSurah}
//           prevSurah={prevSurah}
//           surahId={surahId}
//           surahs={menshQuran}
//         />
//       </div>
//     </div>
//   )
// }
'use client'
import React, { useState, useRef, useEffect } from 'react'
import { menshQuran } from '@/app/utils/Data'
import PlayerControls from '@/app/Components/Quran/PlayersControl'
import ProgressBar from '@/app/Components/Quran/ProgressBar'
import SurahSelector from '@/app/Components/Quran/SurahSelector'
import { PlayCircle, BookOpen } from 'lucide-react'
import Image from 'next/image'

export default function QuranPlayer() {
  const [surahId, setSurahId] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  const surah = menshQuran.find((s) => s.id === surahId)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !surah) return
    audio.src = surah.url
    audio.load()
    setIsPlaying(false)
    setProgress(0)
    setDuration(0)
  }, [surahId])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const update = () => setProgress(audio.currentTime)
    const loaded = () => setDuration(audio.duration || 0)
    const ended = () => {
      setIsPlaying(false)
      if (surahId < menshQuran.length) setSurahId(surahId + 1)
    }

    audio.addEventListener('timeupdate', update)
    audio.addEventListener('loadedmetadata', loaded)
    audio.addEventListener('ended', ended)
    return () => {
      audio.removeEventListener('timeupdate', update)
      audio.removeEventListener('loadedmetadata', loaded)
      audio.removeEventListener('ended', ended)
    }
  }, [surahId])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(console.warn)
    }
  }

  const nextSurah = () => surahId < menshQuran.length && setSurahId(surahId + 1)
  const prevSurah = () => surahId > 1 && setSurahId(surahId - 1)
  const formatTime = (s) => {
    if (!s) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  return (
    <section className="relative w-full py-20 bg-[#0B3D2E] overflow-hidden text-[#F7F6F2]">
      {/* زخارف الخلفية */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "url('/patterns/mashrabiya.svg')",
          backgroundSize: '200px',
          backgroundRepeat: 'repeat',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E] via-[#0B3D2E]/80 to-transparent" />

      {/* المحتوى */}
      <div className="relative max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        {/* العنوان */}
        <div className="mb-12">
          <div className="flex justify-center mb-3">
            <PlayCircle className="w-12 h-12 text-[#C8A64B]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-['Amiri'] font-bold text-[#C8A64B] drop-shadow-[0_0_15px_#C8A64B55]">
            مشغل القرآن الكريم
          </h2>
          <p className="mt-2 text-[#D9C7A3] text-lg font-['Cairo']">
            استمع لتلاوات الشيخ محمد صديق المنشاوي بخشوع وروحانية
          </p>
        </div>

        {/* البطاقة الرئيسية */}
        <div className="relative w-full max-w-3xl bg-[#1A1A1A]/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#C8A64B]/40 p-8">
          {/* غلاف سورة زخرفي */}
          <div className="flex flex-col items-center mb-6">
            {/* <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-[#C8A64B]/70 shadow-[0_0_25px_#C8A64B33] mb-4">
              <Image
                src="/assets/quran-cover.jpg"
                alt="Quran"
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div> */}
            <h3 className="text-2xl font-bold text-[#C8A64B] font-['Amiri']">
              {surah?.name || 'سورة غير محددة'}
            </h3>
            <p className="text-[#D9C7A3] text-sm mt-1">
              السورة رقم {surahId} من القرآن الكريم
            </p>
          </div>

          {/* اختيار السورة */}
          <SurahSelector surahId={surahId} setSurahId={setSurahId} surahs={menshQuran} />

          {/* شريط التقدم */}
          <ProgressBar
            progress={progress}
            duration={duration}
            setProgress={setProgress}
            audioRef={audioRef}
            formatTime={formatTime}
          />

          {/* أدوات التحكم */}
          <PlayerControls
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            nextSurah={nextSurah}
            prevSurah={prevSurah}
            surahId={surahId}
            surahs={menshQuran}
          />
        </div>
      </div>

      <audio ref={audioRef} preload="metadata" className="hidden" />
    </section>
  )
}
