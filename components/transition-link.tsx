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
    
    // Wait for the animation to cover the screen, then navigate
    setTimeout(() => {
      router.push(href)
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
