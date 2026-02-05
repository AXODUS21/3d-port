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

    let reqId: number; // Store the animation frame ID

    function raf(time: number) {
      lenisInstance.raf(time)
      reqId = requestAnimationFrame(raf) // Capture the ID
    }

    reqId = requestAnimationFrame(raf) // Capture the initial ID

    return () => {
       cancelAnimationFrame(reqId) // STOP the loop!
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

