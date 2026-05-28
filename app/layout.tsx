import type { Metadata } from 'next'
import { Cormorant_Garamond, Raleway } from 'next/font/google'
import './globals.css'
import { BookingModalProvider } from '@/context/BookingModalContext'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import BookingModal from '@/components/booking/BookingModal'
import JsonLd from '@/components/seo/JsonLd'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/site'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-raleway',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Anna Berger — Heilpraktikerin München',
    template: '%s | Anna Berger Heilpraktikerin München',
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Anna Berger — Heilpraktikerin München',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anna Berger — Heilpraktikerin für Naturheilkunde & Ganzheitsmedizin in München',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anna Berger — Heilpraktikerin München',
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  alternates: { canonical: SITE_URL },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'MedicalBusiness'],
  name: 'Naturheilpraxis Anna Berger',
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  telephone: '+4989123456789',
  email: 'praxis@anna-berger.de',
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Musterstraße 12',
    addressLocality: 'München',
    postalCode: '80331',
    addressRegion: 'Bayern',
    addressCountry: 'DE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 48.137154,
    longitude: 11.576124,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  employee: {
    '@type': 'Person',
    name: 'Anna Berger',
    jobTitle: 'Heilpraktikerin',
  },
  hasMap: `https://maps.google.com/?q=Musterstraße+12,+80331+München`,
  sameAs: [],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${cormorant.variable} ${raleway.variable}`}>
      <body>
        <JsonLd data={localBusinessSchema} />
        <BookingModalProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <BookingModal />
        </BookingModalProvider>
      </body>
    </html>
  )
}
