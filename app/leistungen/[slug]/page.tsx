import { notFound } from 'next/navigation'
import { treatments, getTreatmentBySlug } from '@/lib/treatments'
import TreatmentPageTemplate from '@/components/treatments/TreatmentPageTemplate'

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const t = getTreatmentBySlug(slug)
  if (!t) return {}
  return { title: `${t.name} | Anna Berger Heilpraktikerin`, description: t.benefit }
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const treatment = getTreatmentBySlug(slug)
  if (!treatment) notFound()
  return <TreatmentPageTemplate treatment={treatment} />
}
