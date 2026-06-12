import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const BASE = import.meta.env.BASE_URL

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.6 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

function Hero({ onExplore, onQuiz }) {
  const [audioPlaying, setAudioPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggleAudio = () => {
    if (!audioRef.current) return
    if (audioPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setAudioPlaying((p) => !p)
  }

  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden flex items-center justify-center">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover scale-105"
        src={`${BASE}assets/videos/hero-bg.mp4`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

      {/* Vertical accent lines */}
      <motion.div
        className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4A017]/35 to-transparent"
        initial={{ scaleY: 0, originY: 0.5 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.6, delay: 1, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4A017]/35 to-transparent"
        initial={{ scaleY: 0, originY: 0.5 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.6, delay: 1.2, ease: 'easeInOut' }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="text-[#D4A017] text-xs tracking-[0.6em] uppercase mb-6 font-light"
        >
          Bienvenue chez
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-cinzel text-5xl md:text-7xl lg:text-[96px] font-bold text-white leading-none tracking-wider"
        >
          TIMETRAVEL
        </motion.h1>

        <motion.h1
          variants={itemVariants}
          className="font-cinzel text-5xl md:text-7xl lg:text-[96px] font-bold text-[#D4A017] leading-none tracking-[0.22em] mb-8"
        >
          AGENCY
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="w-24 h-px bg-[#D4A017] mx-auto mb-8"
        />

        <motion.p
          variants={itemVariants}
          className="text-white/65 text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-light mb-12"
        >
          Explorez l'histoire comme jamais auparavant.
          <br />
          <span className="text-[#D4A017]">Le temps n'est plus une limite.</span>
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button onClick={onExplore} className="btn-gold">
            Explorer les destinations
          </button>
          <button onClick={onQuiz} className="btn-outline-gold">
            Trouver ma destination
          </button>
        </motion.div>
      </motion.div>

      {/* Audio toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-8 z-10"
      >
        <button
          onClick={toggleAudio}
          className="flex items-center gap-2.5 text-white/45 hover:text-[#D4A017] transition-colors text-xs tracking-widest uppercase group"
          aria-label={audioPlaying ? 'Couper la musique' : 'Activer la musique'}
        >
          <span className="w-8 h-8 border border-white/25 group-hover:border-[#D4A017]/50 flex items-center justify-center transition-colors shrink-0">
            {audioPlaying ? (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </span>
          <span>{audioPlaying ? 'Son actif' : 'Activer le son'}</span>
        </button>
        <audio
          ref={audioRef}
          src={`${BASE}assets/audio/skyline-runway.mp3`}
          loop
          preload="none"
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/25 text-xs tracking-[0.35em] uppercase">Défiler</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[#D4A017]/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}

export default Hero
