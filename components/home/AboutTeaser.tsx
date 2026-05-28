import AnimatedSection from '@/components/ui/AnimatedSection'
import Link from 'next/link'

export default function AboutTeaser() {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <AnimatedSection>
          <div className="w-full aspect-[4/5] max-w-sm bg-gradient-to-br from-[#c8dfc0] to-[#e8d8c0] rounded-organic-alt flex items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="26" r="14" fill="#3D6B4F44" stroke="#3D6B4F" strokeWidth="2"/>
              <path d="M16 72c0-13.255 10.745-24 24-24s24 10.745 24 24" stroke="#3D6B4F" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
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
          <Link href="/ueber-mich" className="font-sans text-sm font-semibold text-forest hover:underline w-fit">
            Meine Geschichte →
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
