'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const TransitionStripTwo = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Vertical Parallax Speeds
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"])
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])
  const y4 = useTransform(scrollYProgress, [0, 1], ["-30%", "10%"])

  const Column = ({ title, y, opacity = "opacity-100" }: { title: string, y: any, opacity?: string }) => (
    <div className="relative h-full overflow-hidden flex flex-col items-center justify-start border-r border-zinc-900 last:border-r-0">
        <motion.div style={{ y }} className={`flex flex-col gap-8 py-8 ${opacity}`}>
            {Array(20).fill(title).map((text, i) => (
                <span key={i} className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-zinc-900 select-none writing-vertical-rl">
                    {text}
                </span>
            ))}
        </motion.div>
    </div>
  )
  
  // Revised: Horizontal words stacked vertically looks better than vertical text
  const ColumnStacked = ({ words, y, className }: { words: string[], y: any, className?: string }) => (
      <div className={`relative h-full overflow-hidden flex flex-col items-center border-r border-zinc-800/50 group ${className}`}>
           <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/20 transition-colors duration-500" />
           <motion.div style={{ y }} className="flex flex-col gap-0 items-center justify-center">
                {Array(15).fill(words).flat().map((word, i) => (
                    <span key={i} className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-zinc-800 to-zinc-900/50 py-2 select-none leading-[0.85]">
                        {word}
                    </span>
                ))}
           </motion.div>
      </div>
  )

  return (
    <section ref={containerRef} className="h-[60vh] md:h-[80vh] bg-zinc-950 overflow-hidden relative border-y border-zinc-900 z-10">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 h-full w-full">
             <ColumnStacked words={["DEPLOY", "SHIP", "PUSH"]} y={y1} />
             <ColumnStacked words={["SCALE", "GROWTH", "UP"]} y={y2} className="hidden md:flex bg-zinc-900/20" />
             <ColumnStacked words={["SECURE", "FAST", "SAFE"]} y={y3} />
             <ColumnStacked words={["GLOBAL", "REACH", "NOW"]} y={y4} className="bg-zinc-900/10" />
        </div>

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-transparent to-zinc-950 pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-[10vw] font-black tracking-tighter text-white mix-blend-overlay opacity-50 blur-[2px]">
                IMPACT
            </h2>
        </div>
    </section>
  )
}

export default TransitionStripTwo
