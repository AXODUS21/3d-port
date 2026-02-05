"use client";

import { useState } from "react";
import { featuredProjects } from "./data";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TransitionLink from "@/components/transition-link";

export default function FeaturedProjects() {
  return (
    <section id="work" className="relative bg-black py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-white/50" />
            <span className="text-sm font-mono text-white/50 tracking-[0.2em]">02 // FEATURED WORK</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
            Selected<br />Projects
          </h2>
        </div>

        {/* Projects Grid - All visible, image-focused */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: typeof featuredProjects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TransitionLink href={`/project/${project.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.05 }}
        viewport={{ once: true, margin: "-50px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative aspect-[16/10] cursor-pointer overflow-hidden"
      >
        {/* Full Image Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Content - Only visible on hover or always minimal */}
        <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
          {/* Top: Category & Number */}
          <div className="flex items-start justify-between">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: isHovered ? 1 : 0.7, y: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-1 h-1 bg-white rounded-full" />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/90">
                {project.category}
              </span>
            </motion.div>

            <motion.div
              animate={{ opacity: isHovered ? 1 : 0.5 }}
              className="text-xs font-mono text-white/70 tabular-nums"
            >
              {String(index + 1).padStart(2, "0")}
            </motion.div>
          </div>

          {/* Bottom: Title, Tags, Arrow */}
          <div>
            <motion.h3
              animate={{ y: isHovered ? -4 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3"
            >
              {project.title}
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                height: isHovered ? "auto" : 0 
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-sm text-white/80 mb-3 line-clamp-2">
                {project.description}
              </p>
            </motion.div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 2).map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0.7, 
                      scale: 1 
                    }}
                    className="px-2 py-1 text-[9px] font-mono tracking-wider uppercase bg-white/10 backdrop-blur-sm text-white/90"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <motion.div
                animate={{ 
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? -45 : 0
                }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center"
              >
                <ArrowUpRight className="w-4 h-4 text-white" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Border that appears on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 border border-white/20 pointer-events-none"
        />
      </motion.div>
    </TransitionLink>
  );
}
