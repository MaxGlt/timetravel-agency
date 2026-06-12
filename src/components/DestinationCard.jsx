import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const BASE = import.meta.env.BASE_URL

function DestinationCard({ destination, index, onBook }) {
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef(null)

  const handleMouseEnter = () => {
    setHovered(true)
    videoRef.current?.play().catch(() => {})
  }

  const handleMouseLeave = () => {
    setHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.75,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative overflow-hidden cursor-pointer group"
      style={{ height: '540px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Static image */}
      <motion.img
        src={`${BASE}${destination.images[0]}`}
        alt={destination.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Hover video */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <video
          ref={videoRef}
          src={`${BASE}${destination.video}`}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="none"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/25 to-transparent" />

      {/* Colored tint on hover */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${destination.accentColor}35, transparent)`,
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Era badge */}
      <div
        className={`absolute top-5 right-5 ${destination.badgeColor} px-3 py-1 text-xs tracking-[0.2em] uppercase text-white/90 font-medium backdrop-blur-sm`}
      >
        {destination.badge}
      </div>

      {/* Card content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <motion.div
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <p
            className="text-xs tracking-[0.35em] uppercase mb-1"
            style={{ color: destination.accentColor }}
          >
            {destination.era}
          </p>
          <h3 className="font-cinzel text-2xl font-bold text-white mb-2">{destination.name}</h3>
          <p className="text-white/55 text-sm leading-relaxed mb-4 line-clamp-2">
            {destination.description}
          </p>

          {/* Highlights — visible on hover */}
          <motion.div
            animate={{
              opacity: hovered ? 1 : 0,
              height: hovered ? 'auto' : 0,
            }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden mb-4"
          >
            <ul className="space-y-1.5">
              {destination.highlights.map((h, i) => (
                <li key={i} className="text-white/65 text-xs flex items-center gap-2">
                  <span style={{ color: destination.accentColor }}>◈</span>
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Price & duration */}
          <div className="flex items-end justify-between mb-5">
            <div>
              <span className="text-white/35 text-xs tracking-wider block">À partir de</span>
              <span
                className="font-cinzel text-xl font-bold"
                style={{ color: destination.accentColor }}
              >
                {destination.price}
              </span>
            </div>
            <div className="text-right">
              <span className="text-white/35 text-xs tracking-wider block">Durée</span>
              <span className="text-white text-sm font-medium">{destination.duration}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button onClick={onBook} className="flex-1 btn-gold py-2.5 text-xs">
              Réserver
            </button>
            <button
              onClick={() =>
                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="flex-1 btn-outline-gold py-2.5 text-xs"
            >
              En savoir plus
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default DestinationCard
