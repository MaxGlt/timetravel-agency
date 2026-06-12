import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EXTRAS = [
  { id: 'guide', label: 'Guide chrono-historien privé', price: '+8 000 €' },
  { id: 'insurance', label: 'Assurance temporelle tous-risques', price: '+3 500 €' },
  { id: 'vip', label: 'Pack VIP — Hébergement prestige', price: '+15 000 €' },
  { id: 'photo', label: 'Pack photo holochronique', price: '+2 000 €' },
]

const DURATIONS = [5, 7, 10, 14, 21]

function BookingForm({ destinations, preSelected, onDestinationChange }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    destination: preSelected || '',
    departureDate: '',
    duration: '7',
    travelers: '1',
    extras: [],
    requests: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [bookingRef, setBookingRef] = useState('')

  useEffect(() => {
    if (preSelected) set('destination', preSelected)
  }, [preSelected])

  const set = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (field === 'destination') onDestinationChange?.(value)
    setErrors((e) => ({ ...e, [field]: '' }))
  }

  const toggleExtra = (id) => {
    setForm((f) => ({
      ...f,
      extras: f.extras.includes(id) ? f.extras.filter((e) => e !== id) : [...f.extras, id],
    }))
  }

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Requis'
    if (!form.lastName.trim()) e.lastName = 'Requis'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email invalide'
    if (!form.destination) e.destination = 'Veuillez choisir une destination'
    if (!form.departureDate) e.departureDate = 'Requis'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1800))
    const ref = `TTA-${Math.random().toString(36).slice(2, 8).toUpperCase()}-2031`
    setBookingRef(ref)
    setSubmitting(false)
    setSubmitted(true)
  }

  const resetForm = () => {
    setForm({
      firstName: '', lastName: '', email: '', phone: '',
      destination: '', departureDate: '', duration: '7',
      travelers: '1', extras: [], requests: '',
    })
    setErrors({})
    setSubmitted(false)
    setBookingRef('')
  }

  const today = new Date()
  const minDate = new Date(today.setDate(today.getDate() + 30)).toISOString().split('T')[0]
  const maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 2)).toISOString().split('T')[0]

  const inputClass = (field) =>
    `w-full bg-white/5 border text-white placeholder-white/20 text-sm px-4 py-3 focus:outline-none focus:border-[#D4A017]/50 transition-colors ${
      errors[field] ? 'border-red-500/50' : 'border-white/10'
    }`

  const selectClass = `w-full bg-neutral-900 border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#D4A017]/50 transition-colors cursor-pointer`

  return (
    <div className="max-w-3xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-[#D4A017] text-xs tracking-[0.45em] uppercase mb-4">Votre voyage</p>
        <h2 className="font-cinzel text-4xl md:text-5xl text-white mb-4">Réservation</h2>
        <p className="text-white/45 text-sm max-w-lg mx-auto leading-relaxed">
          Complétez votre dossier de voyage temporel. Notre équipe vous contactera sous 48h pour
          finaliser votre expérience sur mesure.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* ── Success state ── */}
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center border border-[#D4A017]/40 p-14"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 border-2 border-[#D4A017] flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-8 h-8 text-[#D4A017]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <p className="text-[#D4A017] text-xs tracking-[0.4em] uppercase mb-3">Demande confirmée</p>
            <h3 className="font-cinzel text-2xl text-white mb-3">Votre voyage est réservé</h3>
            <p className="text-white/45 text-sm mb-2">Référence de réservation</p>
            <p className="font-cinzel text-[#D4A017] text-xl font-bold mb-6">{bookingRef}</p>
            <p className="text-white/35 text-xs mb-10 leading-relaxed max-w-sm mx-auto">
              Notre équipe de consultants temporels vous contactera dans les 48h. Préparez votre pièce
              d'identité et, pour le Crétacé, votre certificat médical.
            </p>
            <button onClick={resetForm} className="btn-outline-gold text-xs">
              Nouvelle réservation
            </button>
          </motion.div>
        ) : (
          /* ── Form ── */
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Personal info */}
            <fieldset className="border border-white/10 p-6">
              <legend className="font-cinzel text-white text-xs tracking-[0.25em] uppercase px-2 -ml-2 mb-4">
                Informations personnelles
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { field: 'firstName', label: 'Prénom', type: 'text', placeholder: 'Jean' },
                  { field: 'lastName', label: 'Nom', type: 'text', placeholder: 'Dupont' },
                  { field: 'email', label: 'Email', type: 'email', placeholder: 'jean@exemple.com' },
                  { field: 'phone', label: 'Téléphone', type: 'tel', placeholder: '+33 6 12 34 56 78' },
                ].map(({ field, label, type, placeholder }) => (
                  <div key={field}>
                    <label className="text-white/35 text-xs tracking-wider block mb-1.5">
                      {label}
                    </label>
                    <input
                      type={type}
                      value={form[field]}
                      onChange={(e) => set(field, e.target.value)}
                      placeholder={placeholder}
                      className={inputClass(field)}
                    />
                    {errors[field] && (
                      <p className="text-red-400 text-xs mt-1">{errors[field]}</p>
                    )}
                  </div>
                ))}
              </div>
            </fieldset>

            {/* Trip details */}
            <fieldset className="border border-white/10 p-6">
              <legend className="font-cinzel text-white text-xs tracking-[0.25em] uppercase px-2 -ml-2 mb-4">
                Détails du voyage
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Destination — full width */}
                <div className="md:col-span-2">
                  <label className="text-white/35 text-xs tracking-wider block mb-1.5">
                    Destination
                  </label>
                  <select
                    value={form.destination}
                    onChange={(e) => set('destination', e.target.value)}
                    className={`${selectClass} ${errors.destination ? 'border-red-500/50' : ''}`}
                  >
                    <option value="" className="text-white/40 bg-neutral-900">
                      Choisir une destination
                    </option>
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id} className="text-white bg-neutral-900">
                        {d.name} — {d.era} ({d.price})
                      </option>
                    ))}
                  </select>
                  {errors.destination && (
                    <p className="text-red-400 text-xs mt-1">{errors.destination}</p>
                  )}
                </div>

                {/* Departure date */}
                <div>
                  <label className="text-white/35 text-xs tracking-wider block mb-1.5">
                    Date de départ
                  </label>
                  <input
                    type="date"
                    value={form.departureDate}
                    onChange={(e) => set('departureDate', e.target.value)}
                    min={minDate}
                    max={maxDate}
                    className={inputClass('departureDate')}
                  />
                  {errors.departureDate && (
                    <p className="text-red-400 text-xs mt-1">{errors.departureDate}</p>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <label className="text-white/35 text-xs tracking-wider block mb-1.5">Durée</label>
                  <select
                    value={form.duration}
                    onChange={(e) => set('duration', e.target.value)}
                    className={selectClass}
                  >
                    {DURATIONS.map((d) => (
                      <option key={d} value={String(d)} className="text-white bg-neutral-900">
                        {d} nuits
                      </option>
                    ))}
                  </select>
                </div>

                {/* Travelers */}
                <div>
                  <label className="text-white/35 text-xs tracking-wider block mb-1.5">
                    Voyageurs
                  </label>
                  <select
                    value={form.travelers}
                    onChange={(e) => set('travelers', e.target.value)}
                    className={selectClass}
                  >
                    {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={String(n)} className="text-white bg-neutral-900">
                        {n} voyageur{n > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>

            {/* Extras */}
            <fieldset className="border border-white/10 p-6">
              <legend className="font-cinzel text-white text-xs tracking-[0.25em] uppercase px-2 -ml-2 mb-4">
                Options supplémentaires
              </legend>
              <div className="space-y-3">
                {EXTRAS.map((extra) => {
                  const checked = form.extras.includes(extra.id)
                  return (
                    <label
                      key={extra.id}
                      className={`flex items-center justify-between p-4 border cursor-pointer transition-all duration-300 ${
                        checked
                          ? 'border-[#D4A017]/55 bg-[#D4A017]/5'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 border flex items-center justify-center transition-all shrink-0 ${
                            checked ? 'border-[#D4A017] bg-[#D4A017]' : 'border-white/30'
                          }`}
                        >
                          {checked && (
                            <svg className="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-white/75 text-sm">{extra.label}</span>
                      </div>
                      <span className="text-[#D4A017] text-xs font-medium ml-4 shrink-0">
                        {extra.price}
                      </span>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => toggleExtra(extra.id)}
                      />
                    </label>
                  )
                })}
              </div>
            </fieldset>

            {/* Special requests */}
            <fieldset className="border border-white/10 p-6">
              <legend className="font-cinzel text-white text-xs tracking-[0.25em] uppercase px-2 -ml-2 mb-4">
                Demandes spéciales
              </legend>
              <textarea
                value={form.requests}
                onChange={(e) => set('requests', e.target.value)}
                placeholder="Régimes alimentaires, besoins spéciaux, demandes particulières pour votre expérience temporelle…"
                rows={4}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm px-4 py-3 focus:outline-none focus:border-[#D4A017]/50 transition-colors resize-none"
              />
            </fieldset>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={submitting}
              className="w-full btn-gold py-4"
              whileTap={{ scale: 0.99 }}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-3">
                  <motion.span
                    className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full inline-block"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
                  />
                  Traitement en cours…
                </span>
              ) : (
                'Confirmer la réservation'
              )}
            </motion.button>

            <p className="text-white/20 text-xs text-center leading-relaxed">
              En soumettant ce formulaire, vous acceptez nos conditions générales de voyage temporel.
              Aucun paiement ne sera débité à ce stade.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BookingForm
