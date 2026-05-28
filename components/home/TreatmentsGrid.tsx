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
          <p className="font-serif text-base text-muted max-w-2xl mx-auto leading-relaxed italic">
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
                <div
                  className="flex items-center justify-center p-6"
                  style={{ background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientTo})` }}
                >
                  {icons[t.slug]}
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="font-sans font-bold text-sm text-earth">{t.name}</h3>
                  <p className="font-sans text-xs text-muted leading-relaxed">{t.shortDescription}</p>
                  <div className="flex items-center gap-1.5 bg-forest/[0.07] rounded-full px-3 py-2 mt-1 min-h-[48px]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3D6B4F" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <span className="font-sans text-[10px] font-semibold text-forest leading-tight">{t.benefit}</span>
                  </div>
                  <Link href={`/leistungen/${t.slug}`} className="font-sans text-xs font-semibold text-forest mt-auto pt-2 hover:underline">
                    Mehr erfahren →
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
