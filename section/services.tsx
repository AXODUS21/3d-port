'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLenis } from '@/components/smooth-scroll'

const services = [
  {
    id: "01",
    menuTitle: "Brand Design",
    title: "Brand identity\n& structure",
    description: "We build distinct brand identities that resonate with your audience. From logo design to comprehensive style guides, we ensure your brand communicates its value clearly and consistently across all touchpoints.",
    bgClass: "bg-zinc-900" 
  },
  {
    id: "02",
    menuTitle: "UI/UX Design",
    title: "User Interface\n& Experience",
    description: "Designing intuitive and aesthetically pleasing user interfaces that drive engagement. We prioritize user journey and accessibility above all to create seamless digital experiences.",
    bgClass: "bg-zinc-800"
  },
  {
    id: "03",
    menuTitle: "Web Development",
    title: "Front-end/\nCMS development",
    description: "We implement optimized code without compromising beautiful design. We provide immersive experiences with 3D and animations while achieving high Core Web Vitals scores. We offer sustainable front-end development that balances customer satisfaction and SEO.",
    bgClass: "bg-neutral-900"
  },
  {
    id: "04",
    menuTitle: "3D & Motion",
    title: "3D animation and\nmotion graphics",
    description: "We create immersive worldviews using advanced technologies such as WebGL, AR, and Infographics. We enhance brand experiences through stunning creative content. We offer consistent support from planning to production enabling us to deliver results that directly connect to your business goals.",
    bgClass: "bg-stone-900"
  }
]

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()
  
  // Motion value to track scroll progress (0 to 1)
  const scrollYProgress = useMotionValue(0)
  
  // Transform scroll progress to vertical translation (0% to -300%)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `-${(services.length - 1) * 100}%`])

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
        
        {/* Background Layer - retained snap/fade effect */}
        <div className="absolute inset-0 -z-10">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeIndex}
              className={`absolute inset-0 ${services[activeIndex].bgClass}`}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }} 
            >
                 <div className="absolute inset-0 opacity-20" 
                      style={{ 
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
                      }} 
                 />
                 <div className={`absolute inset-0 bg-linear-to-t from-black/80 to-transparent`} />
            </motion.div>
          </AnimatePresence>
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
                
                <div className="relative bg-white text-black w-full max-w-md aspect-3/4 md:aspect-4/5 lg:aspect-3/4 lg:max-h-[600px] shadow-2xl overflow-hidden flex flex-col">
                    
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
                    {/* bg-white/0 because it's over the white card bg. If the scrolling content text overlaps, we might need gradient or solid bg for button area. 
                        Given the design, let's keep it simple. If text overlaps, user might want fading mask. 
                        For now, assuming text fits within the 'page' or slides behind.
                    */}
                       <button className="bg-black text-white p-4 hover:bg-zinc-800 transition-colors duration-300 z-20">
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                </div>

            </div>

        </div>

      </div>
    </section>
  )
}

export default Services
