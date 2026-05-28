import Link from 'next/link'
import { treatments } from '@/lib/treatments'

export default function Footer() {
  return (
    <footer className="bg-linen border-t border-[#e8e0d6]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="font-serif text-2xl italic text-earth mb-1">Anna Berger</div>
          <div className="font-sans text-xs tracking-widest uppercase text-sage mb-4">Heilpraktikerin</div>
          <p className="font-sans text-sm text-muted leading-relaxed">
            Naturheilkunde & Ganzheitsmedizin in München. Ganzheitlich, einfühlsam, nachhaltig.
          </p>
        </div>
        <div>
          <h3 className="font-sans text-xs tracking-[2px] uppercase text-sage mb-4">Schnelllinks</h3>
          <div className="flex flex-col gap-2">
            <Link href="/ueber-mich" className="font-sans text-sm text-muted hover:text-earth transition-colors">Über mich</Link>
            {treatments.map((t) => (
              <Link key={t.slug} href={`/leistungen/${t.slug}`} className="font-sans text-sm text-muted hover:text-earth transition-colors">
                {t.name}
              </Link>
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
