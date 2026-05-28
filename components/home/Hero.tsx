'use client'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import BookingButton from '@/components/ui/BookingButton'
import Link from 'next/link'

const cyclingWords = ['natürlich geheilt.', 'ganzheitlich betreut.', 'neu gedacht.']

function stagger(i: number) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' as const },
  }
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const reduced = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (reduced) return
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % cyclingWords.length)
        setVisible(true)
      }, 420)
    }, 2500)
    return () => clearInterval(interval)
  }, [reduced])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <section className="bg-cream min-h-screen flex items-center relative overflow-hidden pt-16">
      <div
        className="absolute top-0 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(143,175,126,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(193,123,45,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 py-20 w-full grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <div className="flex flex-col gap-6">
          <motion.div {...stagger(0)} className="inline-flex items-center gap-2 bg-forest/10 rounded-full px-4 py-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-forest" />
            <span className="font-sans text-[11px] font-medium tracking-widest uppercase text-forest">Naturheilpraxis München</span>
          </motion.div>

          <motion.div {...stagger(1)}>
            <h1 className="font-serif text-5xl lg:text-6xl italic text-earth leading-[1.15]">
              Ihre Gesundheit,<br />
              <span
                className="text-forest transition-all duration-[400ms]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(-8px)',
                  display: 'inline-block',
                }}
              >
                {cyclingWords[wordIndex]}
              </span>
            </h1>
          </motion.div>

          <motion.p {...stagger(2)} className="font-sans text-base text-muted leading-relaxed max-w-sm">
            Viele meiner Patientinnen und Patienten kommen zu mir, weil sie das Gefühl haben, nicht wirklich gehört zu werden. Das ändert sich hier.
          </motion.p>

          <motion.div {...stagger(3)} className="flex items-center gap-5 flex-wrap">
            <BookingButton />
            <Link href="#leistungen" className="font-sans text-sm font-medium text-forest hover:underline">
              Leistungen entdecken
            </Link>
          </motion.div>

          <motion.div
            {...stagger(4)}
            className={`flex items-center gap-2 transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
          >
            <div
              className="w-px h-7 bg-gradient-to-b from-sage to-transparent"
              style={{ animation: 'scrollLine 1.5s ease-in-out infinite' }}
            />
            <span className="font-sans text-xs text-warmgrey">Weiter entdecken</span>
          </motion.div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full max-w-xs bg-gradient-to-br from-[#c8dfc0] via-[#d4e0cc] to-[#e8d8c0] flex flex-col items-center justify-center aspect-[3/4] rounded-organic overflow-hidden">
            <div className="flex flex-col items-center gap-1 flex-1 justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#a8c8a0] to-[#c8b89a] flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="13" r="7" fill="#3D6B4F44" stroke="#3D6B4F" strokeWidth="1.5"/>
                  <path d="M8 36c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <p className="font-sans font-semibold text-earth mt-3">Anna Berger</p>
              <p className="font-sans text-xs text-forest tracking-wide">Heilpraktikerin</p>
            </div>
            <div className="flex gap-3 pb-5 px-4 w-full justify-center">
              {[
                { label: 'Patienten', value: '150+' },
                { label: 'Erfahrung', value: '12 Jahre' },
              ].map((pill) => (
                <motion.div
                  key={pill.label}
                  className="bg-white rounded-2xl px-4 py-2 shadow-md flex flex-col items-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: pill.label === 'Erfahrung' ? 1.5 : 0 }}
                >
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wide text-sage">{pill.label}</span>
                  <span className="font-sans text-base font-bold text-earth leading-tight">{pill.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  )
}
