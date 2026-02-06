import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export const Navigation = ({ topRef, bottomRef }: { topRef: React.RefObject<HTMLDivElement | null>, bottomRef: React.RefObject<HTMLDivElement | null> }) => {
  const [mounted, setMounted] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    const handleScroll = () => {
      setShowContact(window.scrollY > window.innerHeight * 0.5)
    }

    handleResize()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!mounted) return null

  const navItems = [
    { name: 'Projects', id: 'work' },
    { name: 'Services', id: 'services' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Skills', id: 'skills' },
  ]

  const handleNavClick = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return createPortal(
    <>
      {/* Top Right CTA - Desktop */}
      {!isMobile && (
        <div ref={topRef} className="fixed top-8 right-8 z-[100]">
          <button 
            onClick={() => handleNavClick('contact')}
            className="group px-6 py-2 rounded-none border-[0.5px] border-white bg-zinc-950 text-white font-mono text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 cursor-pointer overflow-hidden relative"
          >
            <span className="relative z-10">Contact</span>
          </button>
        </div>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <div className="fixed top-4 right-4 z-[101]">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-3 bg-zinc-950 border border-white/20 text-white hover:bg-white hover:text-black transition-all"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100]"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-64 bg-zinc-950 border-l border-white/20 p-6 flex flex-col gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => handleNavClick('home')}
                className="px-4 py-3 bg-transparent font-mono text-sm uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all border border-white/20 text-left"
              >
                Home
              </button>

              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.id)}
                  className="px-4 py-3 bg-transparent font-mono text-sm uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all border border-white/20 text-left"
                >
                  {item.name}
                </button>
              ))}

              <button
                onClick={() => handleNavClick('contact')}
                className="px-4 py-3 bg-white text-black font-mono text-sm uppercase tracking-wider hover:bg-zinc-900 hover:text-white transition-all border border-white text-left mt-4"
              >
                Contact
              </button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Center Nav - Desktop Only */}
      {!isMobile && (
        <div ref={bottomRef} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
          <nav className="flex items-center gap-1 p-1 bg-zinc-950 pointer-events-auto transition-all duration-300">
            <button 
              onClick={() => handleNavClick('home')}
              className="px-6 py-2 bg-transparent font-mono text-xs uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer border-[0.5px] border-white ring-0 outline-none"
            >
              Home
            </button>

            {navItems.map((item) => (
              <button 
                key={item.name}
                onClick={() => handleNavClick(item.id)}
                className="px-6 py-2 bg-transparent font-mono text-xs uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer border-[0.5px] border-white ring-0 outline-none"
              >
                {item.name}
              </button>
            ))}
            
            <AnimatePresence>
              {showContact && (
                <motion.button 
                  initial={{ opacity: 0, width: 0, paddingLeft: 0, paddingRight: 0 }}
                  animate={{ opacity: 1, width: "auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
                  exit={{ opacity: 0, width: 0, paddingLeft: 0, paddingRight: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  onClick={() => handleNavClick('contact')}
                  className="py-2 bg-transparent font-mono text-xs uppercase tracking-wider text-white hover:bg-white hover:text-black cursor-pointer border-[0.5px] border-white ring-0 outline-none overflow-hidden whitespace-nowrap"
                >
                  Contact
                </motion.button>
              )}
            </AnimatePresence>
          </nav>
        </div>
      )}
    </>,
    document.body
  )
}
