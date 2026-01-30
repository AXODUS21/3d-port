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
      
      console.log('HashScrollHandler: Will scroll to', pendingHash)
      
      // Wait for the page to fully render
      const scrollToHash = () => {
        // First scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
        
        // Then scroll to target with retries
        let attempts = 0
        const maxAttempts = 5
        
        const tryScroll = () => {
          const element = document.getElementById(pendingHash)
          if (element) {
            const y = element.getBoundingClientRect().top + window.pageYOffset
            window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior })
            console.log('✅ Successfully scrolled to:', pendingHash, 'at position:', y)
          } else {
            attempts++
            console.log(`❌ Attempt ${attempts}: Element "${pendingHash}" not found yet`)
            if (attempts < maxAttempts) {
              setTimeout(tryScroll, 50)
            }
          }
        }
        
        setTimeout(tryScroll, 50)
      }
      
      // Scroll at 500ms (after 400ms nav + 100ms buffer) - still before 1000ms overlay
      setTimeout(scrollToHash, 500)
    }
  }, [])

  return null
}
