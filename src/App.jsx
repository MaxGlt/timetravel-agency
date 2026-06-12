import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from './components/Hero'
import DestinationCard from './components/DestinationCard'
import ChatWidget from './components/ChatWidget'
import Quiz from './components/Quiz'
import BookingForm from './components/BookingForm'
import LegalModal from './components/LegalModal'

export const DESTINATIONS = [
  {
    id: 'paris',
    name: 'Paris 1889',
    era: 'Belle Époque',
    tagline: "L'Exposition Universelle vous attend",
    description:
      "Plongez dans l'effervescence de Paris au temps de la Tour Eiffel toute neuve. Côtoyez les grands esprits de l'époque et savourez le raffinement d'une ère bénie.",
    price: '89 000 €',
    duration: '7 nuits',
    badge: 'Élégance & Raffinement',
    badgeColor: 'bg-amber-700/70',
    images: [
      'assets/images/paris/paris-hero-1.jpg',
      'assets/images/paris/paris-hero-2.jpg',
      'assets/images/paris/paris-hero-3.jpg',
    ],
    video: 'assets/videos/paris-bg.mp4',
    highlights: ['Tour Eiffel inaugurale', 'Exposition Universelle', 'Café de la Paix'],
    accentColor: '#C8960C',
  },
  {
    id: 'cretace',
    name: 'Crétacé –65M',
    era: 'Préhistoire',
    tagline: 'Là où tout a commencé',
    description:
      "Traversez 65 millions d'années pour contempler la Terre vierge. Observez des dinosaures dans leur habitat naturel depuis votre pod d'observation blindé.",
    price: '145 000 €',
    duration: '5 nuits',
    badge: 'Aventure Extrême',
    badgeColor: 'bg-green-900/70',
    images: [
      'assets/images/cretace/cretace-hero-1.jpg',
      'assets/images/cretace/cretace-hero-2.jpg',
      'assets/images/cretace/cretace-hero-3.jpg',
    ],
    video: 'assets/videos/cretace-bg.mp4',
    highlights: ['Safari T-Rex garanti', 'Faune préhistorique', 'Pod pressurisé dernier cri'],
    accentColor: '#2D6A2D',
  },
  {
    id: 'florence',
    name: 'Florence 1504',
    era: 'Renaissance',
    tagline: 'Au cœur du génie humain',
    description:
      "Visitez l'atelier de Michel-Ange, croisez Léonard de Vinci dans les rues pavées, et assistez à la création des œuvres qui ont défini notre civilisation.",
    price: '112 000 €',
    duration: '10 nuits',
    badge: 'Culture & Art',
    badgeColor: 'bg-indigo-900/70',
    images: [
      'assets/images/florence/florence-hero-1.jpg',
      'assets/images/florence/florence-hero-2.jpg',
      'assets/images/florence/florence-hero-3.jpg',
    ],
    video: 'assets/videos/florence-bg.mp4',
    highlights: ["Atelier de Michel-Ange", 'Galerie des Médicis privée', 'Duomo au lever du soleil'],
    accentColor: '#7C3B8A',
  },
]

const NAV_LINKS = [
  { label: 'Destinations', id: 'destinations' },
  { label: 'Quiz IA', id: 'quiz' },
  { label: 'Réservation', id: 'booking' },
]

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [bookingDest, setBookingDest] = useState('')
  const [legalModal, setLegalModal] = useState(null) // 'mentions' | 'politique' | 'contact'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  const handleBookDestination = (id) => {
    setBookingDest(id)
    setTimeout(() => scrollTo('booking'), 80)
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* ── Fixed Header ── */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-[#D4A017]/20'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="flex flex-col items-start group">
            <span className="font-cinzel text-[#D4A017] text-lg font-bold tracking-[0.3em] group-hover:text-white transition-colors duration-300">
              TIMETRAVEL
            </span>
            <span className="font-cinzel text-white/50 text-xs tracking-[0.5em] group-hover:text-[#D4A017] transition-colors duration-300">
              AGENCY
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-white/60 hover:text-[#D4A017] text-xs tracking-[0.2em] uppercase transition-colors duration-300"
              >
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo('booking')} className="btn-gold px-5 py-2">
              Réserver
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className={`block h-0.5 w-6 bg-[#D4A017] transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-[#D4A017] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-[#D4A017] transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 border-t border-[#D4A017]/20 overflow-hidden"
            >
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="block w-full text-left px-6 py-4 text-white/60 hover:text-[#D4A017] text-sm tracking-[0.15em] uppercase border-b border-white/5 transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Hero ── */}
      <section id="hero">
        <Hero onExplore={() => scrollTo('destinations')} onQuiz={() => scrollTo('quiz')} />
      </section>

      {/* ── Agency Pitch ── */}
      <section className="py-28 px-6 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-[#D4A017] text-xs tracking-[0.45em] uppercase mb-4">Notre mission</p>
            <h2 className="font-cinzel text-4xl md:text-5xl text-white mb-6 leading-tight">
              Le temps n'est plus une limite
            </h2>
            <p className="text-white/50 text-base max-w-2xl mx-auto leading-relaxed">
              Fondée en 2031, TimeTravel Agency est la première agence de voyage temporel agréée par
              le Conseil International de Chronologie. Sécurité absolue, luxe intemporel, histoire vivante.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '◈',
                title: 'Luxe Absolu',
                desc: "Hébergements temporels 5 étoiles, guide historien privé et gastronomie d'époque. Chaque voyage est taillé sur mesure.",
              },
              {
                icon: '◉',
                title: 'Sécurité Maximale',
                desc: 'Technologie chronologique de pointe, protocoles certifiés ISO-Temporal, assurance tous-risques spatio-temporelle.',
              },
              {
                icon: '◎',
                title: 'Histoire Vivante',
                desc: "Ne lisez plus l'histoire — vivez-la. Nos experts vous immergeront dans chaque époque de manière authentique.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="text-center p-8 border border-[#D4A017]/20 hover:border-[#D4A017]/60 transition-all duration-500"
              >
                <span className="text-4xl text-[#D4A017] mb-5 block">{item.icon}</span>
                <h3 className="font-cinzel text-white text-lg mb-3 tracking-wider">{item.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#D4A017] text-xs tracking-[0.45em] uppercase mb-4">Processus</p>
            <h2 className="font-cinzel text-3xl md:text-4xl text-white">Comment ça marche</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Consultez Maya', desc: 'Notre IA vous conseille sur la destination idéale selon votre profil.' },
              { step: '02', title: 'Choisissez', desc: 'Sélectionnez parmi nos 3 périodes exclusives soigneusement sécurisées.' },
              { step: '03', title: 'Réservez', desc: 'Complétez votre dossier. Notre équipe prend tout en charge.' },
              { step: '04', title: 'Voyagez', desc: "Embarquez depuis notre Chrono-Terminal et vivez l'histoire de l'intérieur." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="font-cinzel text-5xl font-bold text-[#D4A017]/20 mb-2">{item.step}</div>
                <h3 className="text-white font-semibold text-xs tracking-[0.2em] uppercase mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Destinations ── */}
      <section id="destinations" className="py-28 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#D4A017] text-xs tracking-[0.45em] uppercase mb-4">Explorez</p>
            <h2 className="font-cinzel text-4xl md:text-5xl text-white mb-4">Nos Destinations</h2>
            <p className="text-white/45 text-sm max-w-xl mx-auto leading-relaxed">
              Trois époques sélectionnées pour leur magnificence, leur sécurité et leur valeur historique
              exceptionnelle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DESTINATIONS.map((dest, i) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                index={i}
                onBook={() => handleBookDestination(dest.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Cinematic Reel ── */}
      <section className="relative overflow-hidden" style={{ height: '60vh' }}>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={`${import.meta.env.BASE_URL}assets/videos/timetravel-reel.mp4`}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center px-6"
          >
            <p className="font-cinzel text-[#D4A017] text-xs tracking-[0.5em] uppercase mb-4">
              TimeTravel Agency
            </p>
            <h2 className="font-cinzel text-4xl md:text-6xl text-white mb-8 leading-tight">
              L'histoire comme
              <br />
              vous ne l'avez jamais vécue
            </h2>
            <button onClick={() => scrollTo('quiz')} className="btn-gold">
              Trouver ma destination
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Quiz ── */}
      <section id="quiz" className="py-28 bg-black">
        <Quiz onBookDestination={handleBookDestination} />
      </section>

      {/* ── Booking ── */}
      <section id="booking" className="py-28 bg-neutral-950">
        <BookingForm
          destinations={DESTINATIONS}
          preSelected={bookingDest}
          onDestinationChange={setBookingDest}
        />
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#D4A017]/20 py-12 px-6 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-cinzel text-[#D4A017] text-sm tracking-[0.3em] font-bold">
              TIMETRAVEL AGENCY
            </span>
            <p className="text-white/25 text-xs mt-1 tracking-wider">
              © 2031 — Tous droits réservés dans tous les temps
            </p>
          </div>
          <div className="flex gap-8">
            {[
              { label: 'Mentions légales', id: 'mentions' },
              { label: 'Politique temporelle', id: 'politique' },
              { label: 'Contact', id: 'contact' },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => setLegalModal(id)}
                className="text-white/35 text-xs hover:text-[#D4A017] cursor-pointer transition-colors tracking-wider"
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-white/20 text-xs text-center md:text-right">
            Projet pédagogique — M1/M2 Digital & IA
            <br />
            Ynov Campus Paris 2025/2026
          </p>
        </div>
      </footer>

      {/* ── Chat Widget (floating) ── */}
      <div id="chat">
        <ChatWidget />
      </div>

      {/* ── Legal Modals ── */}
      {legalModal && (
        <LegalModal modalId={legalModal} onClose={() => setLegalModal(null)} />
      )}
    </div>
  )
}

export default App
