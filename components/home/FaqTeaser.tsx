'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqItems } from '@/lib/faq'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Link from 'next/link'

export default function FaqTeaser() {
  const [open, setOpen] = useState<number | null>(null)
  const preview = faqItems.slice(0, 3)

  return (
    <section className="bg-cream py-20">
      <div className="max-w-3xl mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <p className="font-sans text-xs tracking-[3px] uppercase text-sage mb-3">Häufige Fragen</p>
          <h2 className="font-serif text-4xl italic text-earth">Was Sie vielleicht fragen</h2>
        </AnimatedSection>
        <div className="flex flex-col gap-3 mb-8">
          {preview.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="bg-white border border-[#e8e0d6] rounded-2xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="font-sans font-semibold text-sm text-earth">{item.question}</span>
                  <span className={`text-forest transition-transform duration-300 text-lg leading-none shrink-0 ml-4 ${open === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <AnimatePresence>
                  {open === i && (
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
            </AnimatedSection>
          ))}
        </div>
        <div className="text-center">
          <Link href="/faq" className="font-sans text-sm font-semibold text-forest hover:underline">Alle Fragen ansehen →</Link>
        </div>
      </div>
    </section>
  )
}
