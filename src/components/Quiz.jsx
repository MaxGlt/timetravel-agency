import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SYSTEM_PROMPT = `Tu es l'expert en voyages temporels de TimeTravel Agency.
Analyse les réponses du quiz et génère une recommandation personnalisée pour UNE des 3 destinations :
- Paris 1889 (Belle Époque) — pour l'élégance, l'histoire moderne, l'effervescence urbaine
- Crétacé –65M (Préhistoire) — pour l'aventure extrême, la nature sauvage, l'observation de la faune
- Florence 1504 (Renaissance) — pour la culture, l'art, les musées, l'architecture

Format de réponse : 3-4 phrases en français, avec :
1. La destination recommandée (en majuscules ou gras Markdown)
2. Pourquoi elle correspond au profil du voyageur
3. Une expérience spécifique qui l'attend
4. Une phrase d'invitation poétique à réserver

Ton : enthousiaste, cinématique, avec des métaphores temporelles. Sois précis sur la destination choisie.`

const QUESTIONS = [
  {
    id: 1,
    question: "Quel type d'expérience recherchez-vous ?",
    options: [
      { id: 'a', icon: '◈', label: 'Culturelle & Artistique', value: 'cultural' },
      { id: 'b', icon: '◉', label: 'Aventure & Nature', value: 'adventure' },
      { id: 'c', icon: '◎', label: 'Élégance & Raffinement', value: 'elegance' },
    ],
  },
  {
    id: 2,
    question: 'Votre période préférée ?',
    options: [
      { id: 'a', icon: '◈', label: 'Histoire moderne (XIXe–XXe siècle)', value: 'modern' },
      { id: 'b', icon: '◉', label: 'Origines & temps anciens', value: 'ancient' },
      { id: 'c', icon: '◎', label: 'Renaissance & classicisme', value: 'renaissance' },
    ],
  },
  {
    id: 3,
    question: 'Votre environnement idéal ?',
    options: [
      { id: 'a', icon: '◈', label: "L'effervescence urbaine", value: 'urban' },
      { id: 'b', icon: '◉', label: 'La nature sauvage et vierge', value: 'wild' },
      { id: 'c', icon: '◎', label: 'Art & architecture intemporels', value: 'art' },
    ],
  },
  {
    id: 4,
    question: 'Votre activité de voyage idéale ?',
    options: [
      { id: 'a', icon: '◈', label: 'Visiter des monuments historiques', value: 'monuments' },
      { id: 'b', icon: '◉', label: 'Observer la faune sauvage', value: 'fauna' },
      { id: 'c', icon: '◎', label: 'Explorer musées & ateliers', value: 'museums' },
    ],
  },
]

const DEST_META = {
  paris: { name: 'Paris 1889', color: '#C8960C', emoji: '🗼' },
  cretace: { name: 'Crétacé –65M', color: '#4A9A4A', emoji: '🦖' },
  florence: { name: 'Florence 1504', color: '#9B59B6', emoji: '🎨' },
}

function detectDestination(text) {
  const t = text.toLowerCase()
  if (t.includes('florence') || t.includes('renaissance')) return 'florence'
  if (
    t.includes('crétacé') ||
    t.includes('cretace') ||
    t.includes('dinosaure') ||
    t.includes('préhistoire') ||
    t.includes('prehistoire')
  )
    return 'cretace'
  return 'paris'
}

async function generateRecommendation(answers) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error(
      'Clé API manquante. Ajoutez VITE_ANTHROPIC_API_KEY dans votre .env.local puis relancez le serveur.'
    )
  }

  const summary = QUESTIONS.map((q, i) => {
    const chosen = q.options.find((o) => o.id === answers[i])
    return `${i + 1}. ${q.question} → ${chosen?.label ?? answers[i]}`
  }).join('\n')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 450,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Voici les réponses du client :\n${summary}\n\nGénère sa recommandation personnalisée.`,
        },
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || `Erreur API ${response.status}`)
  }

  const data = await response.json()
  return data.content[0].text
}

// Phase constants
const PHASE = { IDLE: 0, QUESTIONS: 1, LOADING: 2, RESULT: 3 }

function Quiz({ onBookDestination }) {
  const [phase, setPhase] = useState(PHASE.IDLE)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState([])
  const [recommendation, setRecommendation] = useState('')
  const [recommendedDest, setRecommendedDest] = useState('paris')
  const [error, setError] = useState(null)

  const handleStart = () => {
    setPhase(PHASE.QUESTIONS)
    setCurrentQ(0)
    setAnswers([])
    setRecommendation('')
    setError(null)
  }

  const handleAnswer = async (optionId) => {
    const newAnswers = [...answers, optionId]
    setAnswers(newAnswers)

    if (currentQ < 3) {
      setCurrentQ((q) => q + 1)
    } else {
      setPhase(PHASE.LOADING)
      try {
        const rec = await generateRecommendation(newAnswers)
        setRecommendation(rec)
        setRecommendedDest(detectDestination(rec))
        setPhase(PHASE.RESULT)
      } catch (err) {
        setError(err.message)
        setPhase(PHASE.RESULT)
      }
    }
  }

  const destMeta = DEST_META[recommendedDest]

  return (
    <div className="max-w-2xl mx-auto px-6">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-[#D4A017] text-xs tracking-[0.45em] uppercase mb-4">Personnalisation</p>
        <h2 className="font-cinzel text-4xl md:text-5xl text-white mb-4">
          Quel voyageur êtes-vous ?
        </h2>
        <p className="text-white/45 text-sm max-w-md mx-auto leading-relaxed">
          4 questions, 2 minutes. Notre IA génère une recommandation unique pour votre profil.
        </p>
      </motion.div>

      <div className="min-h-[360px]">
        <AnimatePresence mode="wait">
          {/* IDLE */}
          {phase === PHASE.IDLE && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="text-center"
            >
              <div className="border border-[#D4A017]/30 p-12">
                <div className="text-6xl text-[#D4A017] mb-5">◈</div>
                <p className="text-white/45 text-sm mb-8">
                  4 questions · Résultat personnalisé par IA
                </p>
                <button onClick={handleStart} className="btn-gold">
                  Commencer le quiz
                </button>
              </div>
            </motion.div>
          )}

          {/* QUESTIONS */}
          {phase === PHASE.QUESTIONS && (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-xs text-white/35 tracking-wider mb-2">
                  <span>Question {currentQ + 1} sur 4</span>
                  <span>{currentQ * 25}%</span>
                </div>
                <div className="h-px bg-white/10">
                  <motion.div
                    className="h-full bg-[#D4A017]"
                    initial={{ width: `${currentQ * 25}%` }}
                    animate={{ width: `${(currentQ + 1) * 25}%` }}
                    transition={{ duration: 0.55 }}
                  />
                </div>
              </div>

              <h3 className="font-cinzel text-xl md:text-2xl text-white mb-8 text-center leading-snug">
                {QUESTIONS[currentQ].question}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {QUESTIONS[currentQ].options.map((opt) => (
                  <motion.button
                    key={opt.id}
                    onClick={() => handleAnswer(opt.id)}
                    className="flex items-center gap-4 p-4 border border-white/10 hover:border-[#D4A017]/60 hover:bg-[#D4A017]/5 text-left transition-all duration-300 group"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-[#D4A017] text-xl group-hover:scale-110 transition-transform shrink-0">
                      {opt.icon}
                    </span>
                    <span className="text-white/75 group-hover:text-white text-sm tracking-wide transition-colors">
                      {opt.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* LOADING */}
          {phase === PHASE.LOADING && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="flex gap-2 mb-6">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-[#D4A017] rounded-full"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </div>
              <p className="text-white/40 text-sm tracking-wider">
                Maya analyse votre profil de voyageur…
              </p>
            </motion.div>
          )}

          {/* RESULT */}
          {phase === PHASE.RESULT && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {error ? (
                <div className="text-center py-8">
                  <p className="text-red-400 text-sm mb-6 bg-red-900/20 border border-red-800/30 px-4 py-3 leading-relaxed">
                    {error}
                  </p>
                  <button onClick={handleStart} className="btn-outline-gold text-xs">
                    Réessayer
                  </button>
                </div>
              ) : (
                <div
                  className="border p-8"
                  style={{ borderColor: `${destMeta.color}55` }}
                >
                  <p
                    className="text-xs tracking-[0.4em] uppercase mb-2"
                    style={{ color: destMeta.color }}
                  >
                    Votre destination idéale
                  </p>
                  <h3 className="font-cinzel text-3xl text-white mb-6">
                    {destMeta.emoji}&nbsp;{destMeta.name}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-8 whitespace-pre-wrap">
                    {recommendation}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => onBookDestination(recommendedDest)}
                      className="btn-gold flex-1"
                    >
                      Réserver cette destination
                    </button>
                    <button
                      onClick={handleStart}
                      className="btn-outline-gold flex-1 text-xs"
                    >
                      Refaire le quiz
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Quiz
