'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const TransitionStrip = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Differential speeds for parallax feel
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) // Huge text moves slower visually due to size, but covers distance
  const x2 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]) // Middle data stream moves opposite
  const x3 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]) // Bottom huge text

  return (
    <section ref={containerRef} className="py-40 md:py-64 bg-zinc-950 overflow-hidden relative border-y border-zinc-900 flex flex-col justify-center gap-12 md:gap-24">
        
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-50" />
        <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-transparent to-zinc-950 pointer-events-none" />

        {/* Row 1: Massive Hollow/Dark Text */}
        <div className="relative flex items-center whitespace-nowrap overflow-hidden rotate-[-2deg] scale-110">
            <motion.div style={{ x: x1 }} className="flex gap-12 items-center text-7xl md:text-9xl font-black uppercase tracking-tighter text-zinc-900 pointer-events-none select-none leading-none">
                {Array(6).fill("Sys_Arch • Protocol • Grid • ").map((text, i) => (
                    <span key={i} className="shrink-0" style={{ WebkitTextStroke: '2px #27272a', color: 'transparent' }}>{text}</span>
                ))}
            </motion.div>
        </div>

        {/* Row 2: Tech Data Stream */}
        <div className="relative flex items-center w-full bg-zinc-900/50 border-y border-white/5 backdrop-blur-sm py-4 rotate-[1deg] z-10 scale-105">
             <motion.div style={{ x: x2 }} className="flex gap-8 items-center text-xs md:text-sm font-mono text-zinc-500 pointer-events-none select-none">
                {Array(12).fill("0x445A :: OPTIMIZED :: [RUNTIME_READY] :: 120FPS :: RENDER_PIPE :: ").map((text, i) => (
                    <span key={i} className={`shrink-0 ${i % 2 === 0 ? 'text-zinc-300' : 'text-zinc-600'}`}>{text}</span>
                ))}
            </motion.div>
        </div>

        {/* Row 3: Massive Filled Text */}
        <div className="relative flex items-center whitespace-nowrap overflow-hidden rotate-[-1deg] scale-110">
             <motion.div style={{ x: x3 }} className="flex gap-12 items-center text-7xl md:text-9xl font-black uppercase tracking-tighter text-zinc-800 pointer-events-none select-none leading-none">
                {Array(6).fill("Aesthetic • Performance • Scale • ").map((text, i) => (
                    <span key={i} className="shrink-0 text-zinc-800">{text}</span>
                ))}
            </motion.div>
        </div>
        
    </section>
  )
}

export default TransitionStrip
