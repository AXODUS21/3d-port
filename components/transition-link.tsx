'use client'

import { useRouter } from 'next/navigation'
import { useTransitionStore } from '@/lib/transition-store'
import { MouseEvent, ReactNode } from 'react'

interface TransitionLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export default function TransitionLink({ href, children, className }: TransitionLinkProps) {
  const router = useRouter()
  const { startTransition } = useTransitionStore()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Start the transition animation
    startTransition()
    
    // Check if there's a hash in the URL
    const hasHash = href.includes('#')
    const [path, hash] = href.split('#')
    
    if (hasHash && hash) {
      // Store the hash in sessionStorage for the target page to handle
      sessionStorage.setItem('pendingHashScroll', hash)
      console.log('Stored hash for scrolling:', hash)
    }
    
    // Wait for the animation to cover the screen, then navigate
    setTimeout(() => {
      router.push(path || href)
    }, 400) // Half of the transition duration to navigate when screen is covered
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  )
}
