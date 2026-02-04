'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLenis } from '@/components/smooth-scroll'

export default function HashScrollHandler() {
  const router = useRouter()
  const lenis = useLenis()

  useEffect(() => {
    // Check if there's a pending hash scroll in sessionStorage
    const pendingHash = sessionStorage.getItem('pendingHashScroll')
    
    if (pendingHash) {
      // Wait for the page to fully render
      const scrollToHash = () => {
        // First scroll to top to ensure clean state
        if (!lenis) {
             window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
        }
        
        // Then scroll to target with retries
        let attempts = 0
        const maxAttempts = 10 // Increase attempts (500ms total retry time)
        
        const tryScroll = () => {
          const element = document.getElementById(pendingHash)
          if (element) {
            if (lenis) {
                // Use Lenis for accurate scrolling if available
                lenis.resize() // Force recalculation of page height
                lenis.scrollTo(element, { immediate: true, force: true })
            } else {
                const y = element.getBoundingClientRect().top + window.pageYOffset
                window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior })
            }
            // Clear storage only after successful scroll attempt
            sessionStorage.removeItem('pendingHashScroll')
          } else {
            attempts++
            if (attempts < maxAttempts) {
              setTimeout(tryScroll, 100)
            } else {
                // Failed to find element after retries, clear anyway
                sessionStorage.removeItem('pendingHashScroll')
            }
          }
        }
        
        setTimeout(tryScroll, 100)
      }
      
      // Scroll at 1000ms to ensure transition is complete and layout is stable
      setTimeout(scrollToHash, 1000)
    }
  }, [lenis])

  return null
}
