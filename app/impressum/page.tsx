import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Impressum | Anna Berger Heilpraktikerin' }

export default function ImpressumPage() {
  return (
    <section className="bg-cream pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="font-serif text-4xl italic text-earth mb-8">Impressum</h1>
        <div className="font-sans text-sm text-muted leading-relaxed flex flex-col gap-4">
          <div>
            <strong className="text-earth">Angaben gemäß § 5 TMG</strong><br />
            Anna Berger<br />Heilpraktikerin<br />Musterstraße 12<br />80331 München
          </div>
          <div>
            <strong className="text-earth">Kontakt</strong><br />
            Telefon: +49 89 123 456 789<br />E-Mail: praxis@anna-berger.de
          </div>
          <div>
            <strong className="text-earth">Berufsbezeichnung</strong><br />
            Heilpraktikerin (verliehen in Deutschland)<br />
            Zuständige Aufsichtsbehörde: Gesundheitsamt München
          </div>
          <div>
            <strong className="text-earth">Haftungsausschluss</strong><br />
            Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir keine Gewähr.
          </div>
        </div>
      </div>
    </section>
  )
}
