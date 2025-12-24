import { Play, Pause, SkipBack, SkipForward, RotateCcw, Volume2 } from "lucide-react"
import { motion } from "framer-motion"

export default function PlayerControls({ isPlaying, togglePlay, nextSurah, prevSurah, surahId, surahs }) {
  return (
    <div className="flex items-center justify-center gap-8 md:gap-12">
      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={prevSurah}
        disabled={surahId === 1}
        className="p-4 rounded-full bg-accent/5 border border-accent/20 text-accent hover:bg-accent/10 transition-colors disabled:opacity-20 disabled:cursor-not-allowed group"
        title="السورة السابقة"
      >
        <SkipForward size={28} className="group-hover:translate-x-1 transition-transform" />
      </motion.button>

      {/* Main Play/Pause Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className={`relative p-8 rounded-full shadow-[0_0_50px_rgba(212,175,55,0.2)] transition-all duration-500 overflow-hidden group ${isPlaying ? 'bg-primary border-2 border-accent/50' : 'bg-accent border-2 border-white/20'
          }`}
        title={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
      >
        {/* Animated Glow Overlay */}
        <div className={`absolute inset-0 bg-white/20 transition-transform duration-500 translate-y-full group-hover:translate-y-0`} />

        <div className="relative z-10 transition-all duration-300">
          {isPlaying ? (
            <Pause size={40} className="text-accent fill-accent" />
          ) : (
            <Play size={40} className="text-primary fill-primary translate-x-1" />
          )}
        </div>

        {/* Ripple effect when playing */}
        {isPlaying && (
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 border-2 border-accent rounded-full pointer-events-none"
          />
        )}
      </motion.button>

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={nextSurah}
        disabled={surahId === surahs.length}
        className="p-4 rounded-full bg-accent/5 border border-accent/20 text-accent hover:bg-accent/10 transition-colors disabled:opacity-20 disabled:cursor-not-allowed group"
        title="السورة التالية"
      >
        <SkipBack size={28} className="group-hover:-translate-x-1 transition-transform" />
      </motion.button>
    </div>
  )
}