'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    text: "The 3D interactions drastically improved our user engagement metrics. The attention to detail in the animations is simply world-class.",
    author: "Sarah Jenning",
    role: "Product Director",
    company: "Vertex Labs",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    text: "Absolutely mind-blowing technical execution. The transition from the loading state to the hero section is the smoothest I've ever seen on the web.",
    author: "Marcus Chen",
    role: "CTO",
    company: "Nebula Stream",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    text: "A true master of WebGL. Delivered a complex particle system that runs at 60fps on mobile. Hired for three more projects immediately after.",
    author: "Elena Rodriguez",
    role: "Founder",
    company: "Prism Digital",
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 4,
    text: "The design system built for us was scalable, beautiful, and easy to maintain. A perfect blend of engineering and artistic vision.",
    author: "David Kim",
    role: "VP of Engineering",
    company: "Flux OS",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    id: 5,
    text: "We needed a site that stood out in the crowded DeFi space. The result was a dark-mode masterpiece that investors literally called 'sexy'.",
    author: "James Thorne",
    role: "Co-Founder",
    company: "Aether Finance",
    gradient: "from-blue-600 to-indigo-600"
  }
]

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const cursorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Initialize GSAP state to avoid Tailwind conflicts
        if (cursorRef.current) {
            gsap.set(cursorRef.current, {
                xPercent: -50,
                yPercent: -50,
                scale: 0,
                opacity: 0
            })
        }

        // Move cursor logic
        const moveCursor = (e: MouseEvent) => {
            if (!cursorRef.current || !containerRef.current) return
            
            const rect = containerRef.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            gsap.to(cursorRef.current, {
                x: x,
                y: y,
                duration: 0.6,
                ease: "power3.out",
                overwrite: "auto"
            })
        }

        const container = containerRef.current
        if (container) {
            container.addEventListener('mousemove', moveCursor)
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', moveCursor)
            }
        }
    }, [])

    useEffect(() => {
        if (!cursorRef.current) return

        if (activeIndex !== null) {
            // Scale up and show content
            gsap.to(cursorRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
                overwrite: "auto"
            })
        } else {
            // Scale down and hide
            gsap.to(cursorRef.current, {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power3.out",
                overwrite: "auto"
            })
        }
    }, [activeIndex])

  return (
    <section 
        ref={containerRef} 
        id="testimonials" 
        className="relative min-h-screen bg-zinc-950 text-white py-32 px-8 overflow-hidden cursor-default md:cursor-none"
    >
        {/* Section Title */}
        <div className="max-w-7xl mx-auto mb-20 border-b border-zinc-800 pb-8 flex items-baseline justify-between">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-100">
                CLIENT STORIES
            </h2>
            <span className="text-zinc-500 font-mono hidden md:inline-block">
                (HOVER TO REVEAL)
            </span>
        </div>

        {/* The List */}
        <div className="max-w-7xl mx-auto flex flex-col">
            {testimonials.map((t, index) => (
                <div 
                    key={t.id}
                    className="group relative border-b border-zinc-800 py-12 transition-colors hover:bg-zinc-900/30 cursor-pointer"
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 z-10 relative pointer-events-none">
                        <div className="text-3xl md:text-5xl font-bold text-zinc-500 group-hover:text-white transition-colors duration-500">
                            {t.company}
                        </div>
                        <div className="flex items-center gap-4 text-zinc-600 group-hover:text-zinc-400 transition-colors duration-500">
                            <span className="text-sm md:text-lg">{t.author}</span>
                            <span className="w-1 h-1 bg-current rounded-full" />
                            <span className="text-sm md:text-lg">{t.role}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* The Floating Reveal Lens */}
        <div 
            ref={cursorRef}
            className="pointer-events-none absolute top-0 left-0 w-[400px] h-[300px] z-50 origin-center hidden md:block"
        >
             {/* Dynamic Content Inside Bubble */}
             <div className="w-full h-full relative">
                {testimonials.map((t, index) => (
                    <div 
                        key={t.id}
                        className={`absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-br ${t.gradient} rounded-3xl transition-opacity duration-300 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}
                    >
                         <p className="text-xl md:text-2xl font-medium text-white leading-relaxed text-center drop-shadow-md">
                            "{t.text}"
                         </p>
                         
                         {/* Decorative quote mark bg */}
                         <div className="absolute top-4 left-6 text-white/20 text-8xl font-serif leading-none">
                            &ldquo;
                         </div>
                    </div>
                ))}
             </div>
        </div>

    </section>
  )
}

export default Testimonials
