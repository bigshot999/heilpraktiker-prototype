import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { treatments, getTreatmentBySlug } from '@/lib/treatments'
import TreatmentPageTemplate from '@/components/treatments/TreatmentPageTemplate'
import JsonLd from '@/components/seo/JsonLd'
import { SITE_URL } from '@/lib/site'

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const t = getTreatmentBySlug(slug)
  if (!t) return {}
  const url = `${SITE_URL}/leistungen/${t.slug}`
  return {
    title: `${t.name} München`,
    description: `${t.benefit} — ${t.description[0]} Jetzt kostenlose Erstberatung bei Heilpraktikerin Anna Berger in München vereinbaren.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${t.name} München | Anna Berger Heilpraktikerin`,
      description: `${t.benefit} — ${t.shortDescription}. Naturheilkundliche Behandlung in München.`,
      url,
    },
  }
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const treatment = getTreatmentBySlug(slug)
  if (!treatment) notFound()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Leistungen', item: `${SITE_URL}/#leistungen` },
      { '@type': 'ListItem', position: 3, name: treatment.name, item: `${SITE_URL}/leistungen/${treatment.slug}` },
    ],
  }

  const medicalWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: `${treatment.name} München`,
    description: treatment.description[0],
    url: `${SITE_URL}/leistungen/${treatment.slug}`,
    about: {
      '@type': 'MedicalTherapy',
      name: treatment.name,
      description: treatment.description[0],
    },
    author: {
      '@type': 'Person',
      name: 'Anna Berger',
      jobTitle: 'Heilpraktikerin',
    },
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={medicalWebPageSchema} />
      <TreatmentPageTemplate treatment={treatment} />
    </>
  )
}
