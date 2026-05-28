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
          <p className="font-sans text-base text-muted max-w-xl mx-auto leading-relaxed">
            Viele meiner Patientinnen und Patienten kommen mit genau diesen Erfahrungen zu mir.
          </p>
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
