'use client'

import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei'
import { LivingFluidBackground } from '@/components/living-fluid-background'
import { Navigation } from '@/components/navigation'
import { Model as XelltextModel } from '@/components/Xelltext'
import TransitionLink from '@/components/transition-link'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const SceneContent = ({ scrollContainer, textRef, fluidBgRef, navTopRef, navBottomRef, introWordsRef, worldClockRef }: { 
    scrollContainer: React.RefObject<HTMLDivElement | null>, 
    textRef: React.RefObject<HTMLDivElement | null>, 
    fluidBgRef: React.RefObject<HTMLDivElement | null>,
    navTopRef: React.RefObject<HTMLDivElement | null>,
    navBottomRef: React.RefObject<HTMLDivElement | null>,
    introWordsRef: React.RefObject<HTMLDivElement | null>,
    worldClockRef: React.RefObject<HTMLDivElement | null>
}) => {
  const { camera } = useThree()
  const modelRef = useRef<THREE.Group>(null)
  const sceneRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!scrollContainer.current) return

    // Set initial position
    camera.position.set(-1.95, 0.00, -0.1)
    camera.lookAt(0, 0, 0)

    let ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scrollContainer.current,
                start: "top top",
                end: "+=700%", // Extended for third animation phase
                scrub: 1,
                pin: true,
                // markers: true,
                onRefresh: (self) => console.log("refreshed", self), // Debug aid
            }
        })

        // Phase 1: Animate Camera to top-down view
        tl.to(camera.position, {
            x: 0,
            y: 3.73,
            z: 0.01,
            duration: 1,
            ease: "power2.out",
            onUpdate: () => {
                camera.lookAt(0, 0, 0)
            }
        }, 0)

        // Animate Background from dark (initial) to white (Phase 1)
        if (scrollContainer.current) {
            tl.to(scrollContainer.current, {
                backgroundColor: '#ffffff',
                duration: 0.5,
                ease: "power2.out"
            }, 0)
        }

        // Fade out Fluid Background
        if (fluidBgRef.current) {
            tl.to(fluidBgRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            }, 0)
        }

        // Animate Intro Words AWAY (Phase 1)
        if (introWordsRef.current) {
            tl.to(introWordsRef.current, {
                opacity: 0,
                y: -50,
                duration: 0.8,
                ease: "power2.out"
            }, 0)
        }

        // Animate World Clock AWAY (Phase 1)
        if (worldClockRef.current) {
            tl.to(worldClockRef.current, {
                opacity: 0,
                y: -50,
                duration: 0.8,
                ease: "power2.out"
            }, 0)
        }

        // Animate Top Navigation OUT (Contact button) - Phase 1
        if (navTopRef.current) {
            tl.to(navTopRef.current, {
                y: -150,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, 0)
        }

        // Phase 2: Animate Model Rotation
        // We can do this safely because refs adhere to the same component lifecycle here
        if (modelRef.current) {
            modelRef.current.rotation.set(0, 0, 0)
            modelRef.current.scale.set(1, 1, 1)
            
            tl.to(modelRef.current.rotation, {
                x: 0, 
                y: 0,
                z: 0, 
                duration: 1,
                ease: "power2.out"
            }, 0)

            // Slight Tilt Adjustment
            tl.to(modelRef.current.rotation, {
                x: -0.2,
                y: -0.2,
                z: -0.4,
                duration: 1,
                ease: "power2.inOut"
            }, ">")

            if (sceneRef.current) {
                tl.to(sceneRef.current.position, {
                    z: 0.5,
                    duration: 1,
                    ease: "power2.inOut"
                }, "<")
            }
        }
        
        // Phase 3: Move Scene Left (Reliable)
        // Accessing sceneRef directly
        if (sceneRef.current) {
             // Move Scene Left
            tl.to(sceneRef.current.position, {
                x: -0.6,
                y: -0.3,
                duration: 0.8,
                ease: "power2.inOut",
            }, "+=0.2")
        }

        if (modelRef.current) {
            tl.to(modelRef.current.scale, {
                x: 0.6,
                y: 0.6,
                z: 0.6,
                duration: 0.8,
                ease: "power2.inOut"
            }, "<")
        }

        // Animate Text Side-by-Side
        if (textRef.current) {
            tl.fromTo(textRef.current, {
                opacity: 0,
                x: 100,
            }, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.inOut"
            }, "<")
        }

        // -------------------------------------------------------------
        // Animate Navigation OUT (Slide out when text appears)
        // -------------------------------------------------------------
        // -------------------------------------------------------------
        // Animate Top Navigation OUT (Contact button)
        // -------------------------------------------------------------


        // Bottom Navigation stays visible

        // Add a buffer at the end
        tl.to({}, { duration: 0.5 })

        // Force refresh to ensure positions are correct
        ScrollTrigger.refresh()

    }, scrollContainer)

    return () => ctx.revert()
  }, [camera, scrollContainer])

  useFrame((state) => {
    if (sceneRef.current) {
        // Only allow mouse interaction if we are roughly in the hero section view
        // 1.5 viewport height buffer to ensure it feels responsive during the initial scroll
        if (window.scrollY < window.innerHeight * 1.5) {
            // Simple subtle mouse influence
            const targetY = state.mouse.x * 0.02
            const targetX = -state.mouse.y * 0.1   
    
            sceneRef.current.rotation.y += (targetY - sceneRef.current.rotation.y) * 0.1
            sceneRef.current.rotation.x += (targetX - sceneRef.current.rotation.x) * 0.1
        }
    }
  })

  return (
    <>
        <ambientLight intensity={2} />
        <directionalLight position={[5, 10, 7]} intensity={3} />
        <group ref={sceneRef}>
            <Center>
                <group ref={modelRef}>
                    <XelltextModel scale={1} />
                </group>
            </Center>
        </group>
        <Environment preset="city" />
    </>
  )
}

type Props = {}

const Hero = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const fluidBgRef = useRef<HTMLDivElement>(null)
  const navTopRef = useRef<HTMLDivElement>(null)
  const navBottomRef = useRef<HTMLDivElement>(null)
  const introWordsRef = useRef<HTMLDivElement>(null)
  const worldClockRef = useRef<HTMLDivElement>(null)
  const [currentTime, setCurrentTime] = React.useState<string>('')

  // Update Manila time every second
  useEffect(() => {
    const updateTime = () => {
      const manilaTime = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
      setCurrentTime(manilaTime)
    }

    updateTime() // Initial update
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full">
        <div ref={containerRef} id="hero-container" className="relative h-screen w-full" style={{ backgroundColor: '#18181b' }}>
            <Navigation topRef={navTopRef} bottomRef={navBottomRef} />
            <Canvas className="pointer-events-none z-0 relative" camera={{ position: [-2.23, 0.00, -0.14], fov: 45 }}>
                <Suspense fallback={null}>
                    <SceneContent 
                        scrollContainer={containerRef} 
                        textRef={textRef} 
                        fluidBgRef={fluidBgRef}
                        navTopRef={navTopRef}
                        navBottomRef={navBottomRef}
                        introWordsRef={introWordsRef}
                        worldClockRef={worldClockRef}
                    />
                </Suspense>
            </Canvas>
            <LivingFluidBackground ref={fluidBgRef} className="z-10" />

            {/* World Clock - Manila */}
            <div ref={worldClockRef} className="absolute top-4 left-4 z-30 pointer-events-none">
                <div className="flex flex-col gap-1 text-white font-mono">
                    <div className="text-[10px] tracking-widest uppercase opacity-60">Manila, Philippines</div>
                    <div className="text-xl font-bold tracking-tight tabular-nums">{currentTime || '00:00:00'}</div>
                    <div className="text-[9px] tracking-wider uppercase opacity-60">GMT+8</div>
                </div>
            </div>

            {/* Intro Words */}
            <div 
                ref={introWordsRef}
                className="absolute inset-0 flex items-center justify-between w-full px-4 pointer-events-none z-30 mix-blend-difference"
            >
                <span className="text-white text-[10px] font-mono tracking-widest uppercase">Materializing</span>
                <span className="text-white text-[10px] font-mono tracking-widest uppercase -translate-x-[45px]">the</span>
                <span className="text-white text-[10px] font-mono tracking-widest uppercase">Experience</span>
            </div>

            <div 
                ref={textRef}
                className="absolute top-0 right-0 w-1/2 h-full flex items-center justify-center opacity-0 z-20"
            >
                <div className="text-zinc-800 text-2xl p-10 max-w-2xl">
                <h2 className="text-6xl font-bold tracking-tighter mb-8 text-black">About Me</h2>
                    <p className="font-light leading-relaxed text-zinc-800 mb-6 text-xl">
                        I'm a passionate full-stack developer with expertise in building modern web applications. With a strong foundation in both front-end and back-end technologies, I create seamless digital experiences that solve real-world problems.
                    </p>
                    <p className="font-light leading-relaxed text-zinc-800 mb-8 text-xl">
                        My journey in web development began 5 years ago, and since then, I've worked with various clients from startups to established businesses, helping them achieve their digital goals.
                    </p>
                    
                    <TransitionLink 
                      href="/about"
                      className="group inline-flex items-center gap-2 px-6 py-2 rounded-none border-[0.5px] border-zinc-800 bg-zinc-950 text-white font-mono text-xs uppercase tracking-wider hover:bg-zinc-800 hover:text-white transition-all duration-300 pointer-events-auto"
                    >
                        <span className="relative z-10">Learn More</span>
                        <ArrowUpRight className="w-3 h-3 relative z-10 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </TransitionLink>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero