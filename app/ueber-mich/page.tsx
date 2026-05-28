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
            <div className="aspect-[3/4] bg-gradient-to-br from-[#c8dfc0] to-[#e8d8c0] rounded-organic flex items-center justify-center">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="26" r="14" fill="#3D6B4F44" stroke="#3D6B4F" strokeWidth="2"/>
                <path d="M16 72c0-13.255 10.745-24 24-24s24 10.745 24 24" stroke="#3D6B4F" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
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
              {[
                'Heilpraktiker-Zulassung (2012)',
                'Zertifikat Traditionelle Chinesische Medizin & Akupunktur',
                'Weiterbildung klassische Homöopathie',
                'Zertifizierte Ernährungsberaterin',
                'Mitglied im Verband Deutscher Heilpraktiker (VDH)',
              ].map((q) => (
                <li key={q} className="flex items-center gap-2 font-sans text-sm text-muted">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3D6B4F" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
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
