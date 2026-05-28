'use client'
import { createContext, useContext, useState } from 'react'

type BookingModalContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const BookingModalContext = createContext<BookingModalContextType | null>(null)

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <BookingModalContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </BookingModalContext.Provider>
  )
}

export function useBookingModal() {
  const ctx = useContext(BookingModalContext)
  if (!ctx) throw new Error('useBookingModal must be used inside BookingModalProvider')
  return ctx
}
