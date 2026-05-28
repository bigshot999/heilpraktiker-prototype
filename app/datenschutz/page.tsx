import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Datenschutz | Anna Berger Heilpraktikerin' }

export default function DatenschutzPage() {
  return (
    <section className="bg-cream pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="font-serif text-4xl italic text-earth mb-8">Datenschutzerklärung</h1>
        <div className="font-sans text-sm text-muted leading-relaxed flex flex-col gap-6">
          <div>
            <strong className="text-earth">1. Verantwortliche Stelle</strong>
            <p className="mt-1">Anna Berger, Musterstraße 12, 80331 München. E-Mail: praxis@anna-berger.de</p>
          </div>
          <div>
            <strong className="text-earth">2. Erhebung und Verarbeitung personenbezogener Daten</strong>
            <p className="mt-1">Beim Ausfüllen des Kontaktformulars erheben wir Ihren Namen, Ihre E-Mail-Adresse und optional Ihre Telefonnummer. Diese Daten verwenden wir ausschließlich zur Bearbeitung Ihrer Anfrage und geben sie nicht an Dritte weiter.</p>
          </div>
          <div>
            <strong className="text-earth">3. Ihre Rechte</strong>
            <p className="mt-1">Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie das Recht auf Datenübertragbarkeit. Wenden Sie sich dazu an die oben genannte E-Mail-Adresse.</p>
          </div>
          <div>
            <strong className="text-earth">4. Cookies</strong>
            <p className="mt-1">Diese Website verwendet keine Tracking-Cookies. Es werden ausschließlich technisch notwendige Cookies gesetzt.</p>
          </div>
          <div>
            <strong className="text-earth">5. Hosting</strong>
            <p className="mt-1">Diese Website wird über Vercel Inc. gehostet. Weitere Informationen zum Datenschutz bei Vercel finden Sie unter vercel.com/legal/privacy-policy.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
