import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SYSTEM_PROMPT = `Tu es Maya, l'assistante virtuelle de TimeTravel Agency, la première agence de voyage temporel de luxe au monde.

Ton rôle : conseiller les clients avec passion et expertise sur nos destinations temporelles exclusives.
Ton ton : professionnel mais chaleureux, enthousiaste sans être familier, avec une légère touche de mystère liée au voyage dans le temps. Tu t'exprimes toujours en français. Garde tes réponses concises (3-5 phrases max sauf si l'utilisateur demande des détails).

Tes destinations :
- **Paris 1889 (Belle Époque)** — 89 000 €, 7 nuits. Tour Eiffel inaugurale, Exposition Universelle, Café de la Paix, effervescence artistique. Idéal pour les amateurs d'élégance et d'histoire moderne.
- **Crétacé –65 millions d'années (Préhistoire)** — 145 000 €, 5 nuits. Safari T-Rex depuis un pod blindé pressurisé, faune et flore préhistoriques intactes. Pour les aventuriers extrêmes.
- **Florence 1504 (Renaissance)** — 112 000 €, 10 nuits. Ateliers de Michel-Ange, mécénat des Médicis, création de chefs-d'œuvre en direct. Pour les passionnés d'art et de culture.

Inclusions standard : hébergement temporel 5 étoiles, repas d'époque, équipement de protection, guide chrono-historien. Options disponibles : guide privé (+8 000 €), assurance temporelle (+3 500 €), pack VIP (+15 000 €), pack photo holochronique (+2 000 €).

Restrictions : âge minimum 18 ans, certificat médical requis pour le Crétacé, 8 voyageurs maximum par groupe.

Si on te pose une question hors sujet, réponds poliment que tu es spécialisée dans les voyages temporels et propose de l'aide sur les destinations.`

async function callClaude(apiMessages) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error(
      'Clé API manquante. Ajoutez VITE_ANTHROPIC_API_KEY dans votre .env.local puis relancez le serveur.'
    )
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      // Required header for direct browser access (demo/dev only — use a backend proxy in production)
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages: apiMessages,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || `Erreur API ${response.status}`)
  }

  const data = await response.json()
  return data.content[0].text
}

const GREETING = {
  role: 'assistant',
  content:
    "Bonjour ! Je suis Maya, votre conseillère en voyages temporels chez TimeTravel Agency. Je suis là pour vous aider à choisir votre destination parmi Paris 1889, le Crétacé ou Florence 1504. Comment puis-je vous accompagner ?",
  synthetic: true,
}

function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const endRef = useRef(null)

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open, loading])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    setInput('')
    setError(null)

    const userMsg = { role: 'user', content: text }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setLoading(true)

    // Build the API history: exclude synthetic greeting, include all real exchanges
    const apiMessages = nextMessages
      .filter((m) => !m.synthetic)
      .map(({ role, content }) => ({ role, content }))

    try {
      const reply = await callClaude(apiMessages)
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setError(err.message)
      // Revert the user message so they can retry
      setMessages((prev) => prev.slice(0, -1))
      setInput(text)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const resetChat = () => {
    setMessages([GREETING])
    setError(null)
    setInput('')
  }

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm"
          >
            <div
              className="bg-neutral-900 border border-[#D4A017]/30 shadow-2xl shadow-black/60 flex flex-col"
              style={{ height: '500px' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#D4A017]/20 bg-black/40 shrink-0">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4A017] animate-pulse" />
                  <div>
                    <p className="text-white text-sm font-semibold tracking-wide">Maya</p>
                    <p className="text-white/40 text-xs tracking-wider">Conseillère TimeTravel</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={resetChat}
                    title="Réinitialiser la conversation"
                    className="text-white/30 hover:text-white/60 transition-colors p-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-white/30 hover:text-white/60 transition-colors p-1.5"
                    aria-label="Fermer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scroll">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-6 h-6 rounded-full bg-[#D4A017]/20 border border-[#D4A017]/40 flex items-center justify-center text-[#D4A017] text-xs font-bold mr-2 mt-0.5 shrink-0">
                        M
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] px-3 py-2.5 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#D4A017]/15 border border-[#D4A017]/35 text-white'
                          : 'bg-white/5 border border-white/10 text-white/80'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#D4A017]/20 border border-[#D4A017]/40 flex items-center justify-center text-[#D4A017] text-xs font-bold mr-2 mt-0.5 shrink-0">
                      M
                    </div>
                    <div className="bg-white/5 border border-white/10 px-4 py-3 flex items-center gap-1.5">
                      {[0, 1, 2].map((j) => (
                        <motion.span
                          key={j}
                          className="w-1.5 h-1.5 bg-[#D4A017] rounded-full"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: j * 0.14 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Error banner */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-xs bg-red-900/20 border border-red-800/30 px-3 py-2 leading-relaxed"
                  >
                    {error}
                  </motion.div>
                )}

                <div ref={endRef} />
              </div>

              {/* Input */}
              <div className="border-t border-[#D4A017]/20 p-3 bg-black/20 shrink-0">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Posez vos questions sur les voyages temporels..."
                    disabled={loading}
                    className="flex-1 bg-white/5 border border-white/10 text-white placeholder-white/25 text-xs px-3 py-2.5 focus:outline-none focus:border-[#D4A017]/50 transition-colors disabled:opacity-50"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="bg-[#D4A017] text-black px-3 py-2.5 hover:bg-[#E8C547] transition-colors disabled:opacity-40 shrink-0"
                    aria-label="Envoyer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat avec Maya"
        className="fixed bottom-5 right-4 md:right-6 z-50 w-14 h-14 bg-[#D4A017] text-black flex items-center justify-center shadow-lg hover:bg-[#E8C547] transition-colors duration-300"
        style={{ borderRadius: '2px' }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        animate={
          open
            ? {}
            : {
                boxShadow: [
                  '0 0 0 0 rgba(212,160,23,0.5)',
                  '0 0 0 14px rgba(212,160,23,0)',
                  '0 0 0 0 rgba(212,160,23,0)',
                ],
              }
        }
        transition={{ duration: 2.2, repeat: open ? 0 : Infinity }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}

export default ChatWidget
