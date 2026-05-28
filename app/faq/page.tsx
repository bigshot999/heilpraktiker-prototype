import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import FaqAccordion from './FaqAccordion'
import { faqItems } from '@/lib/faq'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Häufige Fragen',
  description: 'Antworten auf Ihre Fragen zu Naturheilkunde, Kosten, Ablauf des Erstgesprächs und Behandlungsmethoden bei Heilpraktikerin Anna Berger in München.',
  alternates: { canonical: `${SITE_URL}/faq` },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <section className="bg-cream pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-sans text-xs tracking-[3px] uppercase text-sage mb-3">Häufige Fragen</p>
          <h1 className="font-serif text-5xl italic text-earth">Ihre Fragen, beantwortet.</h1>
        </div>
      </section>
      <FaqAccordion />
    </>
  )
}
