'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '@/lib/testimonials'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function TestimonialsSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 4000)
    return () => clearInterval(timer)
  }, [paused])

  const t = testimonials[index]

  return (
    <section className="bg-linen py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection className="mb-12">
          <p className="font-sans text-xs tracking-[3px] uppercase text-sage mb-3">Das sagen meine Patienten</p>
          <h2 className="font-serif text-4xl italic text-earth">Echte Erfahrungen</h2>
        </AnimatedSection>

        <div
          className="min-h-[160px] flex items-center justify-center mb-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="text-amber text-xl tracking-widest">★★★★★</div>
              <blockquote className="font-serif text-2xl italic text-earth leading-relaxed max-w-2xl">
                "{t.quote}"
              </blockquote>
              <p className="font-sans text-sm text-muted">— {t.name}, {t.age} Jahre</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center gap-1">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Testimonial ${i + 1}`}
              className="p-3 cursor-pointer"
            >
              <span className={`block h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-forest w-6' : 'bg-sage/40 w-2'}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
