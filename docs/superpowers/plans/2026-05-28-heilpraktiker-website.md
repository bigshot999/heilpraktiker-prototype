# Heilpraktiker Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete Next.js prototype website for a fictional German Heilpraktikerin, conversion-optimised with a booking modal, 10 pages, and a distinctive "Organic Warmth" design system.

**Architecture:** Next.js 14 App Router, shared layout with sticky nav + footer + global booking modal context. All content in typed data files. Framer Motion for all animations.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, next/font (Cormorant Garamond + Raleway)

---

## File Map

```
app/
  layout.tsx                  # Root layout: fonts, nav, footer, modal provider
  globals.css                 # CSS variables, base styles
  page.tsx                    # Landing page — assembles all home sections
  ueber-mich/page.tsx
  leistungen/[slug]/page.tsx
  faq/page.tsx
  impressum/page.tsx
  datenschutz/page.tsx

components/
  layout/Navigation.tsx       # Sticky nav, transparent→solid, dropdown, mobile
  layout/Footer.tsx           # 3-column footer
  booking/BookingModal.tsx    # Form + success state, spring animation
  ui/AnimatedSection.tsx      # Scroll-triggered fade-up wrapper (whileInView)
  ui/CountUp.tsx              # Count-up number animation on scroll
  ui/BookingButton.tsx        # Amber CTA button that opens modal
  home/Hero.tsx               # Split hero, cycling headline, trust pills
  home/TrustBar.tsx           # 4 stat counters
  home/PainPoints.tsx         # "Kennen Sie das?" 3 cards
  home/AboutTeaser.tsx        # Split photo + text
  home/TreatmentsGrid.tsx     # 5-column cards with SVG icons
  home/HowItWorks.tsx         # 3-step flow + Erstgespräch explainer callout
  home/TestimonialsSlider.tsx # Auto-advancing slider with dots
  home/FaqTeaser.tsx          # 3-question accordion teaser
  home/BookingCtaSection.tsx  # Dark green final CTA
  treatments/TreatmentPageTemplate.tsx  # Shared template for all 5 treatment pages

context/
  BookingModalContext.tsx     # isOpen, open(), close() — wraps entire app

lib/
  treatments.ts               # All treatment data: slug, name, icon, description, benefit, content
  testimonials.ts             # 5 testimonials
  faq.ts                      # 10 FAQ items with categories
```

---

## Task 1: Project Setup

**Files:** `package.json`, `tailwind.config.ts`, `tsconfig.json` (generated)

- [ ] In the project directory, initialise Next.js (say **Yes** when asked about non-empty directory):
```bash
cd /Users/eduardrenner/synovo-projects/heilpraktiker-prototype
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```
Expected: Next.js scaffold created, `node_modules` installed.

- [ ] Install Framer Motion:
```bash
npm install framer-motion
```

- [ ] Verify dev server starts:
```bash
npm run dev
```
Expected: `http://localhost:3000` shows default Next.js page. Stop with Ctrl+C.

- [ ] Commit:
```bash
git init
git add .
git commit -m "chore: initialise Next.js project with Tailwind and Framer Motion"
```

---

## Task 2: Tailwind Design Tokens

**Files:** `tailwind.config.ts`

- [ ] Replace the contents of `tailwind.config.ts`:
```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest:  '#3D6B4F',
        sage:    '#8FAF7E',
        amber:   '#C17B2D',
        cream:   '#FAF7F2',
        linen:   '#F0EAE0',
        earth:   '#2C2418',
        muted:   '#7a6e64',
        warmgrey:'#9e8e7e',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:  ['var(--font-raleway)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        organic: '32px 32px 32px 8px',
        'organic-alt': '8px 32px 32px 32px',
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] Commit:
```bash
git add tailwind.config.ts
git commit -m "chore: add design tokens to Tailwind config"
```

---

## Task 3: Fonts, Global CSS & Root Layout

**Files:** `app/globals.css`, `app/layout.tsx`

- [ ] Replace `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-cormorant: 'Cormorant Garamond', serif;
  --font-raleway: 'Raleway', sans-serif;
}

html { scroll-behavior: smooth; }

body {
  background-color: #FAF7F2;
  color: #2C2418;
  font-family: var(--font-raleway);
  -webkit-font-smoothing: antialiased;
}

*:focus-visible {
  outline: 2px solid #3D6B4F;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] Replace `app/layout.tsx`:
```tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, Raleway } from 'next/font/google'
import './globals.css'
import { BookingModalProvider } from '@/context/BookingModalContext'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import BookingModal from '@/components/booking/BookingModal'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-raleway',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Anna Berger — Heilpraktikerin München',
  description: 'Naturheilkunde & Ganzheitsmedizin in München. Kostenlose Erstberatung.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${cormorant.variable} ${raleway.variable}`}>
      <body>
        <BookingModalProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <BookingModal />
        </BookingModalProvider>
      </body>
    </html>
  )
}
```

- [ ] Commit:
```bash
git add app/globals.css app/layout.tsx
git commit -m "chore: configure fonts, global styles and root layout"
```

---

## Task 4: Booking Modal Context

**Files:** `context/BookingModalContext.tsx`

- [ ] Create `context/BookingModalContext.tsx`:
```tsx
'use client'
import { createContext, useContext, useState } from 'react'

type BookingModalContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const BookingModalContext = createContext<BookingModalContextType | null>(null)

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <BookingModalContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </BookingModalContext.Provider>
  )
}

export function useBookingModal() {
  const ctx = useContext(BookingModalContext)
  if (!ctx) throw new Error('useBookingModal must be used inside BookingModalProvider')
  return ctx
}
```

- [ ] Commit:
```bash
git add context/
git commit -m "feat: add booking modal context"
```

---

## Task 5: Content Data Layer

**Files:** `lib/treatments.ts`, `lib/testimonials.ts`, `lib/faq.ts`

- [ ] Create `lib/treatments.ts`:
```ts
export type Treatment = {
  slug: string
  name: string
  shortDescription: string
  benefit: string
  gradientFrom: string
  gradientTo: string
  description: string[]
  indications: string[]
  sessionSteps: string[]
}

export const treatments: Treatment[] = [
  {
    slug: 'phytotherapie',
    name: 'Phytotherapie',
    shortDescription: 'Heilkräuter & pflanzliche Extrakte',
    benefit: 'Sanft & nebenwirkungsfrei',
    gradientFrom: '#e8f0e4',
    gradientTo: '#d4e8d0',
    description: [
      'Die Phytotherapie nutzt die Heilkraft der Pflanzen, um den Körper sanft zu unterstützen und zu regulieren.',
      'Im Gegensatz zu synthetischen Medikamenten wirken pflanzliche Präparate ganzheitlich und haben in der Regel deutlich weniger Nebenwirkungen.',
      'Ich stelle für Sie ein individuelles Kräuterprogramm zusammen — abgestimmt auf Ihre Beschwerden, Ihre Konstitution und Ihren Alltag.',
    ],
    indications: ['Chronische Erschöpfung', 'Schlafstörungen', 'Verdauungsbeschwerden', 'Immunschwäche', 'Nervosität & Stress'],
    sessionSteps: ['Ausführliches Erstgespräch zu Ihren Beschwerden', 'Analyse Ihrer Konstitution und Lebensweise', 'Zusammenstellung Ihres individuellen Kräuterplans', 'Besprechung der Einnahme und Dosierung', 'Folgetermin zur Anpassung nach 4 Wochen'],
  },
  {
    slug: 'homoeopathie',
    name: 'Homöopathie',
    shortDescription: 'Sanfte Regulationsmedizin',
    benefit: 'Aktiviert Ihre Selbstheilungskräfte',
    gradientFrom: '#f0ece4',
    gradientTo: '#e4dcd0',
    description: [
      'Die Homöopathie ist eine sanfte Heilmethode, die die Selbstheilungskräfte des Körpers anregt.',
      'Auf Basis Ihrer individuellen Symptome, Ihrer Persönlichkeit und Ihrer Lebensumstände wähle ich das passende homöopathische Mittel für Sie aus.',
      'Viele Patienten berichten, dass sie sich nach der homöopathischen Behandlung nicht nur körperlich besser fühlen, sondern auch innerlich ausgeglichener.',
    ],
    indications: ['Akute und chronische Erkrankungen', 'Allergien', 'Hormonschwankungen', 'Emotionale Belastungen', 'Kinderkrankheiten'],
    sessionSteps: ['Eingehende Anamnese (60–90 Minuten)', 'Analyse Ihrer Symptome und Ihrer Persönlichkeit', 'Auswahl des individuellen Konstitutionsmittels', 'Einnahmeempfehlung und Verhaltenshinweise', 'Verlaufsgespräch nach 4–6 Wochen'],
  },
  {
    slug: 'akupunktur',
    name: 'Akupunktur',
    shortDescription: 'TCM & Meridianbehandlung',
    benefit: 'Schmerzen lösen, Energie zurückgewinnen',
    gradientFrom: '#e4eee8',
    gradientTo: '#d0e4d8',
    description: [
      'Die Akupunktur ist ein zentrales Verfahren der Traditionellen Chinesischen Medizin (TCM) und wird seit Jahrtausenden erfolgreich eingesetzt.',
      'Durch das gezielte Setzen feiner Nadeln an bestimmten Punkten des Körpers werden Energieblockaden gelöst und die natürliche Balance wiederhergestellt.',
      'Viele meiner Patienten kommen wegen chronischer Schmerzen — und erleben oft schon nach wenigen Sitzungen eine deutliche Verbesserung.',
    ],
    indications: ['Rückenschmerzen & Verspannungen', 'Migräne & Kopfschmerzen', 'Chronische Schmerzen', 'Schlafstörungen', 'Fruchtbarkeit & Zyklusprobleme'],
    sessionSteps: ['Zungendiagnose und Pulsdiagnose nach TCM', 'Bestimmung der betroffenen Meridiane', 'Setzen der feinen Akupunkturnadeln (20–30 Min)', 'Ruhezeit zur Wirkungsentfaltung', 'Nachgespräch und Empfehlungen'],
  },
  {
    slug: 'ernaehrungsberatung',
    name: 'Ernährungsberatung',
    shortDescription: 'Individuelle Ernährungskonzepte',
    benefit: 'Mehr Energie & besserer Schlaf',
    gradientFrom: '#fdf4e8',
    gradientTo: '#f5e4c8',
    description: [
      'Was wir essen, beeinflusst nicht nur unsere körperliche Gesundheit, sondern auch unsere Energie, unsere Stimmung und unseren Schlaf.',
      'Ich entwickle mit Ihnen ein Ernährungskonzept, das zu Ihrem Körper, Ihrem Alltag und Ihren Vorlieben passt — kein Diätplan, sondern eine nachhaltige Veränderung.',
      'Der Fokus liegt auf vollwertigen, entzündungshemmenden Lebensmitteln, die Sie langfristig nähren und stärken.',
    ],
    indications: ['Erschöpfung & Energielosigkeit', 'Gewichtsmanagement', 'Darmprobleme', 'Entzündliche Erkrankungen', 'Lebensmittelunverträglichkeiten'],
    sessionSteps: ['Analyse Ihrer aktuellen Ernährungsgewohnheiten', 'Besprechung Ihrer Ziele und Beschwerden', 'Entwicklung Ihres persönlichen Ernährungsplans', 'Einkaufs- und Kochempfehlungen', 'Folgegespräch nach 6 Wochen'],
  },
  {
    slug: 'stressmedizin',
    name: 'Stressmedizin',
    shortDescription: 'Burnout & Stressprävention',
    benefit: 'Zurück zu Ruhe, Fokus & Balance',
    gradientFrom: '#eae8f0',
    gradientTo: '#d8d4e8',
    description: [
      'Dauerstress ist heute eine der häufigsten Ursachen für körperliche und seelische Beschwerden — von Schlafproblemen über Herzbeschwerden bis hin zum Burnout.',
      'In meiner Praxis betrachten wir Stress nicht als persönliches Versagen, sondern als Signal des Körpers, das gehört werden möchte.',
      'Gemeinsam erarbeiten wir Strategien, die wirklich zu Ihrem Leben passen: Entspannungsmethoden, Grenzen setzen, und die Ursachen von Stress erkennen und verändern.',
    ],
    indications: ['Burnout & Erschöpfungssyndrom', 'Schlafstörungen', 'Angstzustände', 'Chronische Anspannung', 'Work-Life-Balance'],
    sessionSteps: ['Stressanalyse: Ursachen und Auslöser verstehen', 'Körperliche Untersuchung der Stresssymptome', 'Individuelle Entspannungstechniken erlernen', 'Langfristiger Stressmanagement-Plan', 'Regelmäßige Begleitung und Anpassung'],
  },
]

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return treatments.find((t) => t.slug === slug)
}
```

- [ ] Create `lib/testimonials.ts`:
```ts
export type Testimonial = {
  quote: string
  name: string
  age: number
}

export const testimonials: Testimonial[] = [
  { quote: 'Ich fühle mich bei Frau Berger wirklich verstanden. Das kannte ich so nicht.', name: 'Sabine K.', age: 47 },
  { quote: 'Nach Jahren habe ich endlich das Gefühl, dass jemand den ganzen Menschen sieht.', name: 'Thomas M.', age: 39 },
  { quote: 'Die Beratung war einfühlsam und hat mir geholfen, meinen Alltag besser zu gestalten.', name: 'Maria L.', age: 52 },
  { quote: 'Endlich jemand, der sich Zeit nimmt und nicht nur Symptome behandelt.', name: 'Klaus B.', age: 61 },
  { quote: 'Ich bin dankbar, dass ich den Schritt gewagt habe. Es hat sich wirklich verändert.', name: 'Andrea W.', age: 44 },
]
```

- [ ] Create `lib/faq.ts`:
```ts
export type FaqItem = {
  question: string
  answer: string
  category: 'Allgemein' | 'Kosten & Versicherung' | 'Behandlung' | 'Erste Schritte'
}

export const faqItems: FaqItem[] = [
  { category: 'Allgemein', question: 'Für wen ist die Naturheilkunde geeignet?', answer: 'Die Naturheilkunde ist für Menschen jeden Alters geeignet — ob bei chronischen Beschwerden, zur Vorbeugung oder als Ergänzung zur schulmedizinischen Behandlung. Besonders hilfreich ist sie, wenn konventionelle Therapien keine zufriedenstellenden Ergebnisse gebracht haben.' },
  { category: 'Kosten & Versicherung', question: 'Übernimmt meine Krankenkasse die Kosten?', answer: 'Gesetzliche Krankenkassen übernehmen die Kosten für Heilpraktiker-Behandlungen in der Regel nicht. Viele private Krankenversicherungen und einige gesetzliche Zusatzversicherungen erstatten jedoch einen Teil. Ich stelle Ihnen nach jeder Behandlung eine Rechnung nach dem GebüH aus.' },
  { category: 'Erste Schritte', question: 'Wie läuft das kostenlose Erstgespräch ab?', answer: 'Das Erstgespräch dauert ca. 15 Minuten und ist völlig kostenlos. Wir sprechen darüber, was Sie beschäftigt, was Sie sich von einer Behandlung erhoffen, und ob und wie ich Ihnen helfen kann. Kein Druck, keine Verpflichtung — einfach ein offenes Gespräch.' },
  { category: 'Behandlung', question: 'Wie lange dauert eine Behandlung?', answer: 'Das Erstgespräch dauert ca. 60–90 Minuten, Folgetermine ca. 30–60 Minuten — je nach Behandlungsmethode. Ich nehme mir die Zeit, die Sie brauchen.' },
  { category: 'Behandlung', question: 'Wie viele Sitzungen brauche ich?', answer: 'Das hängt von Ihren Beschwerden und Ihrer Konstitution ab. Bei akuten Beschwerden oft 1–3 Sitzungen, bei chronischen Erkrankungen empfehle ich meist eine Begleitung über mehrere Monate. Nach dem Erstgespräch kann ich Ihnen eine realistische Einschätzung geben.' },
  { category: 'Allgemein', question: 'Was unterscheidet Sie von einem Arzt?', answer: 'Als Heilpraktikerin darf ich diagnostizieren und behandeln, verschreibe aber keine verschreibungspflichtigen Medikamente. Mein Fokus liegt auf ganzheitlichen, natürlichen Methoden. Ich sehe mich als Ergänzung zur Schulmedizin — nicht als Ersatz.' },
  { category: 'Kosten & Versicherung', question: 'Was kostet eine Behandlung?', answer: 'Eine Erstanamnese kostet ca. 120–150 €, Folgetermine ca. 60–90 €. Die genauen Kosten besprechen wir beim kostenlosen Erstgespräch. Ich rechne nach der Gebührenordnung für Heilpraktiker (GebüH) ab.' },
  { category: 'Behandlung', question: 'Muss ich Medikamente absetzen?', answer: 'Nein — bitte setzen Sie keine verschriebenen Medikamente ohne Rücksprache mit Ihrem Arzt ab. Naturheilkundliche Behandlungen lassen sich in den meisten Fällen gut mit schulmedizinischen Therapien kombinieren.' },
  { category: 'Erste Schritte', question: 'Wie kann ich einen Termin buchen?', answer: 'Am einfachsten über das Kontaktformular auf dieser Website — ich melde mich innerhalb von 24 Stunden. Sie können mich auch telefonisch oder per E-Mail erreichen.' },
  { category: 'Allgemein', question: 'Behandeln Sie auch Kinder?', answer: 'Ja, ich behandle Kinder ab 3 Jahren. Naturheilkundliche Methoden sind besonders schonend und gut für Kinder geeignet. Für das Erstgespräch kommen die Eltern gemeinsam mit dem Kind.' },
]
```

- [ ] Commit:
```bash
git add lib/
git commit -m "feat: add content data layer for treatments, testimonials and FAQ"
```

---

## Task 6: Reusable UI Primitives

**Files:** `components/ui/AnimatedSection.tsx`, `components/ui/CountUp.tsx`, `components/ui/BookingButton.tsx`

- [ ] Create `components/ui/AnimatedSection.tsx`:
```tsx
'use client'
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function AnimatedSection({ children, className, delay = 0 }: Props) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] Create `components/ui/CountUp.tsx`:
```tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

type Props = { to: number; suffix?: string; prefix?: string; duration?: number }

export default function CountUp({ to, suffix = '', prefix = '', duration = 1500 }: Props) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduced) { setValue(to); return }
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      setValue(Math.round(progress * to))
      if (progress === 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to, duration, reduced])

  return <span ref={ref}>{prefix}{value}{suffix}</span>
}
```

- [ ] Create `components/ui/BookingButton.tsx`:
```tsx
'use client'
import { motion } from 'framer-motion'
import { useBookingModal } from '@/context/BookingModalContext'

type Props = {
  label?: string
  className?: string
  variant?: 'amber' | 'outline'
}

export default function BookingButton({ label = 'Kostenlos kennenlernen →', className = '', variant = 'amber' }: Props) {
  const { open } = useBookingModal()
  const base = 'rounded-full px-7 py-3 font-sans font-semibold text-sm cursor-pointer transition-shadow'
  const styles = variant === 'amber'
    ? `${base} bg-amber text-white shadow-[0_4px_14px_rgba(193,123,45,0.3)]`
    : `${base} border-2 border-forest text-forest`
  return (
    <motion.button
      onClick={open}
      className={`${styles} ${className}`}
      whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(193,123,45,0.45)' }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.button>
  )
}
```

- [ ] Commit:
```bash
git add components/ui/
git commit -m "feat: add AnimatedSection, CountUp and BookingButton UI primitives"
```

---

## Task 7: Booking Modal

**Files:** `components/booking/BookingModal.tsx`

- [ ] Create `components/booking/BookingModal.tsx`:
```tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBookingModal } from '@/context/BookingModalContext'

export default function BookingModal() {
  const { isOpen, close } = useBookingModal()
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
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
            <button onClick={handleClose} className="absolute top-4 right-5 text-warmgrey hover:text-earth text-lg leading-none cursor-pointer">✕</button>

            {!submitted ? (
              <>
                <p className="font-sans text-xs tracking-[2px] uppercase text-sage mb-1">Kostenlose Erstberatung</p>
                <h2 className="font-serif text-2xl italic text-earth mb-1">Lernen wir uns kennen.</h2>
                <p className="font-sans text-sm text-muted mb-6 leading-relaxed">15 Minuten, kostenlos, unverbindlich — ich freue mich auf Sie.</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input required type="text" placeholder="Ihr Name" aria-label="Name" className="w-full border border-[#e8e0d6] rounded-xl px-4 py-3 font-sans text-sm bg-white text-earth outline-none focus:border-forest transition-colors" />
                  <input required type="email" placeholder="Ihre E-Mail-Adresse" aria-label="E-Mail" className="w-full border border-[#e8e0d6] rounded-xl px-4 py-3 font-sans text-sm bg-white text-earth outline-none focus:border-forest transition-colors" />
                  <input type="tel" placeholder="Telefonnummer (optional)" aria-label="Telefonnummer" className="w-full border border-[#e8e0d6] rounded-xl px-4 py-3 font-sans text-sm bg-white text-earth outline-none focus:border-forest transition-colors" />
                  <select required aria-label="Anliegen" className="w-full border border-[#e8e0d6] rounded-xl px-4 py-3 font-sans text-sm bg-white text-earth outline-none focus:border-forest transition-colors appearance-none">
                    <option value="" disabled>Anliegen wählen…</option>
                    <option>Allgemeines Kennenlernen</option>
                    <option>Phytotherapie</option>
                    <option>Homöopathie</option>
                    <option>Akupunktur</option>
                    <option>Ernährungsberatung</option>
                    <option>Stressmedizin</option>
                  </select>
                  <motion.button type="submit" className="w-full bg-amber text-white rounded-full py-3 font-sans font-semibold text-sm cursor-pointer shadow-[0_4px_14px_rgba(193,123,45,0.3)]" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                    Termin anfragen →
                  </motion.button>
                </form>
                <p className="font-sans text-xs text-warmgrey text-center mt-4">Was Sie erwartet: 15 Minuten, kostenlos, kein Verkaufsdruck — einfach ein offenes Gespräch.</p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-forest/10 flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3D6B4F" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <h2 className="font-serif text-2xl italic text-earth mb-2">Vielen Dank!</h2>
                <p className="font-sans text-sm text-muted leading-relaxed">Ihre Anfrage ist eingegangen. Ich melde mich innerhalb von <strong>24 Stunden</strong> bei Ihnen — per Telefon oder E-Mail, ganz wie es Ihnen lieber ist.</p>
                <p className="font-sans text-xs text-warmgrey mt-5">— Anna Berger, Heilpraktikerin</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] Run dev server and manually verify: open modal, fill form, submit — success state appears. Close resets form.
```bash
npm run dev
```

- [ ] Commit:
```bash
git add components/booking/
git commit -m "feat: add booking modal with form and success state"
```

---

## Task 8: Navigation

**Files:** `components/layout/Navigation.tsx`

- [ ] Create `components/layout/Navigation.tsx`:
```tsx
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
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className="font-serif text-xl italic text-earth">Anna Berger</span>
            <span className="font-sans text-[10px] tracking-widest uppercase text-sage">Heilpraktikerin</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/ueber-mich" className="font-sans text-sm text-muted hover:text-earth transition-colors">Über mich</Link>

            <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
              <button className="font-sans text-sm text-muted hover:text-earth transition-colors cursor-pointer">Leistungen ▾</button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 mt-2 bg-cream border border-[#e8e0d6] rounded-2xl shadow-lg py-2 w-52"
                  >
                    {treatments.map((t) => (
                      <Link key={t.slug} href={`/leistungen/${t.slug}`} className="block px-4 py-2 font-sans text-sm text-muted hover:text-earth hover:bg-linen transition-colors">
                        {t.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/faq" className="font-sans text-sm text-muted hover:text-earth transition-colors">FAQ</Link>
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+4989123456789" className="font-sans text-sm text-forest font-medium">+49 89 123 456 789</a>
            <motion.button onClick={open} className="bg-amber text-white rounded-full px-5 py-2 font-sans text-sm font-semibold cursor-pointer shadow-[0_4px_14px_rgba(193,123,45,0.3)]" whileHover={{ y: -1 }}>
              Termin buchen
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer" onClick={() => setMenuOpen(true)} aria-label="Menü öffnen">
            <span className="w-6 h-0.5 bg-earth block" />
            <span className="w-6 h-0.5 bg-earth block" />
            <span className="w-6 h-0.5 bg-earth block" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-cream flex flex-col p-8"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <button className="self-end text-muted text-2xl mb-8 cursor-pointer" onClick={() => setMenuOpen(false)} aria-label="Menü schließen">✕</button>
            <div className="flex flex-col gap-6">
              <Link href="/ueber-mich" className="font-serif text-2xl italic text-earth" onClick={() => setMenuOpen(false)}>Über mich</Link>
              {treatments.map((t) => (
                <Link key={t.slug} href={`/leistungen/${t.slug}`} className="font-serif text-xl italic text-muted" onClick={() => setMenuOpen(false)}>{t.name}</Link>
              ))}
              <Link href="/faq" className="font-serif text-2xl italic text-earth" onClick={() => setMenuOpen(false)}>FAQ</Link>
              <button onClick={() => { open(); setMenuOpen(false) }} className="mt-4 bg-amber text-white rounded-full px-7 py-3 font-sans font-semibold cursor-pointer">Kostenlos kennenlernen →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] Commit:
```bash
git add components/layout/Navigation.tsx
git commit -m "feat: add sticky navigation with dropdown and mobile menu"
```

---

## Task 9: Footer

**Files:** `components/layout/Footer.tsx`

- [ ] Create `components/layout/Footer.tsx`:
```tsx
import Link from 'next/link'
import { treatments } from '@/lib/treatments'

export default function Footer() {
  return (
    <footer className="bg-linen border-t border-[#e8e0d6]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="font-serif text-2xl italic text-earth mb-1">Anna Berger</div>
          <div className="font-sans text-xs tracking-widest uppercase text-sage mb-4">Heilpraktikerin</div>
          <p className="font-sans text-sm text-muted leading-relaxed">Naturheilkunde & Ganzheitsmedizin in München. Ganzheitlich, einfühlsam, nachhaltig.</p>
        </div>
        <div>
          <h3 className="font-sans text-xs tracking-[2px] uppercase text-sage mb-4">Schnelllinks</h3>
          <div className="flex flex-col gap-2">
            <Link href="/ueber-mich" className="font-sans text-sm text-muted hover:text-earth transition-colors">Über mich</Link>
            {treatments.map((t) => (
              <Link key={t.slug} href={`/leistungen/${t.slug}`} className="font-sans text-sm text-muted hover:text-earth transition-colors">{t.name}</Link>
            ))}
            <Link href="/faq" className="font-sans text-sm text-muted hover:text-earth transition-colors">FAQ</Link>
          </div>
        </div>
        <div>
          <h3 className="font-sans text-xs tracking-[2px] uppercase text-sage mb-4">Kontakt</h3>
          <div className="flex flex-col gap-2 font-sans text-sm text-muted">
            <span>Musterstraße 12, 80331 München</span>
            <a href="tel:+4989123456789" className="hover:text-earth transition-colors">+49 89 123 456 789</a>
            <a href="mailto:praxis@anna-berger.de" className="hover:text-earth transition-colors">praxis@anna-berger.de</a>
            <span className="mt-2">Mo–Fr: 9:00–18:00 Uhr</span>
          </div>
        </div>
      </div>
      <div className="border-t border-[#e8e0d6] max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="font-sans text-xs text-warmgrey">© {new Date().getFullYear()} Anna Berger Heilpraktikerin</p>
        <div className="flex gap-4">
          <Link href="/impressum" className="font-sans text-xs text-warmgrey hover:text-earth transition-colors">Impressum</Link>
          <Link href="/datenschutz" className="font-sans text-xs text-warmgrey hover:text-earth transition-colors">Datenschutz</Link>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] Commit:
```bash
git add components/layout/Footer.tsx
git commit -m "feat: add footer"
```

---

## Task 10: Hero Section

**Files:** `components/home/Hero.tsx`

- [ ] Create `components/home/Hero.tsx`:
```tsx
'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import BookingButton from '@/components/ui/BookingButton'
import Link from 'next/link'

const cyclingWords = ['natürlich geheilt.', 'ganzheitlich betreut.', 'neu gedacht.']

function stagger(i: number) {
  return { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' } }
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
      setTimeout(() => { setWordIndex((i) => (i + 1) % cyclingWords.length); setVisible(true) }, 420)
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
      {/* Background blobs */}
      <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(143,175,126,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-1/4 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(193,123,45,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 py-20 w-full grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

        {/* Left */}
        <div className="flex flex-col gap-6">
          <motion.div {...stagger(0)} className="inline-flex items-center gap-2 bg-forest/10 rounded-full px-4 py-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-forest" />
            <span className="font-sans text-[11px] font-medium tracking-widest uppercase text-forest">Naturheilpraxis München</span>
          </motion.div>

          <motion.div {...stagger(1)}>
            <h1 className="font-serif text-5xl lg:text-6xl italic text-earth leading-[1.15]">
              Ihre Gesundheit,<br />
              <span
                className="text-forest transition-all duration-400"
                style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-8px)', display: 'inline-block' }}
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
            <Link href="#leistungen" className="font-sans text-sm font-medium text-forest hover:underline">Leistungen entdecken</Link>
          </motion.div>

          <motion.div {...stagger(4)} className={`flex items-center gap-2 transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-px h-7 bg-gradient-to-b from-sage to-transparent" style={{ animation: 'scrollLine 1.5s ease-in-out infinite' }} />
            <span className="font-sans text-xs text-warmgrey">Weiter entdecken</span>
          </motion.div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-xs bg-gradient-to-br from-[#c8dfc0] via-[#d4e0cc] to-[#e8d8c0] flex flex-col items-center justify-center aspect-[3/4] rounded-[32px_32px_32px_8px] overflow-hidden">
            <div className="flex flex-col items-center gap-1 flex-1 justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#a8c8a0] to-[#c8b89a] flex items-center justify-center text-4xl">👩‍⚕️</div>
              <p className="font-sans font-semibold text-earth mt-3">Anna Berger</p>
              <p className="font-sans text-xs text-forest tracking-wide">Heilpraktikerin</p>
            </div>
            <div className="flex gap-3 pb-5 px-4 w-full justify-center">
              {[{ label: 'Patienten', value: '150+' }, { label: 'Erfahrung', value: '12 Jahre' }].map((pill) => (
                <motion.div key={pill.label} className="bg-white rounded-2xl px-4 py-2 shadow-md flex flex-col items-center" animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: pill.label === 'Erfahrung' ? 1.5 : 0 }}>
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wide text-sage">{pill.label}</span>
                  <span className="font-sans text-base font-bold text-earth leading-tight">{pill.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes scrollLine { 0% { transform: scaleY(0); transform-origin: top; } 50% { transform: scaleY(1); transform-origin: top; } 51% { transform: scaleY(1); transform-origin: bottom; } 100% { transform: scaleY(0); transform-origin: bottom; } }`}</style>
    </section>
  )
}
```

- [ ] Commit:
```bash
git add components/home/Hero.tsx
git commit -m "feat: add Hero section with cycling headline and floating trust pills"
```

---

## Task 11: Trust Bar, Pain Points, About Teaser

**Files:** `components/home/TrustBar.tsx`, `components/home/PainPoints.tsx`, `components/home/AboutTeaser.tsx`

- [ ] Create `components/home/TrustBar.tsx`:
```tsx
import AnimatedSection from '@/components/ui/AnimatedSection'
import CountUp from '@/components/ui/CountUp'

const stats = [
  { prefix: '', value: 150, suffix: '+', label: 'Zufriedene Patienten' },
  { prefix: '', value: 12, suffix: '', label: 'Jahre Erfahrung' },
  { prefix: '', value: 5, suffix: '', label: 'Behandlungsmethoden' },
  { prefix: '★ ', value: 4, suffix: '.9', label: 'Bewertung' },
]

export default function TrustBar() {
  return (
    <section className="bg-linen py-14 border-y border-[#e8e0d6]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <AnimatedSection key={s.label} delay={i * 0.1} className="text-center">
            <div className="font-serif text-4xl italic text-forest mb-1">
              <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <div className="font-sans text-xs uppercase tracking-widest text-muted">{s.label}</div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
```

- [ ] Create `components/home/PainPoints.tsx`:
```tsx
import AnimatedSection from '@/components/ui/AnimatedSection'
import BookingButton from '@/components/ui/BookingButton'

const points = [
  'Ich war beim Arzt, aber meine Beschwerden bleiben — niemand findet eine Ursache.',
  'Ich fühle mich erschöpft, gestresst und nicht mehr wie ich selbst.',
  'Ich möchte nicht einfach Tabletten nehmen — ich will verstehen, was mit mir nicht stimmt.',
]

export default function PainPoints() {
  return (
    <section className="bg-linen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-serif text-4xl italic text-earth mb-3">Kennen Sie das Gefühl?</h2>
          <p className="font-sans text-base text-muted max-w-xl mx-auto leading-relaxed">Viele meiner Patientinnen und Patienten kommen mit genau diesen Erfahrungen zu mir.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {points.map((point, i) => (
            <AnimatedSection key={i} delay={i * 0.15} className="bg-white rounded-2xl p-7 border border-[#e8e0d6] flex flex-col gap-4">
              <p className="font-serif text-lg italic text-earth leading-relaxed">"{point}"</p>
              <p className="font-sans text-sm font-semibold text-forest">→ Genau dafür bin ich da.</p>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center">
          <BookingButton label="Ich helfe Ihnen weiter →" />
        </div>
      </div>
    </section>
  )
}
```

- [ ] Create `components/home/AboutTeaser.tsx`:
```tsx
import AnimatedSection from '@/components/ui/AnimatedSection'
import Link from 'next/link'

export default function AboutTeaser() {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <AnimatedSection>
          <div className="w-full aspect-[4/5] max-w-sm bg-gradient-to-br from-[#c8dfc0] to-[#e8d8c0] rounded-[8px_32px_32px_32px] flex items-center justify-center text-7xl">
            👩‍⚕️
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.2} className="flex flex-col gap-5">
          <p className="font-sans text-xs tracking-[3px] uppercase text-sage">Über mich</p>
          <h2 className="font-serif text-4xl italic text-earth leading-tight">Medizin, die den Menschen sieht.</h2>
          <p className="font-sans text-base text-muted leading-relaxed">
            Ich nehme mir die Zeit, die Sie verdienen. Nicht 7 Minuten — sondern so lange, bis wir gemeinsam verstehen, was Ihnen wirklich fehlt.
          </p>
          <p className="font-sans text-base text-muted leading-relaxed">
            Seit über 12 Jahren begleite ich Menschen auf ihrem Weg zu mehr Gesundheit und Wohlbefinden — ganzheitlich, einfühlsam und nachhaltig.
          </p>
          <Link href="/ueber-mich" className="font-sans text-sm font-semibold text-forest hover:underline w-fit">Meine Geschichte →</Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
```

- [ ] Commit:
```bash
git add components/home/TrustBar.tsx components/home/PainPoints.tsx components/home/AboutTeaser.tsx
git commit -m "feat: add TrustBar, PainPoints and AboutTeaser sections"
```

---

## Task 12: Treatments Grid

**Files:** `components/home/TreatmentsGrid.tsx`

- [ ] Create `components/home/TreatmentsGrid.tsx`:
```tsx
'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { treatments } from '@/lib/treatments'

const icons: Record<string, React.ReactNode> = {
  phytotherapie: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 36C20 36 8 28 8 18C8 10 14 5 20 5C26 5 32 10 32 18C32 28 20 36 20 36Z" fill="#3D6B4F22" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 36L20 10" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 18L14 13M20 18L26 13M20 24L13 20M20 24L27 20" stroke="#3D6B4F" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
  homoeopathie: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <ellipse cx="12" cy="26" rx="5.5" ry="7" fill="#3D6B4F22" stroke="#3D6B4F" strokeWidth="1.5"/>
      <path d="M12 19L12 14Q12 11 14 9" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="28" cy="26" rx="5.5" ry="7" fill="#3D6B4F22" stroke="#3D6B4F" strokeWidth="1.5"/>
      <path d="M28 19L28 14Q28 11 30 9" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="20" cy="24" rx="5" ry="6.5" fill="#3D6B4F33" stroke="#3D6B4F" strokeWidth="1.5"/>
      <path d="M20 17.5L20 12Q20 9 22 7" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  akupunktur: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 8C22.5 8 24 9.5 24 11.5C24 13.5 22.5 15 20 15C17.5 15 16 13.5 16 11.5C16 9.5 17.5 8 20 8Z" fill="#3D6B4F22" stroke="#3D6B4F" strokeWidth="1.5"/>
      <path d="M15 15.5C13 17 12 19 12 22L12 30C12 31 12.5 32 13.5 32L16 32L16 26L24 26L24 32L26.5 32C27.5 32 28 31 28 30L28 22C28 19 27 17 25 15.5" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#3D6B4F11"/>
      <line x1="26" y1="10" x2="32" y2="4" stroke="#C17B2D" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="21" r="2" fill="#3D6B4F44" stroke="#3D6B4F" strokeWidth="1.2"/>
      <circle cx="20" cy="21" r="4" stroke="#3D6B4F" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5"/>
    </svg>
  ),
  ernaehrungsberatung: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 13C13 13 9 18 9 24C9 30 13 35 20 35C27 35 31 30 31 24C31 18 27 13 20 13Z" fill="#3D6B4F22" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 13C17 13 18 11 20 11C22 11 23 13 23 13" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 11L20 8" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 9C20 9 23 7 26 9C23 10 20 9 20 9Z" fill="#3D6B4F44" stroke="#3D6B4F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  stressmedizin: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 7C14 7 10 11 10 17C10 21 12 24 15 26L15 31C15 32 16 33 17 33L23 33C24 33 25 32 25 31L25 26C28 24 30 21 30 17C30 11 26 7 20 7Z" fill="#3D6B4F11" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 17Q16 14 18 17Q20 20 22 17Q24 14 26 17" stroke="#3D6B4F" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M20 7C20 7 22 4 25 5C23 7 20 7 20 7Z" fill="#3D6B4F44" stroke="#3D6B4F" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

export default function TreatmentsGrid() {
  return (
    <section id="leistungen" className="bg-cream py-20">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-4">
          <p className="font-sans text-xs tracking-[3px] uppercase text-sage mb-3">Meine Leistungen</p>
          <h2 className="font-serif text-4xl italic text-earth">Was ich für Sie tun kann</h2>
        </AnimatedSection>
        <AnimatedSection delay={0.1} className="text-center mb-12">
          <p className="font-sans text-base text-muted max-w-2xl mx-auto leading-relaxed italic font-serif">
            "Jede meiner Behandlungsmethoden zielt auf eine Sache ab: dass Sie sich wieder wohlfühlen — in Ihrem Körper, in Ihrem Alltag, in Ihrem Leben."
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {treatments.map((t, i) => (
            <AnimatedSection key={t.slug} delay={i * 0.1}>
              <motion.div
                className="bg-white rounded-2xl border border-[#e8e0d6] overflow-hidden flex flex-col h-full cursor-pointer"
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(61,107,79,0.13)' }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-center p-6" style={{ background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})` }}>
                  {icons[t.slug]}
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="font-sans font-bold text-sm text-earth">{t.name}</h3>
                  <p className="font-sans text-xs text-muted leading-relaxed">{t.shortDescription}</p>
                  <div className="flex items-center gap-1.5 bg-forest/[0.07] rounded-full px-3 py-2 mt-1 min-h-[48px]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3D6B4F" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                    <span className="font-sans text-[10px] font-semibold text-forest leading-tight">{t.benefit}</span>
                  </div>
                  <Link href={`/leistungen/${t.slug}`} className="font-sans text-xs font-semibold text-forest mt-auto pt-2 hover:underline">Mehr erfahren →</Link>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] Commit:
```bash
git add components/home/TreatmentsGrid.tsx
git commit -m "feat: add TreatmentsGrid with custom SVG icons and benefit tags"
```

---

## Task 13: How It Works + Erstgespräch Explainer

**Files:** `components/home/HowItWorks.tsx`

- [ ] Create `components/home/HowItWorks.tsx`:
```tsx
import AnimatedSection from '@/components/ui/AnimatedSection'
import BookingButton from '@/components/ui/BookingButton'

const steps = [
  { n: '01', title: 'Erstgespräch', subtitle: 'Wir lernen uns kennen', desc: '15 Minuten, kostenlos, per Telefon oder vor Ort — ohne Druck, ohne Verpflichtung.' },
  { n: '02', title: 'Diagnose', subtitle: 'Ich höre wirklich zu', desc: 'Ganzheitliche Befunderhebung (ca. 60 Min) — Ihr ganzes Bild, nicht nur ein Symptom.' },
  { n: '03', title: 'Behandlung', subtitle: 'Ihr individueller Heilplan', desc: 'Auf Sie zugeschnitten. Wir gehen gemeinsam, in Ihrem Tempo, in die richtige Richtung.' },
]

export default function HowItWorks() {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection className="text-center mb-14">
          <p className="font-sans text-xs tracking-[3px] uppercase text-sage mb-3">So funktioniert es</p>
          <h2 className="font-serif text-4xl italic text-earth">Ihr Weg zu mehr Wohlbefinden</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-14">
          <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-px border-t border-dashed border-sage/40" />
          {steps.map((s, i) => (
            <AnimatedSection key={s.n} delay={i * 0.15} className="flex flex-col items-center text-center gap-3">
              <div className="font-serif text-6xl italic text-forest/20 leading-none">{s.n}</div>
              <h3 className="font-sans font-bold text-base text-earth">{s.title}</h3>
              <p className="font-sans text-sm font-semibold text-sage">{s.subtitle}</p>
              <p className="font-sans text-sm text-muted leading-relaxed max-w-xs">{s.desc}</p>
            </AnimatedSection>
          ))}
        </div>

        {/* Erstgespräch explainer callout */}
        <AnimatedSection delay={0.3}>
          <div className="border-l-4 border-forest bg-linen rounded-r-2xl p-7 max-w-3xl mx-auto">
            <h3 className="font-sans font-bold text-sm text-earth mb-4">Was Sie im Erstgespräch erwartet:</h3>
            <ul className="flex flex-col gap-2 mb-5">
              {[
                'Ich höre Ihnen zu — ohne Zeitdruck, ohne Vorwürfe',
                'Sie schildern, was Sie beschäftigt — ob körperlich, emotional oder beides',
                'Ich erkläre, wie ich Ihnen helfen kann und welche Methoden passen könnten',
                'Kein Verkaufsdruck. Kein Behandlungsvertrag. Nur ein offenes Gespräch.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 font-sans text-sm text-muted">
                  <svg className="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3D6B4F" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-sans text-xs text-muted mb-5"><strong>Dauer:</strong> ca. 15 Minuten · <strong>Kosten:</strong> kostenlos · <strong>Per Telefon oder vor Ort</strong></p>
            <BookingButton label="Jetzt Platz sichern →" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
```

- [ ] Commit:
```bash
git add components/home/HowItWorks.tsx
git commit -m "feat: add HowItWorks section with Erstgespräch explainer callout"
```

---

## Task 14: Testimonials Slider

**Files:** `components/home/TestimonialsSlider.tsx`

- [ ] Create `components/home/TestimonialsSlider.tsx`:
```tsx
'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '@/lib/testimonials'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function TestimonialsSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const t = testimonials[index]

  return (
    <section className="bg-linen py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection className="mb-12">
          <p className="font-sans text-xs tracking-[3px] uppercase text-sage mb-3">Das sagen meine Patienten</p>
          <h2 className="font-serif text-4xl italic text-earth">Echte Erfahrungen</h2>
        </AnimatedSection>

        <div className="min-h-[160px] flex items-center justify-center mb-8">
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

        <div className="flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${i === index ? 'bg-forest w-6' : 'bg-sage/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] Commit:
```bash
git add components/home/TestimonialsSlider.tsx
git commit -m "feat: add auto-advancing testimonials slider"
```

---

## Task 15: FAQ Teaser & Booking CTA Section

**Files:** `components/home/FaqTeaser.tsx`, `components/home/BookingCtaSection.tsx`

- [ ] Create `components/home/FaqTeaser.tsx`:
```tsx
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
                  <span className={`text-forest transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
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
```

- [ ] Create `components/home/BookingCtaSection.tsx`:
```tsx
import BookingButton from '@/components/ui/BookingButton'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function BookingCtaSection() {
  return (
    <section className="bg-forest py-24">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <AnimatedSection className="flex flex-col items-center gap-6">
          <p className="font-sans text-xs tracking-[3px] uppercase text-sage">Erster Schritt</p>
          <h2 className="font-serif text-4xl italic text-cream leading-tight">Bereit für den ersten Schritt?</h2>
          <p className="font-sans text-base text-sage leading-relaxed">15 Minuten. Kostenlos. Unverbindlich.</p>
          <BookingButton label="Jetzt Erstgespräch buchen" className="!bg-amber" />
          <a href="tel:+4989123456789" className="font-sans text-sm text-sage/80 hover:text-cream transition-colors">+49 89 123 456 789</a>
        </AnimatedSection>
      </div>
    </section>
  )
}
```

- [ ] Commit:
```bash
git add components/home/FaqTeaser.tsx components/home/BookingCtaSection.tsx
git commit -m "feat: add FaqTeaser accordion and BookingCtaSection"
```

---

## Task 16: Landing Page Assembly

**Files:** `app/page.tsx`

- [ ] Replace `app/page.tsx`:
```tsx
import Hero from '@/components/home/Hero'
import TrustBar from '@/components/home/TrustBar'
import PainPoints from '@/components/home/PainPoints'
import AboutTeaser from '@/components/home/AboutTeaser'
import TreatmentsGrid from '@/components/home/TreatmentsGrid'
import HowItWorks from '@/components/home/HowItWorks'
import TestimonialsSlider from '@/components/home/TestimonialsSlider'
import FaqTeaser from '@/components/home/FaqTeaser'
import BookingCtaSection from '@/components/home/BookingCtaSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <PainPoints />
      <AboutTeaser />
      <TreatmentsGrid />
      <HowItWorks />
      <TestimonialsSlider />
      <FaqTeaser />
      <BookingCtaSection />
    </>
  )
}
```

- [ ] Run dev server and visually verify the full landing page:
```bash
npm run dev
```
Check: all 9 sections render, animations work, booking modal opens from any CTA, nav scrolls correctly.

- [ ] Commit:
```bash
git add app/page.tsx
git commit -m "feat: assemble landing page"
```

---

## Task 17: Treatment Detail Pages

**Files:** `components/treatments/TreatmentPageTemplate.tsx`, `app/leistungen/[slug]/page.tsx`

- [ ] Create `components/treatments/TreatmentPageTemplate.tsx`:
```tsx
import { Treatment, treatments } from '@/lib/treatments'
import BookingButton from '@/components/ui/BookingButton'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Link from 'next/link'

export default function TreatmentPageTemplate({ treatment }: { treatment: Treatment }) {
  const related = treatments.filter((t) => t.slug !== treatment.slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <p className="font-sans text-xs tracking-[3px] uppercase text-sage mb-3">Leistungen</p>
            <h1 className="font-serif text-5xl italic text-earth mb-4">{treatment.name}</h1>
            <p className="font-sans text-lg text-muted leading-relaxed max-w-2xl">{treatment.benefit} — {treatment.shortDescription}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* What is it */}
      <section className="bg-linen py-16">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="flex flex-col gap-4">
            <h2 className="font-serif text-3xl italic text-earth">Was ist {treatment.name}?</h2>
            {treatment.description.map((p, i) => (
              <p key={i} className="font-sans text-base text-muted leading-relaxed">{p}</p>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Who is it for */}
      <section className="bg-cream py-16">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <AnimatedSection className="flex flex-col gap-4">
            <h2 className="font-serif text-3xl italic text-earth">Für wen geeignet?</h2>
            <ul className="flex flex-col gap-2">
              {treatment.indications.map((ind) => (
                <li key={ind} className="flex items-center gap-2 font-sans text-sm text-muted">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3D6B4F" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                  {ind}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="flex flex-col gap-4">
            <h2 className="font-serif text-3xl italic text-earth">Was Sie erwartet</h2>
            <ol className="flex flex-col gap-3">
              {treatment.sessionSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 font-sans text-sm text-muted">
                  <span className="font-serif text-2xl italic text-forest/30 leading-none shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  {step}
                </li>
              ))}
            </ol>
          </AnimatedSection>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="bg-forest py-16">
        <div className="max-w-xl mx-auto px-6 text-center flex flex-col items-center gap-5">
          <h2 className="font-serif text-3xl italic text-cream">Bereit, {treatment.name} auszuprobieren?</h2>
          <p className="font-sans text-sage text-sm">Starten Sie mit einem kostenlosen 15-minütigen Erstgespräch.</p>
          <BookingButton label="Kostenlos kennenlernen →" />
        </div>
      </section>

      {/* Related treatments */}
      <section className="bg-cream py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl italic text-earth mb-8">Weitere Leistungen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((t) => (
              <Link key={t.slug} href={`/leistungen/${t.slug}`} className="bg-white border border-[#e8e0d6] rounded-2xl p-5 hover:shadow-md transition-shadow">
                <h3 className="font-sans font-bold text-sm text-earth mb-1">{t.name}</h3>
                <p className="font-sans text-xs text-muted">{t.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] Create `app/leistungen/[slug]/page.tsx`:
```tsx
import { notFound } from 'next/navigation'
import { treatments, getTreatmentBySlug } from '@/lib/treatments'
import TreatmentPageTemplate from '@/components/treatments/TreatmentPageTemplate'

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const t = getTreatmentBySlug(params.slug)
  if (!t) return {}
  return { title: `${t.name} | Anna Berger Heilpraktikerin`, description: t.benefit }
}

export default function TreatmentPage({ params }: { params: { slug: string } }) {
  const treatment = getTreatmentBySlug(params.slug)
  if (!treatment) notFound()
  return <TreatmentPageTemplate treatment={treatment} />
}
```

- [ ] Verify all 5 treatment pages render:
```bash
npm run dev
# Visit: /leistungen/phytotherapie, /leistungen/homoeopathie, /leistungen/akupunktur, /leistungen/ernaehrungsberatung, /leistungen/stressmedizin
```

- [ ] Commit:
```bash
git add components/treatments/ app/leistungen/
git commit -m "feat: add treatment detail pages with dynamic routing"
```

---

## Task 18: About, FAQ & Legal Pages

**Files:** `app/ueber-mich/page.tsx`, `app/faq/page.tsx`, `app/impressum/page.tsx`, `app/datenschutz/page.tsx`

- [ ] Create `app/ueber-mich/page.tsx`:
```tsx
import BookingButton from '@/components/ui/BookingButton'
import AnimatedSection from '@/components/ui/AnimatedSection'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Über mich | Anna Berger Heilpraktikerin' }

export default function UeberMichPage() {
  return (
    <>
      <section className="bg-cream pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <div className="aspect-[3/4] bg-gradient-to-br from-[#c8dfc0] to-[#e8d8c0] rounded-[32px_32px_32px_8px] flex items-center justify-center text-8xl">👩‍⚕️</div>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="flex flex-col gap-5">
            <p className="font-sans text-xs tracking-[3px] uppercase text-sage">Über mich</p>
            <h1 className="font-serif text-5xl italic text-earth leading-tight">Meine Geschichte</h1>
            <p className="font-sans text-base text-muted leading-relaxed">
              Ich bin Anna Berger, Heilpraktikerin in München. Meinen Weg in die Naturheilkunde fand ich nach eigenen Erfahrungen mit chronischen Beschwerden, die die Schulmedizin nicht lösen konnte. Das hat mich gelehrt: Der Mensch ist mehr als seine Symptome.
            </p>
            <p className="font-sans text-base text-muted leading-relaxed">
              Seit über 12 Jahren begleite ich Patientinnen und Patienten ganzheitlich — mit Methoden, die den ganzen Menschen in den Blick nehmen: Körper, Geist und Seele.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-linen py-16">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="flex flex-col gap-6">
            <h2 className="font-serif text-3xl italic text-earth">Mein Weg</h2>
            <p className="font-sans text-base text-muted leading-relaxed">
              Nach meinem Studium der Biologie spezialisierte ich mich auf Naturheilkunde und erwarb die Heilpraktiker-Zulassung. Seitdem habe ich mich kontinuierlich weitergebildet — in TCM, Homöopathie, Phytotherapie und Stressmedizin.
            </p>
            <p className="font-sans text-base text-muted leading-relaxed">
              Was mich antreibt: der Moment, wenn ein Patient zum ersten Mal sagt, dass er sich wirklich verstanden fühlt. Das ist es, wofür ich jeden Tag in die Praxis komme.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="flex flex-col gap-6">
            <h2 className="font-serif text-3xl italic text-earth">Ausbildung & Qualifikationen</h2>
            <ul className="flex flex-col gap-3">
              {['Heilpraktiker-Zulassung (2012)', 'Zertifikat Traditionelle Chinesische Medizin & Akupunktur', 'Weiterbildung klassische Homöopathie', 'Zertifizierte Ernährungsberaterin', 'Mitglied im Verband Deutscher Heilpraktiker (VDH)'].map((q) => (
                <li key={q} className="flex items-center gap-2 font-sans text-sm text-muted">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3D6B4F" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                  {q}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-linen py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <blockquote className="font-serif text-3xl italic text-earth leading-relaxed mb-4">
            "Gesundheit ist kein Zustand, den man erreicht — sie ist ein Weg, den man geht. Ich begleite Sie dabei."
          </blockquote>
          <p className="font-sans text-sm text-muted">— Anna Berger</p>
        </div>
      </section>

      <section className="bg-forest py-16">
        <div className="max-w-xl mx-auto px-6 text-center flex flex-col items-center gap-5">
          <h2 className="font-serif text-3xl italic text-cream">Lernen Sie mich kennen.</h2>
          <p className="font-sans text-sage text-sm">Kostenlos, unverbindlich, 15 Minuten.</p>
          <BookingButton />
        </div>
      </section>
    </>
  )
}
```

- [ ] Create `app/faq/page.tsx`:
```tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqItems, FaqItem } from '@/lib/faq'
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
                      <button className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer" onClick={() => setOpen(open === id ? null : id)}>
                        <span className="font-sans font-semibold text-sm text-earth">{item.question}</span>
                        <span className={`text-forest transition-transform duration-300 ${open === id ? 'rotate-45' : ''}`}>+</span>
                      </button>
                      <AnimatePresence>
                        {open === id && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
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
```

- [ ] Create `app/impressum/page.tsx`:
```tsx
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Impressum | Anna Berger Heilpraktikerin' }
export default function ImpressumPage() {
  return (
    <section className="bg-cream pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="font-serif text-4xl italic text-earth mb-8">Impressum</h1>
        <div className="font-sans text-sm text-muted leading-relaxed flex flex-col gap-4">
          <div><strong className="text-earth">Angaben gemäß § 5 TMG</strong><br />Anna Berger<br />Heilpraktikerin<br />Musterstraße 12<br />80331 München</div>
          <div><strong className="text-earth">Kontakt</strong><br />Telefon: +49 89 123 456 789<br />E-Mail: praxis@anna-berger.de</div>
          <div><strong className="text-earth">Berufsbezeichnung</strong><br />Heilpraktikerin (verliehen in Deutschland)<br />Zuständige Aufsichtsbehörde: Gesundheitsamt München</div>
          <div><strong className="text-earth">Haftungsausschluss</strong><br />Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir keine Gewähr.</div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] Create `app/datenschutz/page.tsx`:
```tsx
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Datenschutz | Anna Berger Heilpraktikerin' }
export default function DatenschutzPage() {
  return (
    <section className="bg-cream pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="font-serif text-4xl italic text-earth mb-8">Datenschutzerklärung</h1>
        <div className="font-sans text-sm text-muted leading-relaxed flex flex-col gap-6">
          <div><strong className="text-earth">1. Verantwortliche Stelle</strong><p className="mt-1">Anna Berger, Musterstraße 12, 80331 München. E-Mail: praxis@anna-berger.de</p></div>
          <div><strong className="text-earth">2. Erhebung und Verarbeitung personenbezogener Daten</strong><p className="mt-1">Beim Ausfüllen des Kontaktformulars erheben wir Ihren Namen, Ihre E-Mail-Adresse und optional Ihre Telefonnummer. Diese Daten verwenden wir ausschließlich zur Bearbeitung Ihrer Anfrage und geben sie nicht an Dritte weiter.</p></div>
          <div><strong className="text-earth">3. Ihre Rechte</strong><p className="mt-1">Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie das Recht auf Datenübertragbarkeit. Wenden Sie sich dazu an die oben genannte E-Mail-Adresse.</p></div>
          <div><strong className="text-earth">4. Cookies</strong><p className="mt-1">Diese Website verwendet keine Tracking-Cookies. Es werden ausschließlich technisch notwendige Cookies gesetzt.</p></div>
          <div><strong className="text-earth">5. Hosting</strong><p className="mt-1">Diese Website wird über Vercel Inc. gehostet. Weitere Informationen zum Datenschutz bei Vercel finden Sie unter vercel.com/legal/privacy-policy.</p></div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] Commit:
```bash
git add app/ueber-mich/ app/faq/ app/impressum/ app/datenschutz/
git commit -m "feat: add about, FAQ and legal pages"
```

---

## Task 19: Final Build Check

- [ ] Run production build to catch any type errors:
```bash
npm run build
```
Expected: `✓ Compiled successfully` with no errors.

- [ ] Fix any TypeScript or build errors that appear, then run dev for final visual check:
```bash
npm run dev
```
Check all routes: `/`, `/ueber-mich`, `/leistungen/phytotherapie`, `/faq`, `/impressum`, `/datenschutz`

- [ ] Confirm on mobile viewport (Chrome DevTools → iPhone 14 375px): nav collapses to hamburger, treatment grid is single column, modal is full-width.

- [ ] Final commit:
```bash
git add -A
git commit -m "feat: complete Heilpraktiker prototype — all pages and sections"
```
