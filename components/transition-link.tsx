'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useTransitionStore } from '@/lib/transition-store'
import { MouseEvent, ReactNode } from 'react'

interface TransitionLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export default function TransitionLink({ href, children, className }: TransitionLinkProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { startTransition } = useTransitionStore()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Check if there's a hash in the URL
    const hasHash = href.includes('#')
    const [path, hash] = href.split('#')

    // logic to determine if we should wait for content load (pathname change)
    let shouldWait = false
    if (path) {
        // Simple comparison. If path is "/work" and pathname is "/work", we don't wait.
        // We assume paths starting with / are absolute. 
        const targetPath = path.startsWith('/') ? path : `/${path}` 
        
        // Normalize paths by removing trailing slashes for comparison
        const normalizedTarget = targetPath.endsWith('/') && targetPath.length > 1 ? targetPath.slice(0, -1) : targetPath
        const normalizedCurrent = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname

        if (normalizedTarget !== normalizedCurrent) {
            shouldWait = true
        }
    }
    
    // Start the transition animation
    startTransition(shouldWait)
    
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
