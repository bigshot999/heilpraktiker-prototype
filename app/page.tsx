import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import TrustBar from '@/components/home/TrustBar'
import PainPoints from '@/components/home/PainPoints'
import AboutTeaser from '@/components/home/AboutTeaser'
import TreatmentsGrid from '@/components/home/TreatmentsGrid'
import HowItWorks from '@/components/home/HowItWorks'
import TestimonialsSlider from '@/components/home/TestimonialsSlider'
import FaqTeaser from '@/components/home/FaqTeaser'
import BookingCtaSection from '@/components/home/BookingCtaSection'
import { SITE_URL, SITE_DESCRIPTION } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Anna Berger — Heilpraktikerin München | Naturheilkunde & Ganzheitsmedizin',
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <PainPoints />
      <AboutTeaser />
      <TreatmentsGrid />
      <HowItWorks />
      <TestimonialsSlider />
      <FaqTeaser />
      <BookingCtaSection />
    </>
  )
}
