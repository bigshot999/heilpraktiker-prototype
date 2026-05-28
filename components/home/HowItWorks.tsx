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
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px border-t border-dashed border-sage/40" />
          {steps.map((s, i) => (
            <AnimatedSection key={s.n} delay={i * 0.15} className="flex flex-col items-center text-center gap-3">
              <div className="font-serif text-6xl italic text-forest/20 leading-none">{s.n}</div>
              <h3 className="font-sans font-bold text-base text-earth">{s.title}</h3>
              <p className="font-sans text-sm font-semibold text-sage">{s.subtitle}</p>
              <p className="font-sans text-sm text-muted leading-relaxed max-w-xs">{s.desc}</p>
            </AnimatedSection>
          ))}
        </div>

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
                  <svg className="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3D6B4F" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-sans text-xs text-muted mb-5">
              <strong>Dauer:</strong> ca. 15 Minuten · <strong>Kosten:</strong> kostenlos · <strong>Per Telefon oder vor Ort</strong>
            </p>
            <BookingButton label="Jetzt Platz sichern →" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
