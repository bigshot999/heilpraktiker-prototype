'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBookingModal } from '@/context/BookingModalContext'

const inputCls = 'w-full border border-[#e8e0d6] rounded-xl px-4 py-3 font-sans text-sm bg-white text-earth outline-none focus:border-forest transition-colors'
const labelCls = 'flex flex-col gap-1'
const labelTextCls = 'font-sans text-xs text-muted font-medium'

export default function BookingModal() {
  const { isOpen, close } = useBookingModal()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 800)
  }

  function handleClose() {
    close()
    setTimeout(() => setSubmitted(false), 400)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(44,36,24,0.55)', backdropFilter: 'blur(4px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            className="bg-cream rounded-3xl p-9 w-full max-w-md relative shadow-2xl"
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-5 text-warmgrey hover:text-earth text-lg leading-none cursor-pointer"
              aria-label="Schließen"
            >
              ✕
            </button>

            {!submitted ? (
              <>
                <p className="font-sans text-xs tracking-[2px] uppercase text-sage mb-1">Kostenlose Erstberatung</p>
                <h2 className="font-serif text-2xl italic text-earth mb-1">Lernen wir uns kennen.</h2>
                <p className="font-sans text-sm text-muted mb-6 leading-relaxed">15 Minuten, kostenlos, unverbindlich — ich freue mich auf Sie.</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <label htmlFor="booking-name" className={labelCls}>
                    <span className={labelTextCls}>Name *</span>
                    <input id="booking-name" required type="text" placeholder="Ihr Name" className={inputCls} />
                  </label>
                  <label htmlFor="booking-email" className={labelCls}>
                    <span className={labelTextCls}>E-Mail *</span>
                    <input id="booking-email" required type="email" placeholder="Ihre E-Mail-Adresse" className={inputCls} />
                  </label>
                  <label htmlFor="booking-tel" className={labelCls}>
                    <span className={labelTextCls}>Telefon (optional)</span>
                    <input id="booking-tel" type="tel" placeholder="Ihre Telefonnummer" className={inputCls} />
                  </label>
                  <label htmlFor="booking-anliegen" className={labelCls}>
                    <span className={labelTextCls}>Anliegen *</span>
                    <select id="booking-anliegen" required defaultValue="" className={`${inputCls} appearance-none`}>
                      <option value="" disabled>Bitte wählen…</option>
                      <option>Allgemeines Kennenlernen</option>
                      <option>Phytotherapie</option>
                      <option>Homöopathie</option>
                      <option>Akupunktur</option>
                      <option>Ernährungsberatung</option>
                      <option>Stressmedizin</option>
                    </select>
                  </label>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber text-white rounded-full py-3 font-sans font-semibold text-sm cursor-pointer shadow-[0_4px_14px_rgba(193,123,45,0.3)] disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                    whileHover={loading ? {} : { y: -2 }}
                    whileTap={loading ? {} : { scale: 0.98 }}
                  >
                    {loading ? 'Wird gesendet…' : 'Termin anfragen →'}
                  </motion.button>
                </form>
                <p className="font-sans text-xs text-warmgrey text-center mt-4">
                  Was Sie erwartet: 15 Minuten, kostenlos, kein Verkaufsdruck — einfach ein offenes Gespräch.
                </p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3D6B4F" strokeWidth="2" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl italic text-earth mb-2">Vielen Dank!</h2>
                <p className="font-sans text-sm text-muted leading-relaxed">
                  Ihre Anfrage ist eingegangen. Ich melde mich innerhalb von <strong>24 Stunden</strong> bei Ihnen — per Telefon oder E-Mail, ganz wie es Ihnen lieber ist.
                </p>
                <p className="font-sans text-xs text-warmgrey mt-5">— Anna Berger, Heilpraktikerin</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
