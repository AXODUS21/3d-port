'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HashScrollHandler() {
  const router = useRouter()

  useEffect(() => {
    // Check if there's a pending hash scroll in sessionStorage
    const pendingHash = sessionStorage.getItem('pendingHashScroll')
    
    if (pendingHash) {
      // Clear it immediately
      sessionStorage.removeItem('pendingHashScroll')
      
      // Wait for the page to fully render and transition to complete
      const scrollToHash = () => {
        // First scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
        
        // Then scroll to target after a brief delay
        setTimeout(() => {
          const element = document.getElementById(pendingHash)
          if (element) {
            const yOffset = 0 // No offset needed
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
            
            window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior })
            
            console.log('Scrolled to:', pendingHash, 'at position:', y)
          } else {
            console.error('Element not found:', pendingHash)
          }
        }, 100)
      }
      
      // Wait for transition overlay to complete (1000ms) + buffer
      setTimeout(scrollToHash, 1200)
    }
  }, [])

  return null
}
