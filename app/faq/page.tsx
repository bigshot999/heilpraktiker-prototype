'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqItems } from '@/lib/faq'
import BookingButton from '@/components/ui/BookingButton'

const categories = ['Allgemein', 'Kosten & Versicherung', 'Behandlung', 'Erste Schritte'] as const

export default function FaqPage() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <>
      <section className="bg-cream pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-sans text-xs tracking-[3px] uppercase text-sage mb-3">Häufige Fragen</p>
          <h1 className="font-serif text-5xl italic text-earth">Ihre Fragen, beantwortet.</h1>
        </div>
      </section>
      <section className="bg-linen py-16">
        <div className="max-w-3xl mx-auto px-6 flex flex-col gap-12">
          {categories.map((cat) => (
            <div key={cat}>
              <h2 className="font-sans text-xs tracking-[3px] uppercase text-sage mb-4">{cat}</h2>
              <div className="flex flex-col gap-3">
                {faqItems.filter((f) => f.category === cat).map((item, i) => {
                  const id = `${cat}-${i}`
                  return (
                    <div key={id} className="bg-white border border-[#e8e0d6] rounded-2xl overflow-hidden">
                      <button
                        className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
                        onClick={() => setOpen(open === id ? null : id)}
                        aria-expanded={open === id}
                      >
                        <span className="font-sans font-semibold text-sm text-earth">{item.question}</span>
                        <span className={`text-forest transition-transform duration-300 text-lg leading-none shrink-0 ml-4 ${open === id ? 'rotate-45' : ''}`}>+</span>
                      </button>
                      <AnimatePresence>
                        {open === id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="px-6 pb-5 font-sans text-sm text-muted leading-relaxed">{item.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-forest py-16">
        <div className="max-w-xl mx-auto px-6 text-center flex flex-col items-center gap-5">
          <h2 className="font-serif text-3xl italic text-cream">Noch Fragen? Reden wir.</h2>
          <BookingButton />
        </div>
      </section>
    </>
  )
}
