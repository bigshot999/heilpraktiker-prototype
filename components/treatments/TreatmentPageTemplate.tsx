import { Treatment, treatments } from '@/lib/treatments'
import BookingButton from '@/components/ui/BookingButton'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Link from 'next/link'

export default function TreatmentPageTemplate({ treatment }: { treatment: Treatment }) {
  const related = treatments.filter((t) => t.slug !== treatment.slug).slice(0, 3)

  return (
    <>
      <section className="bg-cream pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <p className="font-sans text-xs tracking-[3px] uppercase text-sage mb-3">Leistungen</p>
            <h1 className="font-serif text-5xl italic text-earth mb-4">{treatment.name}</h1>
            <p className="font-sans text-lg text-muted leading-relaxed max-w-2xl">
              {treatment.benefit} — {treatment.shortDescription}
            </p>
          </AnimatedSection>
        </div>
      </section>

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

      <section className="bg-cream py-16">
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <AnimatedSection className="flex flex-col gap-4">
            <h2 className="font-serif text-3xl italic text-earth">Für wen geeignet?</h2>
            <ul className="flex flex-col gap-2">
              {treatment.indications.map((ind) => (
                <li key={ind} className="flex items-center gap-2 font-sans text-sm text-muted">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3D6B4F" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
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
                  <span className="font-serif text-2xl italic text-forest/30 leading-none shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-forest py-16">
        <div className="max-w-xl mx-auto px-6 text-center flex flex-col items-center gap-5">
          <h2 className="font-serif text-3xl italic text-cream">Bereit, {treatment.name} auszuprobieren?</h2>
          <p className="font-sans text-sage text-sm">Starten Sie mit einem kostenlosen 15-minütigen Erstgespräch.</p>
          <BookingButton label="Kostenlos kennenlernen →" />
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-2xl italic text-earth mb-8">Weitere Leistungen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((t) => (
              <Link
                key={t.slug}
                href={`/leistungen/${t.slug}`}
                className="bg-white border border-[#e8e0d6] rounded-2xl p-5 hover:shadow-md transition-shadow"
              >
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
