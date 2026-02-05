'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
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

  return (
    <section 
      id="services" 
      className="relative bg-black py-20 md:py-32"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-white font-mono tracking-[0.2em] text-sm uppercase">Service</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold font-mono text-white tracking-widest">
            service
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index}
              isActive={activeIndex === index}
              onHover={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
  isActive: boolean;
  onHover: () => void;
}

function ServiceCard({ service, index, isActive, onHover }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={onHover}
      className="group relative aspect-[4/5] overflow-hidden cursor-pointer"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: isActive ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <img 
            src={service.image}
            alt={service.menuTitle}
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
        {/* Top: Number & Category */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/70">
              {service.menuTitle}
            </span>
          </div>
          <span className="text-xs font-mono text-white/50 tabular-nums">
            {service.id}
          </span>
        </div>

        {/* Middle: Title */}
        <div>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight whitespace-pre-line text-white mb-4">
            {service.title}
          </h3>
          
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isActive ? 1 : 0, 
              height: isActive ? "auto" : 0 
            }}
            transition={{ duration: 0.3 }}
            className="text-sm leading-relaxed text-zinc-300 overflow-hidden"
          >
            {service.description}
          </motion.p>
        </div>

        {/* Bottom: Action Button */}
        <div className="flex justify-end">
          <TransitionLink 
            href={`/service/${service.id}`}
            className="w-12 h-12 bg-white text-black hover:bg-zinc-200 transition-colors flex items-center justify-center group/btn"
          >
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </TransitionLink>
        </div>
      </div>

      {/* Border on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        className="absolute inset-0 border-2 border-white/20 pointer-events-none"
      />
    </motion.div>
  )
}

export default Services
