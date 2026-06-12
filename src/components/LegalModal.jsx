import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Section helper ─── */
function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="font-cinzel text-[#D4A017] text-sm tracking-[0.25em] uppercase mb-3">
        {title}
      </h3>
      <div className="text-white/55 text-sm leading-relaxed space-y-2">{children}</div>
    </div>
  )
}

/* ─── MENTIONS LÉGALES ─── */
function MentionsLegales() {
  return (
    <div>
      <Section title="Éditeur du site">
        <p>
          Le présent site est édité par <strong className="text-white/80">TimeTravel Agency SAS</strong>, société par actions simplifiée au capital de 10 000 000 €, immatriculée au Registre Chronologique du Commerce sous le numéro <strong className="text-white/80">TTA-2031-PARIS-001</strong>.
        </p>
        <p>Siège social : 42, Avenue de la Chronologie — 75008 Paris (Secteur Temporel Nord)</p>
        <p>SIRET : 831 267 954 00012 — Code APE : 7911Z (Activités des agences de voyages temporels)</p>
        <p>Numéro TVA intracommunautaire : FR 12 831267954</p>
      </Section>

      <Section title="Responsable de publication">
        <p>
          Directeur de la publication : <strong className="text-white/80">Dr. Éléonore Voss</strong>, Présidente-Directrice Générale de TimeTravel Agency SAS.
        </p>
        <p>Contact : direction@timetravel-agency.fr</p>
      </Section>

      <Section title="Hébergement">
        <p>
          Ce site est hébergé par <strong className="text-white/80">GitHub Pages</strong> (GitHub, Inc.), 88 Colin P Kelly Jr St, San Francisco, CA 94107, États-Unis.
        </p>
        <p>
          Le code source est disponible publiquement à titre pédagogique sur{' '}
          <span className="text-[#D4A017]">github.com/MaxGlt/timetravel-agency</span>.
        </p>
      </Section>

      <Section title="Propriété intellectuelle">
        <p>
          L'ensemble des contenus présents sur ce site (textes, images, vidéos, sons, animations) est la propriété exclusive de TimeTravel Agency SAS ou de ses partenaires, et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
        </p>
        <p>
          Les assets visuels et sonores ont été générés à l'aide d'outils IA (Runway, Suno) dans le cadre du projet pédagogique M1/M2 Digital & IA — Ynov Campus Paris 2025/2026. Toute reproduction ou diffusion sans autorisation préalable est interdite.
        </p>
      </Section>

      <Section title="Protection des données personnelles (RGPD)">
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi Informatique et Libertés, TimeTravel Agency collecte uniquement les données strictement nécessaires à la gestion de vos demandes de voyage.
        </p>
        <p>
          Les données collectées via le formulaire de réservation (nom, prénom, adresse e-mail, téléphone) sont traitées pour la seule finalité de vous contacter au sujet de votre demande. Elles ne sont ni vendues, ni cédées à des tiers.
        </p>
        <p>
          Vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données. Pour l'exercer, écrivez à : <span className="text-[#D4A017]">rgpd@timetravel-agency.fr</span>
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          Ce site n'utilise pas de cookies tiers à des fins publicitaires ou de traçage. Les seuls cookies déposés sont fonctionnels et nécessaires au bon fonctionnement de l'interface.
        </p>
      </Section>

      <Section title="Limitation de responsabilité">
        <p>
          TimeTravel Agency SAS s'efforce d'assurer l'exactitude des informations diffusées sur ce site, mais ne saurait être tenue responsable des erreurs ou omissions, ni des éventuels dommages résultant de l'utilisation des informations présentées.
        </p>
        <p className="text-white/30 text-xs italic">
          Note : TimeTravel Agency est un projet fictif réalisé dans un cadre pédagogique. Les voyages temporels présentés n'existent pas (encore).
        </p>
      </Section>
    </div>
  )
}

/* ─── POLITIQUE TEMPORELLE ─── */
function PolitiqueTemporelle() {
  return (
    <div>
      <p className="text-white/40 text-xs italic mb-8 border-l-2 border-[#D4A017]/40 pl-4">
        Document de référence — Édition 2031 — Approuvé par le Conseil International de Chronologie (CIC) — Certification ISO-Temporal 42001:2031
      </p>

      <Section title="Article 1 — Objet et champ d'application">
        <p>
          Les présentes Conditions Générales de Voyage Temporel (CGVT) régissent l'ensemble des séjours proposés par TimeTravel Agency SAS (ci-après « l'Agence ») à destination de périodes historiques antérieures à l'année de réservation.
        </p>
        <p>
          Tout voyageur qui procède à une réservation reconnaît avoir pris connaissance des présentes CGVT et les accepter sans réserve. L'Agence se réserve le droit de les modifier à tout moment, sous réserve d'en informer le client par voie électronique au moins 30 jours avant son départ.
        </p>
      </Section>

      <Section title="Article 2 — Principe de non-interférence temporelle">
        <p>
          Conformément au Traité de Genève Chronologique (2029), tout voyageur s'engage formellement à respecter le <strong className="text-white/80">Protocole d'Observation Pure</strong> : il est strictement interdit d'interagir avec les habitants de l'époque de manière à modifier le cours documenté de l'Histoire.
        </p>
        <p>
          Sont notamment prohibés : transmettre des technologies anachroniques, divulguer des événements futurs, modifier des événements historiques documentés, ou entretenir des relations susceptibles de générer une descendance non recensée.
        </p>
        <p>
          Toute violation de ce protocole engage la responsabilité exclusive du voyageur et peut entraîner l'activation du Protocole de Rappel d'Urgence (PRU), facturable au tarif de <strong className="text-white/80">450 000 € TTC</strong> par déclenchement.
        </p>
      </Section>

      <Section title="Article 3 — Paradoxes temporels et clause de causalité">
        <p>
          L'Agence ne saurait être tenue responsable des paradoxes temporels résultant d'actions non conformes aux présentes CGVT. En application du principe de <em className="text-white/70">Causalité Protégée</em>, tout événement observable depuis le présent est réputé inaltérable.
        </p>
        <p>
          Dans le cas exceptionnel d'une modification avérée de la chronologie documentée, l'Agence activera son Unité de Restauration Temporelle (URT) dans un délai maximal de 72 heures subjectives. Les frais de restauration sont couverts par l'Assurance Temporelle All-Risks (option disponible à la réservation).
        </p>
      </Section>

      <Section title="Article 4 — Conditions sanitaires et médicales">
        <p>
          <strong className="text-white/80">Destination Crétacé –65M :</strong> Un certificat médical datant de moins de 3 mois est obligatoire. Le vaccin ChronoImmun® contre les agents pathogènes préhistoriques est obligatoire et administré lors du briefing pré-départ. Âge minimum : 18 ans. Femmes enceintes et personnes souffrant de cardiopathies : accès interdit.
        </p>
        <p>
          <strong className="text-white/80">Destinations Paris 1889 et Florence 1504 :</strong> Aucune restriction médicale spécifique, hormis les contre-indications générales à la chronotransposition (claustrophobie sévère, épilepsie photosensible). Âge minimum : 18 ans.
        </p>
      </Section>

      <Section title="Article 5 — Tarifs, paiement et annulation">
        <p>
          Les prix indiqués s'entendent par personne, en chambre individuelle, toutes taxes comprises, hors options supplémentaires. Ils incluent : la chronotransposition aller-retour, l'hébergement temporel, la restauration d'époque (3 repas/jour), l'équipement de protection et l'encadrement par un guide chrono-historien.
        </p>
        <p>
          <strong className="text-white/80">Conditions d'annulation :</strong> Plus de 90 jours avant le départ — remboursement intégral. Entre 90 et 30 jours — retenue de 40 %. Moins de 30 jours — retenue de 80 %. Moins de 7 jours — aucun remboursement. L'Assurance Temporelle All-Risks couvre les annulations pour cause de force majeure.
        </p>
      </Section>

      <Section title="Article 6 — Responsabilité de l'Agence">
        <p>
          L'Agence est responsable du bon déroulement du voyage conformément aux prestations décrites au contrat. Elle ne peut être tenue responsable des événements imprévus inhérents à l'exploration de périodes historiques (intempéries d'époque, conflits locaux, faune sauvage pour le Crétacé), couverts par l'Assurance Temporelle.
        </p>
        <p>
          La responsabilité de l'Agence est limitée au double du prix du séjour, sauf en cas de dommage corporel grave résultant d'une faute prouvée de l'Agence.
        </p>
      </Section>

      <Section title="Article 7 — Confidentialité chronologique">
        <p>
          Le voyageur s'engage à ne pas divulguer publiquement, sous quelque forme que ce soit, les coordonnées exactes de chronotransposition, les codes d'accès aux pods d'observation ou les protocoles techniques de l'Agence. Toute violation de cette clause est passible de poursuites judiciaires.
        </p>
      </Section>

      <Section title="Article 8 — Droit applicable et juridiction">
        <p>
          Les présentes CGVT sont soumises au droit français, complété par les dispositions du Traité de Genève Chronologique (2029) et des Directives du Conseil International de Chronologie. Tout litige relève de la compétence exclusive du Tribunal Judiciaire Spécialisé Chronologique de Paris.
        </p>
      </Section>
    </div>
  )
}

/* ─── CONTACT ─── */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Requis'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email invalide'
    if (!form.subject) e.subject = 'Requis'
    if (!form.message.trim()) e.message = 'Requis'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSending(true)
    await new Promise((r) => setTimeout(r, 1400))
    setSending(false)
    setSent(true)
  }

  const inputClass = (field) =>
    `w-full bg-white/5 border text-white placeholder-white/20 text-sm px-4 py-2.5 focus:outline-none focus:border-[#D4A017]/50 transition-colors ${
      errors[field] ? 'border-red-500/50' : 'border-white/10'
    }`

  return (
    <div>
      {/* Infos de contact */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          {
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ),
            title: 'Adresse',
            lines: ['42, Avenue de la Chronologie', '75008 Paris', 'Secteur Temporel Nord'],
          },
          {
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            ),
            title: 'Email',
            lines: ['contact@timetravel-agency.fr', 'reservations@timetravel-agency.fr'],
          },
          {
            icon: (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            ),
            title: 'Téléphone',
            lines: ['+33 1 42 00 20 31', 'Lun–Ven · 9h–18h'],
          },
        ].map((item, i) => (
          <div key={i} className="border border-white/10 p-5">
            <span className="text-[#D4A017] mb-3 block">{item.icon}</span>
            <p className="text-white/60 text-xs tracking-[0.2em] uppercase mb-2">{item.title}</p>
            {item.lines.map((l, j) => (
              <p key={j} className="text-white/80 text-sm">
                {l}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* Formulaire */}
      <div className="border border-white/10 p-6">
        <p className="font-cinzel text-white text-xs tracking-[0.25em] uppercase mb-6">
          Envoyer un message
        </p>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="w-12 h-12 border-2 border-[#D4A017] flex items-center justify-center mx-auto mb-4"
              >
                <svg className="w-6 h-6 text-[#D4A017]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <p className="text-[#D4A017] text-xs tracking-[0.3em] uppercase mb-2">Message envoyé</p>
              <p className="text-white/50 text-sm">
                Notre équipe vous répondra sous 24h ouvrées.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/35 text-xs tracking-wider block mb-1.5">Nom complet</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="Jean Dupont"
                    className={inputClass('name')}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-white/35 text-xs tracking-wider block mb-1.5">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    placeholder="jean@exemple.com"
                    className={inputClass('email')}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="text-white/35 text-xs tracking-wider block mb-1.5">Sujet</label>
                <select
                  value={form.subject}
                  onChange={(e) => set('subject', e.target.value)}
                  className={`w-full bg-neutral-900 border text-sm px-4 py-2.5 focus:outline-none focus:border-[#D4A017]/50 transition-colors cursor-pointer ${
                    errors.subject ? 'border-red-500/50 text-white' : 'border-white/10 text-white'
                  }`}
                >
                  <option value="" className="bg-neutral-900">Sélectionner un sujet</option>
                  <option value="info" className="bg-neutral-900">Renseignements sur une destination</option>
                  <option value="booking" className="bg-neutral-900">Question sur une réservation</option>
                  <option value="partner" className="bg-neutral-900">Partenariat & presse</option>
                  <option value="rgpd" className="bg-neutral-900">Demande RGPD</option>
                  <option value="other" className="bg-neutral-900">Autre</option>
                </select>
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="text-white/35 text-xs tracking-wider block mb-1.5">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  placeholder="Votre message…"
                  rows={5}
                  className={`${inputClass('message')} resize-none`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                className="w-full btn-gold py-3"
                whileTap={{ scale: 0.99 }}
              >
                {sending ? (
                  <span className="flex items-center justify-center gap-3">
                    <motion.span
                      className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full inline-block"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
                    />
                    Envoi en cours…
                  </span>
                ) : (
                  'Envoyer le message'
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─── Modal configs ─── */
const MODALS = {
  mentions: {
    title: 'Mentions légales',
    subtitle: 'Informations légales & RGPD',
    Component: MentionsLegales,
  },
  politique: {
    title: 'Politique temporelle',
    subtitle: 'Conditions Générales de Voyage Temporel — Édition 2031',
    Component: PolitiqueTemporelle,
  },
  contact: {
    title: 'Contact',
    subtitle: 'Notre équipe vous répond sous 24h',
    Component: Contact,
  },
}

/* ─── LegalModal ─── */
function LegalModal({ modalId, onClose }) {
  const config = MODALS[modalId]

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!config) return null
  const { title, subtitle, Component } = config

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        key="panel"
        className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-[5vh] bottom-[5vh] md:w-full md:max-w-2xl z-[101] flex flex-col"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="bg-neutral-950 border border-[#D4A017]/30 flex flex-col h-full shadow-2xl shadow-black">
          {/* Header */}
          <div className="flex items-start justify-between px-6 py-5 border-b border-[#D4A017]/20 shrink-0">
            <div>
              <p className="text-[#D4A017] text-xs tracking-[0.35em] uppercase mb-1">{subtitle}</p>
              <h2 className="font-cinzel text-xl text-white tracking-wide">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/30 hover:text-white/70 transition-colors p-1 mt-0.5 shrink-0"
              aria-label="Fermer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 chat-scroll">
            <Component />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-white/5 shrink-0 flex items-center justify-between">
            <span className="font-cinzel text-[#D4A017]/50 text-xs tracking-wider">
              TIMETRAVEL AGENCY
            </span>
            <button
              onClick={onClose}
              className="btn-outline-gold px-5 py-2 text-xs"
            >
              Fermer
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LegalModal
