"use client";

import { useState, useRef, useEffect } from "react";
import { featuredProjects } from "./data";
import { motion, useMotionValue, animate } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransitionStore } from "@/lib/transition-store";

const ROTATION_UNIT = 360 / featuredProjects.length;

export default function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const rotation = useMotionValue(0);
  const isDragging = useRef(false);
  const dragStartRotation = useRef(0);

  // Responsive card dimensions
  const cardWidth = isMobile ? 320 : isTablet ? 500 : 650;
  const carouselRadius = isMobile ? 400 : isTablet ? 600 : 750;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const rotateCarousel = (direction: "next" | "prev") => {
    const newIndex = direction === "next" 
      ? (activeIndex + 1) % featuredProjects.length
      : (activeIndex - 1 + featuredProjects.length) % featuredProjects.length;
    
    setActiveIndex(newIndex);
    const targetRotation = -newIndex * ROTATION_UNIT;
    animate(rotation, targetRotation, {
      type: "spring",
      stiffness: 100,
      damping: 30
    });
  };

  const handleDragStart = () => {
    isDragging.current = false;
    dragStartRotation.current = rotation.get();
  };

  const handleDrag = () => {
    isDragging.current = true;
  };

  const handleDragEnd = () => {
    const currentRotation = rotation.get();
    const normalizedRotation = ((currentRotation % 360) + 360) % 360;
    const closestIndex = Math.round(-normalizedRotation / ROTATION_UNIT) % featuredProjects.length;
    const finalIndex = (closestIndex + featuredProjects.length) % featuredProjects.length;
    
    setActiveIndex(finalIndex);
    animate(rotation, -finalIndex * ROTATION_UNIT, {
      type: "spring",
      stiffness: 100,
      damping: 30
    });

    // Reset drag state after a short delay
    setTimeout(() => {
      isDragging.current = false;
    }, 100);
  };

  return (
    <section id="work" className="relative bg-black py-20 md:py-32 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Radial gradient vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
        
        {/* Animated noise texture */}
        <motion.div
          animate={{
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="mb-12 md:mb-16 lg:mb-20 text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 md:gap-4 mb-4 md:mb-6"
          >
            <motion.div 
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-8 md:w-16 h-px bg-gradient-to-r from-transparent via-white/50 to-white/50" 
            />
            <div className="flex items-center gap-1.5 md:gap-2">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-white/50" />
              <span className="text-[10px] md:text-sm font-mono text-white/50 tracking-[0.15em] md:tracking-[0.2em]">FEATURED WORK</span>
            </div>
            <motion.div 
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-8 md:w-16 h-px bg-gradient-to-l from-transparent via-white/50 to-white/50" 
            />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-3 md:mb-4"
          >
            Selected Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-white/40 font-mono text-xs md:text-sm tracking-wider"
          >
            {isMobile ? "Swipe to explore" : "Drag to explore • Click to view"}
          </motion.p>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] flex items-center justify-center perspective-[2000px]">
          {/* Enhanced Animated Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Multiple gradient orbs with different animations */}
            <motion.div
              animate={{
                x: isMobile ? [0, 50, -30, 0] : [0, 150, -100, 0],
                y: isMobile ? [0, -30, 20, 0] : [0, -80, 60, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`absolute top-1/4 left-1/4 ${isMobile ? 'w-64 h-64' : 'w-[500px] h-[500px]'} bg-purple-500/15 rounded-full blur-3xl`}
            />
            <motion.div
              animate={{
                x: isMobile ? [0, -40, 30, 0] : [0, -120, 80, 0],
                y: isMobile ? [0, 25, -20, 0] : [0, 70, -50, 0],
                scale: [1, 0.8, 1.3, 1],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`absolute bottom-1/4 right-1/4 ${isMobile ? 'w-64 h-64' : 'w-[500px] h-[500px]'} bg-blue-500/15 rounded-full blur-3xl`}
            />
            <motion.div
              animate={{
                x: isMobile ? [0, 35, -25, 0] : [0, 100, -80, 0],
                y: isMobile ? [0, -20, 15, 0] : [0, -60, 40, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-80 h-80' : 'w-[600px] h-[600px]'} bg-cyan-500/10 rounded-full blur-3xl`}
            />
            
            {/* Dynamic spotlight that follows active card */}
            <motion.div
              animate={{
                rotate: -activeIndex * ROTATION_UNIT,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div 
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`${isMobile ? 'w-96 h-80' : 'w-[900px] h-[700px]'} bg-white/10 rounded-full blur-3xl`}
              />
            </motion.div>
          </div>

          {/* Carousel */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            style={{
              rotateY: rotation,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full h-full cursor-grab active:cursor-grabbing"
          >
            {featuredProjects.map((project, index) => {
              const angle = index * ROTATION_UNIT;
              
              return (
                <CarouselCard
                  key={project.id}
                  project={project}
                  index={index}
                  angle={angle}
                  radius={carouselRadius}
                  cardWidth={cardWidth}
                  isActive={index === activeIndex}
                  isDragging={isDragging}
                  isMobile={isMobile}
                />
              );
            })}
          </motion.div>

          {/* Enhanced Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => rotateCarousel("prev")}
            className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 border-2 border-white/20 bg-black/50 backdrop-blur-md hover:bg-white hover:border-white text-white hover:text-black flex items-center justify-center transition-all group shadow-lg shadow-black/50"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, x: 4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => rotateCarousel("next")}
            className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 border-2 border-white/20 bg-black/50 backdrop-blur-md hover:bg-white hover:border-white text-white hover:text-black flex items-center justify-center transition-all group shadow-lg shadow-black/50"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Enhanced Dots Indicator */}
        <div className="flex items-center justify-center gap-2 md:gap-3 mt-8 md:mt-12">
          {featuredProjects.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setActiveIndex(index);
                animate(rotation, -index * ROTATION_UNIT, {
                  type: "spring",
                  stiffness: 100,
                  damping: 30
                });
              }}
              className="relative group"
            >
              <div className={`h-1 md:h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? "bg-white w-12 md:w-16 shadow-lg shadow-white/50" 
                  : "bg-white/20 w-6 md:w-10 group-hover:bg-white/40"
              }`} />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

interface CarouselCardProps {
  project: typeof featuredProjects[0];
  index: number;
  angle: number;
  radius: number;
  cardWidth: number;
  isActive: boolean;
  isDragging: React.MutableRefObject<boolean>;
  isMobile: boolean;
}

function CarouselCard({ project, index, angle, radius, cardWidth, isActive, isDragging, isMobile }: CarouselCardProps) {
  const router = useRouter();
  const { startTransition } = useTransitionStore();

  const handleClick = (e: React.MouseEvent) => {
    // Prevent navigation if user was dragging
    if (isDragging.current) {
      e.preventDefault();
      return;
    }

    // Only navigate if this is the active card
    if (!isActive) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    startTransition(true);
    setTimeout(() => {
      router.push(`/project/${project.id}`);
    }, 400);
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: `${cardWidth}px`,
        transformStyle: "preserve-3d",
        transform: `
          translate(-50%, -50%)
          rotateY(${angle}deg)
          translateZ(${radius}px)
        `,
      }}
      className="pointer-events-none"
    >
      <motion.div 
        onClick={handleClick}
        whileHover={isActive ? { y: -8 } : {}}
        className={`relative aspect-[16/10] pointer-events-auto ${isActive ? 'cursor-pointer' : 'cursor-default'}`}
      >
        {/* Card Content */}
        <div className="relative w-full h-full overflow-hidden bg-zinc-900 shadow-2xl shadow-black/80">
          {/* Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          {/* Themed accent overlay */}
          <div className={`absolute inset-0 ${project.accentColor}`} />
          {/* Enhanced gradient with more depth */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
          
          {/* Shine effect on hover */}
          {isActive && !isMobile && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
            />
          )}

          {/* Content Overlay */}
          <div className={`relative h-full flex flex-col justify-between ${isMobile ? 'p-4' : 'p-6 md:p-8'}`}>
            {/* Top: Number & Category */}
            <div className="flex items-center justify-between">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-1.5 md:gap-2"
              >
                <div className={`${isMobile ? 'w-1 h-1' : 'w-1.5 h-1.5'} bg-white rounded-full animate-pulse`} />
                <span className={`${isMobile ? 'text-[8px]' : 'text-[10px]'} font-mono tracking-[0.2em] uppercase text-white/90 font-bold`}>
                  {project.category}
                </span>
              </motion.div>
              <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-mono text-white/40 tabular-nums`}>
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Bottom: Title, Description, Tags, Year */}
            <div>
              <motion.h4 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.1 }}
                className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl lg:text-4xl'} font-black text-white mb-2 md:mb-3 tracking-tight`}
              >
                {project.title}
              </motion.h4>
              
              <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-white/80 mb-2 md:mb-4 line-clamp-2 leading-relaxed`}>
                {project.description}
              </p>

              <div className={`flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-4`}>
                {project.tags.slice(0, isMobile ? 2 : 3).map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 + i * 0.05 }}
                    className={`${isMobile ? 'px-1.5 py-0.5 text-[7px]' : 'px-2.5 py-1 text-[9px]'} font-mono tracking-wider uppercase bg-white/15 backdrop-blur-sm text-white border border-white/20 font-bold`}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className={`${isMobile ? 'text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-black text-white/10 tabular-nums`}>
                  {project.year}
                </span>
              </div>
            </div>
          </div>

          {/* Border with glow - Always visible */}
          <>
            <div className={`absolute inset-0 border-2 ${project.borderColor} pointer-events-none`} />
            {isActive && (
              <div className={`absolute inset-0 ${project.borderColor} opacity-20 blur-xl pointer-events-none`} />
            )}
          </>
        </div>
      </motion.div>
    </motion.div>
  );
}
