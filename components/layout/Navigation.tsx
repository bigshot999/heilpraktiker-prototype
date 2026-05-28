'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useBookingModal } from '@/context/BookingModalContext'
import { treatments } from '@/lib/treatments'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { open } = useBookingModal()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cream shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-tight">
            <span className="font-serif text-xl italic text-earth">Anna Berger</span>
            <span className="font-sans text-[10px] tracking-widest uppercase text-sage">Heilpraktikerin</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/ueber-mich" className="font-sans text-sm text-muted hover:text-earth transition-colors">Über mich</Link>

            <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
              <button className="font-sans text-sm text-muted hover:text-earth transition-colors cursor-pointer">Leistungen ▾</button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 mt-2 bg-cream border border-[#e8e0d6] rounded-2xl shadow-lg py-2 w-52"
                  >
                    {treatments.map((t) => (
                      <Link
                        key={t.slug}
                        href={`/leistungen/${t.slug}`}
                        className="block px-4 py-2 font-sans text-sm text-muted hover:text-earth hover:bg-linen transition-colors"
                      >
                        {t.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/faq" className="font-sans text-sm text-muted hover:text-earth transition-colors">FAQ</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+4989123456789" className="font-sans text-sm text-forest font-medium">+49 89 123 456 789</a>
            <motion.button
              onClick={open}
              className="bg-amber text-white rounded-full px-5 py-2 font-sans text-sm font-semibold cursor-pointer shadow-[0_4px_14px_rgba(193,123,45,0.3)]"
              whileHover={{ y: -1 }}
            >
              Termin buchen
            </motion.button>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
            onClick={() => setMenuOpen(true)}
            aria-label="Menü öffnen"
          >
            <span className="w-6 h-0.5 bg-earth block" />
            <span className="w-6 h-0.5 bg-earth block" />
            <span className="w-6 h-0.5 bg-earth block" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-cream flex flex-col p-8"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <button
              className="self-end text-muted text-2xl mb-8 cursor-pointer"
              onClick={() => setMenuOpen(false)}
              aria-label="Menü schließen"
            >
              ✕
            </button>
            <div className="flex flex-col gap-6">
              <Link href="/ueber-mich" className="font-serif text-2xl italic text-earth" onClick={() => setMenuOpen(false)}>Über mich</Link>
              {treatments.map((t) => (
                <Link key={t.slug} href={`/leistungen/${t.slug}`} className="font-serif text-xl italic text-muted" onClick={() => setMenuOpen(false)}>
                  {t.name}
                </Link>
              ))}
              <Link href="/faq" className="font-serif text-2xl italic text-earth" onClick={() => setMenuOpen(false)}>FAQ</Link>
              <button
                onClick={() => { open(); setMenuOpen(false) }}
                className="mt-4 bg-amber text-white rounded-full px-7 py-3 font-sans font-semibold cursor-pointer"
              >
                Kostenlos kennenlernen →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
