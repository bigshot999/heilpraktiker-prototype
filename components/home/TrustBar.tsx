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
