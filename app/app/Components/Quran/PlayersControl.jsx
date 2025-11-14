import { Play, Pause, SkipBack, SkipForward, Repeat2 } from "lucide-react"

export default function PlayerControls({ isPlaying, togglePlay, nextSurah, prevSurah, surahId, surahs }) {
  // يمكن إضافة زر التكرار أو التقديم/التأخير هنا
  
  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      {/* زر السابق - أيقونة SkipBack أكثر دقة من StepBack */}
      <button
        onClick={prevSurah}
        disabled={surahId === 1}
        className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition disabled:opacity-30 disabled:cursor-not-allowed text-white/80 transform hover:scale-105"
        title="السورة السابقة"
      >
        <SkipBack size={24} />
      </button>

      {/* زر التشغيل/الإيقاف - أكبر وأكثر تميزًا */}
      <button
        onClick={togglePlay}
        className="p-5 bg-green-600 rounded-full hover:bg-green-700 shadow-2xl shadow-green-600/50 transition transform active:scale-90 text-white border-2 border-green-400"
        title={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
      >
        {isPlaying ? <Pause size={30} fill="currentColor" /> : <Play size={30} fill="currentColor" />}
      </button>

      {/* زر التالي - أيقونة SkipForward أكثر دقة من StepForward */}
      <button
        onClick={nextSurah}
        disabled={surahId === surahs.length}
        className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition disabled:opacity-30 disabled:cursor-not-allowed text-white/80 transform hover:scale-105"
        title="السورة التالية"
      >
        <SkipForward size={24} />
      </button>
    </div>
  )
}