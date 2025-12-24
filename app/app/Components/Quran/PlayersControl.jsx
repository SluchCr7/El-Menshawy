import { Play, Pause, SkipBack, SkipForward, Headphones, Repeat } from "lucide-react"
import { motion } from "framer-motion"

export default function PlayerControls({ isPlaying, togglePlay, nextSurah, prevSurah, surahId, surahs }) {
  return (
    <div className="flex items-center justify-center gap-6 md:gap-10">
      {/* Secondary Controls - Shuffle/Repeat placeholders for 'Pro' look */}
      <motion.button
        whileHover={{ scale: 1.1, color: '#D4AF37' }}
        className="hidden md:block p-3 text-white/20 transition-colors"
      >
        <Repeat size={18} />
      </motion.button>

      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: 1.2, x: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={prevSurah}
        disabled={surahId === 1}
        className="p-4 rounded-3xl bg-white/5 border border-white/10 text-white/80 hover:text-accent hover:border-accent/40 transition-all disabled:opacity-10 disabled:cursor-not-allowed group shadow-lg"
        title="السورة السابقة"
      >
        <SkipForward size={24} className="group-hover:translate-x-0.5 transition-transform" />
      </motion.button>

      {/* Main Play/Pause Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={togglePlay}
        className={`relative p-8 md:p-10 rounded-[2.5rem] shadow-[0_15px_40px_rgba(212,175,55,0.15)] transition-all duration-700 group ${isPlaying
            ? 'bg-gradient-to-br from-primary to-primary-dark border border-accent/30'
            : 'bg-gradient-to-br from-accent to-accent-dark border border-white/20'
          }`}
        title={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
      >
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />

        <div className="relative z-10 transition-all duration-500">
          {isPlaying ? (
            <Pause size={44} className="text-accent fill-accent" />
          ) : (
            <Play size={44} className="text-primary fill-primary translate-x-1" />
          )}
        </div>

        {/* Dynamic Border Glow */}
        {isPlaying && (
          <motion.div
            animate={{
              boxShadow: ["0 0 20px rgba(212,175,55,0.2)", "0 0 40px rgba(212,175,55,0.4)", "0 0 20px rgba(212,175,55,0.2)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-[2.5rem]"
          />
        )}
      </motion.button>

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.2, x: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={nextSurah}
        disabled={surahId === surahs.length}
        className="p-4 rounded-3xl bg-white/5 border border-white/10 text-white/80 hover:text-accent hover:border-accent/40 transition-all disabled:opacity-10 disabled:cursor-not-allowed group shadow-lg"
        title="السورة التالية"
      >
        <SkipBack size={24} className="group-hover:-translate-x-0.5 transition-transform" />
      </motion.button>

      {/* Headphones Info Toggle placeholder */}
      <motion.button
        whileHover={{ scale: 1.1, color: '#D4AF37' }}
        className="hidden md:block p-3 text-white/20 transition-colors"
      >
        <Headphones size={18} />
      </motion.button>
    </div>
  )
}
