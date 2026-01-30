'use client'

import { useEffect } from 'react'
import { useTransitionStore } from '@/lib/transition-store'

export default function TransitionOverlay() {
  const { isTransitioning, endTransition } = useTransitionStore()

  useEffect(() => {
    if (isTransitioning) {
      // End transition after animation completes
      const timer = setTimeout(() => {
        endTransition()
      }, 1000) // Match this with animation duration

      return () => clearTimeout(timer)
    }
  }, [isTransitioning, endTransition])

  return (
    <>
      {/* Slide-in overlay from top */}
      <div
        className={`fixed inset-0 z-9999 bg-zinc-950 transition-transform duration-700 ease-in-out ${
          isTransitioning ? 'translate-y-0' : '-translate-y-full'
        }`}
      />
      {/* Slide-in overlay from bottom */}
      <div
        className={`fixed inset-0 z-9998 bg-zinc-900 transition-transform duration-700 ease-in-out delay-75 ${
          isTransitioning ? 'translate-y-0' : 'translate-y-full'
        }`}
      />
    </>
  )
}
