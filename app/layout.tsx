import type { Metadata } from 'next'
import { Cormorant_Garamond, Raleway } from 'next/font/google'
import './globals.css'
import { BookingModalProvider } from '@/context/BookingModalContext'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import BookingModal from '@/components/booking/BookingModal'

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
  title: 'Anna Berger — Heilpraktikerin München',
  description: 'Naturheilkunde & Ganzheitsmedizin in München. Kostenlose Erstberatung.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${cormorant.variable} ${raleway.variable}`}>
      <body>
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
