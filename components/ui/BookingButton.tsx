'use client'
import { motion } from 'framer-motion'
import { useBookingModal } from '@/context/BookingModalContext'

type Props = {
  label?: string
  className?: string
  variant?: 'amber' | 'outline'
}

export default function BookingButton({ label = 'Kostenlos kennenlernen →', className = '', variant = 'amber' }: Props) {
  const { open } = useBookingModal()
  const base = 'rounded-full px-7 py-3 font-sans font-semibold text-sm cursor-pointer transition-shadow'
  const styles = variant === 'amber'
    ? `${base} bg-amber text-white shadow-[0_4px_14px_rgba(193,123,45,0.3)]`
    : `${base} border-2 border-forest text-forest`
  return (
    <motion.button
      onClick={open}
      className={`${styles} ${className}`}
      whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(193,123,45,0.45)' }}
      whileTap={{ scale: 0.98 }}
    >
      {label}
    </motion.button>
  )
}
