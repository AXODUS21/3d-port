import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export const Navigation = ({ topRef, bottomRef }: { topRef: React.RefObject<HTMLDivElement | null>, bottomRef: React.RefObject<HTMLDivElement | null> }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return createPortal(
    <>
      {/* Top Right CTA */}
      {/* Top Right CTA */}
      {/* Top Right CTA */}
      <div ref={topRef} className="fixed top-8 right-8 z-[100]">
        <button 
          onClick={() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group px-6 py-2 rounded-none border-[0.5px] border-white bg-zinc-950 text-white font-mono text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 cursor-pointer pointer-events-auto overflow-hidden relative"
        >
          <span className="relative z-10">Contact</span>
        </button>
      </div>

      {/* Bottom Center Nav */}
      <div ref={bottomRef} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
        <nav className="flex items-center gap-1 p-1 bg-zinc-950 pointer-events-auto">
           {[
             { name: 'Projects', id: 'work' },
             { name: 'Experiences', id: 'experiences' },
             { name: 'Testimonials', id: 'testimonials' },
             { name: 'Skills', id: 'skills' },
             { name: 'Services', id: 'services' }
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
        </nav>
      </div>
    </>,
    document.body
  )
}
