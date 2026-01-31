'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'

// Create a context for the Lenis instance
const LenisContext = createContext<Lenis | null>(null)

// Custom hook to use Lenis instance
export const useLenis = () => useContext(LenisContext)

export const SmoothScroll = ({ children }: { children?: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
    })

    setLenis(lenisInstance)

    function raf(time: number) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
       lenisInstance.destroy()
       setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}

