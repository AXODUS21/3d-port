import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

export const Navigation = ({ topRef, bottomRef }: { topRef: React.RefObject<HTMLDivElement | null>, bottomRef: React.RefObject<HTMLDivElement | null> }) => {
  const [mounted, setMounted] = useState(false)
  const [showContact, setShowContact] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setShowContact(window.scrollY > window.innerHeight * 0.5)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  return createPortal(
    <>
      {/* Top Right CTA */}
      <div ref={topRef} className="fixed top-8 right-8 z-[100]">
        <button 
          onClick={() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group px-6 py-2 rounded-none border-[0.5px] border-white bg-zinc-950 text-white font-mono text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 cursor-pointer overflow-hidden relative"
        >
          <span className="relative z-10">Contact</span>
        </button>
      </div>

      {/* Bottom Center Nav */}
      <div ref={bottomRef} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
        <nav className="flex items-center gap-1 p-1 bg-zinc-950 pointer-events-auto transition-all duration-300">
           <button 
             onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} // "before animation even starts" implies instant jump or very fast? User said "all the way to the top before the animation even starts". smooth might trigger animation. instant is safer for "reset".
             className="px-6 py-2 bg-transparent font-mono text-xs uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer border-[0.5px] border-white ring-0 outline-none"
           >
             Home
           </button>

           {[
             { name: 'Projects', id: 'work' },
             { name: 'Services', id: 'services' },
             { name: 'Testimonials', id: 'testimonials' },
             { name: 'Skills', id: 'skills' },
           ].map((item) => (
             <button 
               key={item.name}
               onClick={() => {
                 document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
               }}
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
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="py-2 bg-transparent font-mono text-xs uppercase tracking-wider text-white hover:bg-white hover:text-black cursor-pointer border-[0.5px] border-white ring-0 outline-none overflow-hidden whitespace-nowrap"
                >
                  Contact
                </motion.button>
             )}
           </AnimatePresence>
        </nav>
      </div>
    </>,
    document.body
  )
}
