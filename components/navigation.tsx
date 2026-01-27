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
      <div ref={topRef} className="fixed top-8 right-8 z-[100]">
        <button className="px-6 py-2 rounded-full border border-zinc-800 bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-all duration-300 shadow-md">
          Contact
        </button>
      </div>

      {/* Bottom Center Nav */}
      <div ref={bottomRef} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
        <nav className="flex items-center gap-2 px-2 py-2 rounded-full border border-zinc-800 bg-zinc-900 shadow-lg">
           {['Work', 'About', 'Stack', 'Notes'].map((item) => (
             <button 
               key={item}
               className="px-5 py-2 rounded-full text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-300"
             >
               {item}
             </button>
           ))}
        </nav>
      </div>
    </>,
    document.body
  )
}
