"use client";

import { useState, useRef } from "react";
import { featuredProjects } from "./data";
import { motion, useMotionValue, animate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransitionStore } from "@/lib/transition-store";

const CARD_WIDTH = 650;
const ROTATION_UNIT = 360 / featuredProjects.length;

export default function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const rotation = useMotionValue(0);
  const isDragging = useRef(false);
  const dragStartRotation = useRef(0);

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
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-white/50" />
            <span className="text-sm font-mono text-white/50 tracking-[0.2em]">02 // FEATURED WORK</span>
            <div className="w-12 h-px bg-white/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
            Selected Projects
          </h2>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center perspective-[2000px]">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Gradient orbs */}
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -100, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            />
            {/* Spotlight on active card */}
            <motion.div
              animate={{
                rotate: -activeIndex * ROTATION_UNIT,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-[800px] h-[600px] bg-white/5 rounded-full blur-3xl" />
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
              const radius = 750;
              
              return (
                <CarouselCard
                  key={project.id}
                  project={project}
                  index={index}
                  angle={angle}
                  radius={radius}
                  isActive={index === activeIndex}
                  isDragging={isDragging}
                />
              );
            })}
          </motion.div>

          {/* Navigation Arrows */}
          <button
            onClick={() => rotateCarousel("prev")}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 border border-white/20 bg-black/50 backdrop-blur-sm hover:bg-white hover:border-white text-white hover:text-black flex items-center justify-center transition-all group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => rotateCarousel("next")}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 border border-white/20 bg-black/50 backdrop-blur-sm hover:bg-white hover:border-white text-white hover:text-black flex items-center justify-center transition-all group"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {featuredProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                animate(rotation, -index * ROTATION_UNIT, {
                  type: "spring",
                  stiffness: 100,
                  damping: 30
                });
              }}
              className={`h-1 rounded-full transition-all ${
                index === activeIndex ? "bg-white w-12" : "bg-white/30 w-8"
              }`}
            />
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
  isActive: boolean;
  isDragging: React.MutableRefObject<boolean>;
}

function CarouselCard({ project, index, angle, radius, isActive, isDragging }: CarouselCardProps) {
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
        width: `${CARD_WIDTH}px`,
        transformStyle: "preserve-3d",
        transform: `
          translate(-50%, -50%)
          rotateY(${angle}deg)
          translateZ(${radius}px)
        `,
      }}
      className="pointer-events-none"
    >
      <div 
        onClick={handleClick}
        className={`relative aspect-[16/10] pointer-events-auto ${isActive ? 'cursor-pointer' : 'cursor-default'}`}
      >
        {/* Card Content */}
        <div className="relative w-full h-full overflow-hidden bg-zinc-900">
          {/* Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          {/* Themed accent overlay */}
          <div className={`absolute inset-0 ${project.accentColor}`} />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

          {/* Content Overlay */}
          <div className="relative h-full flex flex-col justify-between p-6">
            {/* Top: Number & Category */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-white rounded-full" />
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/80">
                  {project.category}
                </span>
              </div>
              <span className="text-xs font-mono text-white/50 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Bottom: Title, Description, Tags, Year */}
            <div>
              <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {project.title}
              </h4>
              
              <p className="text-xs text-white/70 mb-3 line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[9px] font-mono tracking-wider uppercase bg-white/10 backdrop-blur-sm text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-4xl md:text-5xl font-black text-white/20 tabular-nums">
                  {project.year}
                </span>
              </div>
            </div>
          </div>

          {/* Active Border */}
          {isActive && (
            <div className={`absolute inset-0 border-2 ${project.borderColor} pointer-events-none`} />
          )}
        </div>
      </div>
    </motion.div>
  );
}
