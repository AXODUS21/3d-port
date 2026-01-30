'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Play, Pause, Maximize2, X, Volume2, VolumeX, GripVertical } from 'lucide-react'

interface Testimonial {
  id: number
  type: 'video' | 'text'
  videoUrl?: string
  thumbnail?: string
  text?: string
  author: string
  role: string
  company: string
  gradient: string
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall'
}

const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    type: 'video',
    videoUrl: '/testimonials/video1.mp4',
    thumbnail: '/testimonials/thumb1.jpg',
    author: "Sarah Jenning",
    role: "Product Director",
    company: "Vertex Labs",
    gradient: "from-blue-500 to-cyan-500",
    size: 'large'
  },
  {
    id: 2,
    type: 'text',
    text: "Absolutely mind-blowing technical execution. The transition from the loading state to the hero section is the smoothest I've ever seen on the web.",
    author: "Marcus Chen",
    role: "CTO",
    company: "Nebula Stream",
    gradient: "from-purple-500 to-pink-500",
    size: 'medium'
  },
  {
    id: 3,
    type: 'video',
    videoUrl: '/testimonials/video2.mp4',
    thumbnail: '/testimonials/thumb2.jpg',
    author: "Elena Rodriguez",
    role: "Founder",
    company: "Prism Digital",
    gradient: "from-orange-500 to-red-500",
    size: 'medium'
  },
  {
    id: 4,
    type: 'text',
    text: "The design system built for us was scalable, beautiful, and easy to maintain. A perfect blend of engineering and artistic vision.",
    author: "David Kim",
    role: "VP of Engineering",
    company: "Flux OS",
    gradient: "from-emerald-500 to-teal-500",
    size: 'wide'
  },
  {
    id: 5,
    type: 'video',
    videoUrl: '/testimonials/video3.mp4',
    thumbnail: '/testimonials/thumb3.jpg',
    author: "James Thorne",
    role: "Co-Founder",
    company: "Aether Finance",
    gradient: "from-blue-600 to-indigo-600",
    size: 'tall'
  },
  {
    id: 6,
    type: 'text',
    text: "Working with this team transformed our digital presence. The attention to detail and creative solutions exceeded all expectations.",
    author: "Lisa Wang",
    role: "Marketing Lead",
    company: "Quantum Dynamics",
    gradient: "from-pink-500 to-rose-500",
    size: 'small'
  },
  {
    id: 7,
    type: 'text',
    text: "Revolutionary approach to web development. They delivered a platform that handles millions of users without breaking a sweat.",
    author: "Alex Thompson",
    role: "Tech Lead",
    company: "CloudScale",
    gradient: "from-cyan-500 to-blue-500",
    size: 'medium'
  },
  {
    id: 8,
    type: 'video',
    videoUrl: '/testimonials/video4.mp4',
    thumbnail: '/testimonials/thumb4.jpg',
    author: "Maya Patel",
    role: "Design Director",
    company: "Pixel Perfect",
    gradient: "from-violet-500 to-purple-500",
    size: 'wide'
  },
  {
    id: 9,
    type: 'text',
    text: "The level of polish and attention to user experience is unmatched. Our conversion rates doubled after the redesign.",
    author: "Robert Chen",
    role: "CEO",
    company: "Growth Labs",
    gradient: "from-amber-500 to-orange-500",
    size: 'small'
  },
  {
    id: 10,
    type: 'video',
    videoUrl: '/testimonials/video5.mp4',
    thumbnail: '/testimonials/thumb5.jpg',
    author: "Sophie Martinez",
    role: "Product Manager",
    company: "Innovation Hub",
    gradient: "from-teal-500 to-emerald-500",
    size: 'tall'
  },
  {
    id: 11,
    type: 'text',
    text: "Best investment we made this year. The team understood our vision and brought it to life beyond our expectations.",
    author: "Daniel Park",
    role: "Founder",
    company: "StartupX",
    gradient: "from-rose-500 to-pink-500",
    size: 'medium'
  },
  {
    id: 12,
    type: 'text',
    text: "Incredible performance optimization. Page load times went from 3 seconds to under 500ms. Game changer!",
    author: "Emily Zhang",
    role: "CTO",
    company: "SpeedTech",
    gradient: "from-indigo-500 to-blue-500",
    size: 'small'
  }
]

// Grid size classes for bento layout
const sizeClasses = {
  small: 'col-span-1 row-span-1',
  medium: 'col-span-1 row-span-1',
  large: 'col-span-2 row-span-2',
  wide: 'col-span-2 row-span-1',
  tall: 'col-span-1 row-span-2'
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials)
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)
  const [modalVideo, setModalVideo] = useState<Testimonial | null>(null)
  const [mutedVideos, setMutedVideos] = useState<Set<number>>(new Set())
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map())
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const containerRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const sectionRef = useRef<HTMLDivElement>(null)
  const draggedCardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Animate cards on scroll
    const cards = Array.from(cardRefs.current.values())
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out"
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    cards.forEach((card) => {
      if (card) {
        gsap.set(card, { opacity: 0, scale: 0.9 })
        observer.observe(card)
      }
    })

    return () => observer.disconnect()
  }, [testimonials])

  // Animate position swaps in real-time
  useEffect(() => {
    if (draggedIndex === null || dragOverIndex === null || draggedIndex === dragOverIndex) {
      // Reset all positions when not dragging over
      testimonials.forEach((_, index) => {
        const container = containerRefs.current.get(testimonials[index].id)
        if (container && index !== draggedIndex) {
          gsap.to(container, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          })
        }
      })
      return
    }

    // Create preview of the swap
    const newOrder = [...testimonials]
    const temp = newOrder[draggedIndex]
    newOrder[draggedIndex] = newOrder[dragOverIndex]
    newOrder[dragOverIndex] = temp

    // Animate cards to their preview positions
    testimonials.forEach((testimonial, originalIndex) => {
      const container = containerRefs.current.get(testimonial.id)
      if (!container || originalIndex === draggedIndex) return

      // Find where this card will be in the new order
      const newIndex = newOrder.findIndex(t => t.id === testimonial.id)
      
      if (newIndex !== originalIndex) {
        // Calculate the offset
        const currentContainer = containerRefs.current.get(testimonials[originalIndex].id)
        const targetContainer = containerRefs.current.get(newOrder[newIndex].id)
        
        if (currentContainer && targetContainer) {
          const currentRect = currentContainer.getBoundingClientRect()
          const targetRect = targetContainer.getBoundingClientRect()
          
          const deltaX = targetRect.left - currentRect.left
          const deltaY = targetRect.top - currentRect.top

          gsap.to(container, {
            x: deltaX,
            y: deltaY,
            duration: 0.3,
            ease: "power2.out"
          })
        }
      } else {
        gsap.to(container, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        })
      }
    })
  }, [draggedIndex, dragOverIndex, testimonials])

  const togglePlay = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRefs.current.get(id)
    if (!video) return

    if (playingVideo === id) {
      video.pause()
      setPlayingVideo(null)
    } else {
      videoRefs.current.forEach((v, videoId) => {
        if (videoId !== id) {
          v.pause()
        }
      })
      video.play()
      setPlayingVideo(id)
    }
  }

  const toggleMute = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRefs.current.get(id)
    if (!video) return

    const newMuted = new Set(mutedVideos)
    if (mutedVideos.has(id)) {
      newMuted.delete(id)
      video.muted = false
    } else {
      newMuted.add(id)
      video.muted = true
    }
    setMutedVideos(newMuted)
  }

  const openModal = (testimonial: Testimonial) => {
    if (testimonial.type === 'video') {
      setModalVideo(testimonial)
      const video = videoRefs.current.get(testimonial.id)
      if (video) video.pause()
      setPlayingVideo(null)
    }
  }

  const closeModal = () => {
    setModalVideo(null)
  }

  const handleCardHover = (id: number, isEntering: boolean) => {
    if (isDragging) return
    
    const card = cardRefs.current.get(id)
    if (!card) return

    if (isEntering) {
      gsap.to(card, {
        scale: 1.02,
        y: -8,
        duration: 0.4,
        ease: "power2.out"
      })
    } else {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      })
    }
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    setIsDragging(true)
    e.dataTransfer.effectAllowed = 'move'
    
    const testimonial = testimonials[index]
    const video = videoRefs.current.get(testimonial.id)
    if (video) video.pause()
    setPlayingVideo(null)
    
    // Store reference to dragged card
    const card = cardRefs.current.get(testimonial.id)
    if (card) {
      draggedCardRef.current = card
      
      // Create custom drag image
      if (e.dataTransfer.setDragImage) {
        e.dataTransfer.setDragImage(card, card.offsetWidth / 2, card.offsetHeight / 2)
      }

      // Scale up the dragged card slightly (NO opacity change)
      gsap.to(card, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out"
      })
    }
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear if we're leaving the grid entirely
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY
    
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setDragOverIndex(null)
    }
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      setIsDragging(false)
      
      // Reset scale
      if (draggedCardRef.current) {
        gsap.to(draggedCardRef.current, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        })
      }
      return
    }

    // Get the grid container
    const gridContainer = sectionRef.current?.querySelector('.grid') as HTMLElement
    if (!gridContainer) return

    const gridRect = gridContainer.getBoundingClientRect()

    // Step 1: Capture all current positions and sizes (relative to grid)
    const positions = new Map<number, { rect: DOMRect, element: HTMLDivElement }>()
    testimonials.forEach((testimonial) => {
      const container = containerRefs.current.get(testimonial.id)
      if (container) {
        const rect = container.getBoundingClientRect()
        positions.set(testimonial.id, { rect, element: container })
      }
    })

    // Preserve grid height to prevent collapse
    const gridHeight = gridContainer.offsetHeight
    gsap.set(gridContainer, {
      minHeight: gridHeight,
      position: 'relative'
    })

    // Step 2: Make all containers position absolute (relative to grid container)
    // IMPORTANT: Force opacity to 1 to prevent disappearing
    positions.forEach(({ rect, element }) => {
      const card = cardRefs.current.get(
        testimonials.find(t => containerRefs.current.get(t.id) === element)?.id || 0
      )
      
      gsap.set(element, {
        position: 'absolute',
        top: rect.top - gridRect.top,
        left: rect.left - gridRect.left,
        width: rect.width,
        height: rect.height,
        zIndex: 10
      })
      
      // Force card to be fully visible
      if (card) {
        gsap.set(card, {
          opacity: 1,
          scale: 1
        })
      }
    })

    // Step 3: Swap the state
    const newTestimonials = [...testimonials]
    const temp = newTestimonials[draggedIndex]
    newTestimonials[draggedIndex] = newTestimonials[dropIndex]
    newTestimonials[dropIndex] = temp

    setTestimonials(newTestimonials)

    // Step 4: Wait for React to re-render with new order
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Temporarily make containers position static to get their natural grid positions
        positions.forEach(({ element }) => {
          gsap.set(element, { position: 'static' })
        })

        // Capture new positions (relative to grid)
        const newPositions = new Map<number, DOMRect>()
        const newGridRect = gridContainer.getBoundingClientRect()
        
        newTestimonials.forEach((testimonial) => {
          const container = containerRefs.current.get(testimonial.id)
          if (container) {
            newPositions.set(testimonial.id, container.getBoundingClientRect())
          }
        })

        // Make them absolute again and position at their OLD locations
        newTestimonials.forEach((testimonial) => {
          const container = containerRefs.current.get(testimonial.id)
          const card = cardRefs.current.get(testimonial.id)
          const oldPos = positions.get(testimonial.id)
          const newPos = newPositions.get(testimonial.id)
          
          if (container && oldPos && newPos) {
            // Ensure card stays visible
            if (card) {
              gsap.set(card, {
                opacity: 1,
                scale: 1
              })
            }

            // Set to old position (absolute, relative to grid)
            gsap.set(container, {
              position: 'absolute',
              top: oldPos.rect.top - gridRect.top,
              left: oldPos.rect.left - gridRect.left,
              width: oldPos.rect.width,
              height: oldPos.rect.height,
              zIndex: testimonial.id === testimonials[draggedIndex]?.id ? 20 : 10
            })

            // Animate to new position (relative to grid)
            gsap.to(container, {
              top: newPos.top - newGridRect.top,
              left: newPos.left - newGridRect.left,
              width: newPos.width,
              height: newPos.height,
              duration: 0.6,
              ease: "power3.out",
              onComplete: () => {
                // Reset to static positioning after animation
                gsap.set(container, {
                  position: 'relative',
                  top: 'auto',
                  left: 'auto',
                  width: 'auto',
                  height: 'auto',
                  zIndex: 'auto'
                })

                // Ensure card stays visible after animation
                if (card) {
                  gsap.set(card, {
                    opacity: 1,
                    scale: 1
                  })
                }

                // Reset grid container after all animations complete
                if (testimonial.id === newTestimonials[newTestimonials.length - 1].id) {
                  gsap.set(gridContainer, {
                    minHeight: 'auto',
                    position: 'relative'
                  })
                }
              }
            })
          }
        })

        // Reset scale on dragged card
        if (draggedCardRef.current) {
          gsap.to(draggedCardRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          })
        }
      })
    })

    setDraggedIndex(null)
    setDragOverIndex(null)
    setIsDragging(false)
    draggedCardRef.current = null
  }

  const handleDragEnd = () => {
    // Reset everything
    testimonials.forEach((testimonial) => {
      const container = containerRefs.current.get(testimonial.id)
      if (container) {
        gsap.to(container, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        })
      }
    })

    if (draggedCardRef.current) {
      gsap.to(draggedCardRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      })
    }

    setDraggedIndex(null)
    setDragOverIndex(null)
    setIsDragging(false)
    draggedCardRef.current = null
  }

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className="relative min-h-screen bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 py-32 px-4 md:px-8 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Section Title */}
      <div className="max-w-7xl mx-auto mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-zinc-800 dark:border-zinc-200 pb-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter font-mono uppercase">
              CLIENT STORIES
            </h2>
            <p className="text-zinc-500 dark:text-zinc-600 mt-4 text-lg font-mono">
              Drag & rearrange the bento puzzle
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <GripVertical className="w-5 h-5 text-zinc-500 dark:text-zinc-600 animate-pulse" />
              <span className="text-sm font-mono text-zinc-500 dark:text-zinc-600">INTERACTIVE BENTO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
          {testimonials.map((testimonial, index) => {
            const isBeingDragged = draggedIndex === index
            const isDropTarget = dragOverIndex === index && draggedIndex !== index
            
            return (
              <div
                key={testimonial.id}
                ref={(el) => {
                  if (el) containerRefs.current.set(testimonial.id, el)
                }}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`${sizeClasses[testimonial.size]} relative`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  transition: 'none' // Disable CSS transitions, use GSAP only
                }}
              >
                {/* Gray Placeholder Box at Drop Location */}
                {isDropTarget && (
                  <div className="absolute inset-0 rounded-2xl bg-zinc-700/30 dark:bg-zinc-300/30 backdrop-blur-sm border-2 border-zinc-600 dark:border-zinc-400 z-50 pointer-events-none flex items-center justify-center">
                    <div className="text-zinc-400 dark:text-zinc-600 font-mono text-sm">Drop here</div>
                  </div>
                )}

                {/* Drag Handle Indicator */}
                <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-black/60 dark:bg-white/60 backdrop-blur-md rounded-lg p-2 border border-white/20 dark:border-black/20">
                    <GripVertical className="w-5 h-5 text-white dark:text-black" />
                  </div>
                </div>

                {/* Card Container - NO opacity change when dragging */}
                <div 
                  ref={(el) => {
                    if (el) cardRefs.current.set(testimonial.id, el)
                  }}
                  className="group relative h-full w-full rounded-2xl overflow-hidden border border-zinc-800 dark:border-zinc-200 bg-zinc-900 dark:bg-zinc-50 shadow-2xl cursor-grab active:cursor-grabbing"
                  onMouseEnter={() => handleCardHover(testimonial.id, true)}
                  onMouseLeave={() => handleCardHover(testimonial.id, false)}
                  style={{
                    opacity: 1 // Always full opacity, even when dragging
                  }}
                >
                  
                  {/* Video Testimonial */}
                  {testimonial.type === 'video' && (
                    <div className="relative h-full w-full">
                      {/* Video Element */}
                      <video
                        ref={(el) => {
                          if (el) {
                            videoRefs.current.set(testimonial.id, el)
                            el.muted = mutedVideos.has(testimonial.id)
                          }
                        }}
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                        poster={testimonial.thumbnail}
                        loop
                        playsInline
                        onEnded={() => setPlayingVideo(null)}
                      >
                        <source src={testimonial.videoUrl} type="video/mp4" />
                      </video>

                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${testimonial.gradient} opacity-20 mix-blend-overlay`} />
                      
                      {/* Dark Overlay for Text Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Video Controls */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={(e) => togglePlay(testimonial.id, e)}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 pointer-events-auto"
                        >
                          {playingVideo === testimonial.id ? (
                            <Pause className="w-8 h-8 text-white" />
                          ) : (
                            <Play className="w-8 h-8 text-white ml-1" />
                          )}
                        </button>
                      </div>

                      {/* Top Controls */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={(e) => toggleMute(testimonial.id, e)}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/60 transition-all pointer-events-auto"
                        >
                          {mutedVideos.has(testimonial.id) ? (
                            <VolumeX className="w-5 h-5 text-white" />
                          ) : (
                            <Volume2 className="w-5 h-5 text-white" />
                          )}
                        </button>
                        <button
                          onClick={() => openModal(testimonial)}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/60 transition-all pointer-events-auto"
                        >
                          <Maximize2 className="w-5 h-5 text-white" />
                        </button>
                      </div>

                      {/* Author Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 pointer-events-none">
                        <div className="space-y-1">
                          <h3 className="text-lg md:text-xl font-bold text-white">{testimonial.author}</h3>
                          <p className="text-xs md:text-sm text-zinc-300">{testimonial.role}</p>
                          <p className="text-xs md:text-sm font-mono text-zinc-400">{testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Text Testimonial */}
                  {testimonial.type === 'text' && (
                    <div className="relative h-full w-full p-4 md:p-8 flex flex-col justify-between">
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-10`} />
                      
                      {/* Quote Mark */}
                      <div className="absolute top-3 left-3 md:top-6 md:left-6 text-6xl md:text-8xl font-serif text-zinc-700 dark:text-zinc-300 opacity-20 leading-none pointer-events-none">
                        &ldquo;
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex-1 flex items-center pointer-events-none">
                        <p className="text-sm md:text-lg lg:text-xl leading-relaxed text-zinc-100 dark:text-zinc-900">
                          {testimonial.text}
                        </p>
                      </div>

                      {/* Author Info */}
                      <div className="relative z-10 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-zinc-700 dark:border-zinc-300 pointer-events-none">
                        <h3 className="text-base md:text-lg font-bold text-white dark:text-zinc-950">{testimonial.author}</h3>
                        <p className="text-xs md:text-sm text-zinc-400 dark:text-zinc-600 mt-1">{testimonial.role}</p>
                        <p className="text-xs md:text-sm font-mono text-zinc-500 dark:text-zinc-500 mt-1">{testimonial.company}</p>
                      </div>

                      {/* Decorative Corner */}
                      <div className={`absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br ${testimonial.gradient} opacity-20 blur-2xl rounded-full transform translate-x-12 -translate-y-12 md:translate-x-16 md:-translate-y-16 pointer-events-none`} />
                    </div>
                  )}

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${testimonial.gradient} blur-xl -z-10 transform scale-105`} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal for Full-Screen Video */}
      {modalVideo && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="relative w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <video
              className="w-full h-full rounded-2xl"
              controls
              autoPlay
              src={modalVideo.videoUrl}
            >
              <source src={modalVideo.videoUrl} type="video/mp4" />
            </video>

            {/* Modal Info */}
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-white">{modalVideo.author}</h3>
              <p className="text-zinc-400 mt-2">{modalVideo.role} at {modalVideo.company}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Testimonials
