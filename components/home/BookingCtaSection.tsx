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
          <BookingButton label="Jetzt Erstgespräch buchen" />
          <a href="tel:+4989123456789" className="font-sans text-sm text-sage/80 hover:text-cream transition-colors">
            +49 89 123 456 789
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}
