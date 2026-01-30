'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Briefcase, Calendar, MapPin, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    id: 1,
    company: "TechCorp Solutions",
    role: "Senior Full-Stack Developer",
    duration: "2 years 4 months",
    period: "Jan 2023 - Present",
    location: "San Francisco, CA",
    description: "Led the development of a microservices architecture serving 2M+ users. Architected and implemented real-time data synchronization systems using WebSockets and Redis. Mentored a team of 5 junior developers and established best practices for code quality and testing.",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Docker", "Kubernetes"],
    achievements: [
      "Reduced API response time by 60% through optimization",
      "Implemented CI/CD pipeline reducing deployment time by 75%",
      "Led migration from monolith to microservices architecture"
    ],
    logo: "/company-logos/techcorp.png"
  },
  {
    id: 2,
    company: "InnovateLabs",
    role: "Frontend Developer",
    duration: "1 year 8 months",
    period: "May 2021 - Dec 2022",
    location: "New York, NY",
    description: "Developed and maintained multiple client-facing web applications for Fortune 500 companies. Collaborated with UX designers to create pixel-perfect, responsive interfaces. Implemented advanced animations and interactions using GSAP and Framer Motion.",
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GSAP", "Three.js"],
    achievements: [
      "Built 12+ production applications with 99.9% uptime",
      "Improved page load speed by 45% through code splitting",
      "Established component library used across 8 projects"
    ],
    logo: "/company-logos/innovatelabs.png"
  },
  {
    id: 3,
    company: "DataFlow Systems",
    role: "Junior Developer",
    duration: "1 year 2 months",
    period: "Mar 2020 - Apr 2021",
    location: "Austin, TX",
    description: "Started my professional journey building internal tools and dashboards for data analytics. Worked closely with senior developers to learn best practices in software development. Contributed to the development of a real-time analytics platform processing millions of events daily.",
    technologies: ["JavaScript", "Vue.js", "Python", "MongoDB", "Redis"],
    achievements: [
      "Developed 5+ internal tools improving team productivity by 30%",
      "Implemented automated testing increasing code coverage to 85%",
      "Optimized database queries reducing load time by 40%"
    ],
    logo: "/company-logos/dataflow.png"
  }
]

const Experiences = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const timelineLineRef = useRef<HTMLDivElement>(null)
  const timelineDotsRef = useRef<(HTMLDivElement | null)[]>([])
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate header on scroll into view
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        })
      }

      // Animate timeline line drawing from top to bottom
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 2,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: timelineLineRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            }
          }
        )
      }

      // Animate cards with stagger and additional effects
      const cards = cardsRef.current.filter(Boolean)
      
      cards.forEach((card, index) => {
        const isEven = index % 2 === 0
        
        // Main card animation
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: isEven ? -100 : 100,
            y: 50,
            rotateY: isEven ? -15 : 15,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            }
          }
        )

        // Animate achievements list with stagger
        const achievementsList = card?.querySelectorAll('ul li')
        if (achievementsList) {
          gsap.from(achievementsList, {
            opacity: 0,
            x: -20,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              toggleActions: "play none none reverse",
            }
          })
        }

        // Animate technology tags with stagger
        const techTags = card?.querySelectorAll('.tech-tag')
        if (techTags) {
          gsap.from(techTags, {
            opacity: 0,
            scale: 0,
            stagger: 0.05,
            duration: 0.4,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 65%",
              toggleActions: "play none none reverse",
            }
          })
        }
      })

      // Animate timeline dots with pulse effect
      const dots = timelineDotsRef.current.filter(Boolean)
      dots.forEach((dot, index) => {
        if (dot) {
          // Initial reveal animation
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: dot,
                start: "top 80%",
                toggleActions: "play none none reverse",
              }
            }
          )

          // Continuous floating/pulsing animation
          gsap.to(dot, {
            scale: 1.3,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3,
          })
        }
      })

    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section 
      id="experiences" 
      ref={sectionRef}
      className="relative bg-zinc-950 py-32 overflow-hidden"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" suppressHydrationWarning>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-zinc-700 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
              opacity: Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <Sparkles className="w-8 h-8 text-zinc-500 animate-pulse" />
            <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase">
              Career Journey
            </span>
          </div>
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6">
            EXPERIENCES
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl font-light">
            A timeline of my professional growth and the amazing teams I've worked with.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative lg:p-10">
          {/* Horizontal Line - Top */}
          <div className="absolute left-0 right-0 top-0 h-px bg-linear-to-r from-transparent via-zinc-600 to-transparent hidden md:block" />
          
          {/* Animated Vertical Line */}
          <div 
            ref={timelineLineRef}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-zinc-800 via-zinc-600 to-zinc-800 hidden md:block"
          />
          
          {/* Horizontal Line - Bottom */}
          <div className="absolute left-0 right-0 bottom-0 h-px bg-linear-to-r from-transparent via-zinc-600 to-transparent hidden md:block" />
          
          {/* Experience Cards */}
          <div className="space-y-24 ">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                ref={(el) => { cardsRef.current[index] = el }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Animated Timeline Dot */}
                <div 
                  ref={(el) => { timelineDotsRef.current[index] = el }}
                  className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-20"
                >
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-white border-4 border-zinc-950" />
                    <div className="absolute inset-0 rounded-full bg-white opacity-50 animate-ping" />
                  </div>
                </div>

                {/* Card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-600 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-900/50 hover:scale-[1.02] hover:-translate-y-2">
                    {/* Company Logo Placeholder with Rotation on Hover */}
                    <div className="mb-6 w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center overflow-hidden group-hover:rotate-6 transition-transform duration-500">
                      <div className="w-full h-full bg-linear-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
                        <Briefcase className="w-8 h-8 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                      </div>
                    </div>

                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold text-white mb-2 tracking-tight group-hover:text-zinc-100 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-xl text-zinc-400 mb-4 font-light group-hover:text-zinc-300 transition-colors">
                        {exp.company}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-zinc-500 font-mono">
                        <div className="flex items-center gap-2 group/item hover:text-zinc-300 transition-colors">
                          <Calendar className="w-4 h-4 group-hover/item:scale-110 transition-transform" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2 group/item hover:text-zinc-300 transition-colors">
                          <Briefcase className="w-4 h-4 group-hover/item:scale-110 transition-transform" />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 group/item hover:text-zinc-300 transition-colors">
                          <MapPin className="w-4 h-4 group-hover/item:scale-110 transition-transform" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-300 leading-relaxed mb-6 text-base group-hover:text-zinc-200 transition-colors">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-sm font-mono uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
                        <Sparkles className="w-3 h-3" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm group/achievement hover:text-zinc-300 transition-colors">
                            <span className="text-zinc-600 mt-1 group-hover/achievement:text-zinc-400 transition-colors">▸</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-sm font-mono uppercase tracking-wider text-zinc-500 mb-3">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span 
                            key={tech} 
                            className="tech-tag px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-400 font-mono uppercase tracking-wider border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-750 hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-default"
                            style={{ transitionDelay: `${techIndex * 30}ms` }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA with Animation */}
        <div className="mt-32 text-center">
          <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase mb-6 animate-pulse">
            Want to work together?
          </p>
          <button 
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group px-8 py-4 bg-white text-black font-mono text-sm uppercase tracking-wider hover:bg-zinc-200 transition-all duration-300 inline-flex items-center gap-3 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
          >
            <span>Let's Connect</span>
            <span className="transform group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(5px);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  )
}

export default Experiences
