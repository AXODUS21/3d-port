'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useTransitionStore } from '@/lib/transition-store'

export default function TransitionOverlay() {
  const { isTransitioning, endTransition, shouldWaitForContent } = useTransitionStore()
  const pathname = usePathname()
  const [isMinDurationDone, setIsMinDurationDone] = useState(false)
  const prevPathname = useRef(pathname)

  // Track the path we started from
  useEffect(() => {
    if (!isTransitioning) {
      prevPathname.current = pathname
      setIsMinDurationDone(false)
    }
  }, [isTransitioning, pathname])

  useEffect(() => {
    if (isTransitioning) {
      // Minimum duration for the "enter" animation phase
      const timer = setTimeout(() => {
        setIsMinDurationDone(true)
      }, 700) 

      return () => {
        clearTimeout(timer)
      }
    }
  }, [isTransitioning, endTransition])

  useEffect(() => {
    if (isTransitioning && isMinDurationDone) {
      // Logic for ending the transition:
      // 1. If we shouldn't wait for content (e.g. same page), end immediately.
      // 2. If we SHOULD wait, check if the pathname has changed.
      if (!shouldWaitForContent || pathname !== prevPathname.current) {
        endTransition()
      }
    }
  }, [isTransitioning, isMinDurationDone, shouldWaitForContent, pathname, prevPathname, endTransition])

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
