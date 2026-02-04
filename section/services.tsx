'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLenis } from '@/components/smooth-scroll'
import TransitionLink from '@/components/transition-link'

const services = [
  {
    id: "01",
    menuTitle: "Brand Design",
    title: "Brand identity\n& structure",
    description: "We build distinct brand identities that resonate with your audience. From logo design to comprehensive style guides, we ensure your brand communicates its value clearly and consistently across all touchpoints.",
    bgClass: "bg-zinc-900",
    image: "/services/brand.jpg"
  },
  {
    id: "02",
    menuTitle: "UI/UX Design",
    title: "User Interface\n& Experience",
    description: "Designing intuitive and aesthetically pleasing user interfaces that drive engagement. We prioritize user journey and accessibility above all to create seamless digital experiences.",
    bgClass: "bg-zinc-800",
    image: "/services/ui.jpg"
  },
  {
    id: "03",
    menuTitle: "Web Development",
    title: "Front-end/\nCMS development",
    description: "We implement optimized code without compromising beautiful design. We provide immersive experiences with 3D and animations while achieving high Core Web Vitals scores. We offer sustainable front-end development that balances customer satisfaction and SEO.",
    bgClass: "bg-neutral-900",
    image: "/services/webdev.jpg"
  },
  {
    id: "04",
    menuTitle: "3D & Motion",
    title: "3D animation and\nmotion graphics",
    description: "We create immersive worldviews using advanced technologies such as WebGL, AR, and Infographics. We enhance brand experiences through stunning creative content. We offer consistent support from planning to production enabling us to deliver results that directly connect to your business goals.",
    bgClass: "bg-stone-900",
    image: "/services/3d.jpg"
  }
]

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()
  
  // Motion value to track scroll progress (0 to 1)
  const scrollYProgress = useMotionValue(0)
  
  // Transform scroll progress to vertical translation for text (0% to -300%)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `-${(services.length - 1) * 100}%`])
  
  // Create individual background transforms for stacking effect
  // Each subsequent image slides down (-100% -> 0%) over the previous one
  const bgTransforms = services.map((_, i) => {
    // First image stays fixed
    if (i === 0) return useTransform(scrollYProgress, [0, 1], ["0%", "0%"])
    
    const start = (i - 1) / (services.length - 1)
    const end = i / (services.length - 1)
    return useTransform(scrollYProgress, [start, end], ["-100%", "0%"])
  })

  useEffect(() => {
    // Shared scroll handler
    const updateScroll = () => {
        if (!containerRef.current) return

        const { top, height } = containerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        const scrollDistance = -top
        const sectionHeight = height - windowHeight

        // Calculate continuous progress
        const progress = Math.max(0, Math.min(1, scrollDistance / sectionHeight))
        
        // Update framer motion value directly for smooth animation
        scrollYProgress.set(progress)

        // Calculate discrete index for background/nav
        const rawIndex = Math.floor(progress * services.length)
        const clampedIndex = Math.max(0, Math.min(services.length - 1, rawIndex))
        
        setActiveIndex(clampedIndex)
    }

    if (lenis) {
       lenis.on('scroll', updateScroll)
       updateScroll() // Initial check
       return () => {
           lenis.off('scroll', updateScroll)
       }
    } else {
       window.addEventListener('scroll', updateScroll)
       updateScroll()
       return () => window.removeEventListener('scroll', updateScroll)
    }
  }, [lenis, scrollYProgress])

  return (
    <section 
      ref={containerRef} 
      id="services" 
      className="relative bg-black"
      // Height allows for scrolling through all items
      style={{ height: `${services.length * 100 + 50}vh` }} 
    >
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        
        {/* Background Layer - Stacking Parallax */}
        <div className="absolute inset-0 -z-10 bg-black overflow-hidden">
            {services.map((service, i) => (
                <motion.div 
                    key={service.id}
                    className="absolute inset-0 w-full h-full"
                    style={{ y: bgTransforms[i], zIndex: i }}
                >
                     <img 
                        src={service.image}
                        alt={service.menuTitle}
                        className="w-full h-full object-cover blur-sm scale-105 opacity-80"
                     />
                </motion.div>
            ))}
            
            {/* Static Overlays - Always on top of images */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className={`absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10`} />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 w-full h-full p-4 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-[1920px] mx-auto">
            
            {/* Left Column: Title & Logic */}
            <div className="lg:col-span-4 h-full flex flex-col justify-between py-12 lg:py-8 pl-4 lg:pl-0">
                
                {/* Section Title */}
                <div>
                     <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-white font-mono tracking-[0.2em] text-sm uppercase">Service</span>
                     </div>
                     <h2 className="text-5xl md:text-7xl font-bold font-mono text-white tracking-widest mt-4">
                        service
                     </h2>
                </div>

                {/* Navigation List */}
                <div className="hidden lg:flex flex-col gap-6 mt-auto">
                    {services.map((service, index) => {
                        const isActive = activeIndex === index
                        return (
                            <motion.div 
                                key={service.id}
                                className="flex items-center gap-4 cursor-pointer group"
                                initial={false}
                                animate={{ opacity: isActive ? 1 : 0.5, x: isActive ? 10 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="w-2 relative flex items-center justify-center">
                                    {isActive && (
                                        <motion.div 
                                            layoutId="activeServiceDot"
                                            className="w-2 h-2 bg-white rounded-full absolute"
                                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        />
                                    )}
                                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                                </div>
                                
                                <span className={`text-xs font-mono tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
                                    {service.menuTitle}
                                </span>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* Center/Right Column: Active Card */}
            <div className="lg:col-span-8 flex justify-center lg:justify-start items-center h-full">
                
                <div className="relative bg-white text-black w-full max-w-sm aspect-3/4 md:aspect-4/5 lg:aspect-3/4 lg:max-h-[500px] shadow-2xl overflow-hidden flex flex-col">
                    
                    {/* Floating Content Container */}
                    <div className="flex-1 relative overflow-hidden">
                        
                        {/* The scrolling stack */}
                        <motion.div 
                            className="absolute top-0 left-0 w-full h-full"
                            style={{ y }} 
                        >
                            {services.map((service) => (
                                <div 
                                    key={service.id}
                                    className="w-full h-full p-8 md:p-12 flex flex-col justify-start pt-16" // pt-16 to give space from top
                                >
                                     {/* Category */}
                                    <div className="flex items-center gap-2 mb-6 shrink-0">
                                        <div className="w-1.5 h-1.5 bg-black rounded-full" />
                                        <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase opacity-70">
                                            {service.menuTitle}
                                        </span>
                                    </div>
                                    
                                    {/* Main Title */}
                                    <h3 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight whitespace-pre-line mb-6 shrink-0">
                                        {service.title}
                                    </h3>

                                     {/* Description */}
                                    <p className="text-sm md:text-base leading-relaxed text-zinc-600 font-normal text-justify">
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                        
                    </div>

                    {/* Bottom Action Button - Static */}
                    <div className="p-8 pt-0 flex justify-end relative z-10 bg-white/0"> 
                       <TransitionLink 
                            href={`/service/${services[activeIndex].id}`}
                            className="bg-black text-white p-4 hover:bg-zinc-800 transition-colors duration-300 z-20 cursor-pointer inline-flex items-center justify-center"
                       >
                            <ArrowRight className="w-5 h-5" />
                        </TransitionLink>
                    </div>

                </div>

            </div>

        </div>

      </div>
    </section>
  )
}

export default Services
