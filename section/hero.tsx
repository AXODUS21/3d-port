'use client'

import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei'
import { LivingFluidBackground } from '@/components/living-fluid-background'
import { Model as XelltextModel } from '@/components/Xelltext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const SceneContent = ({ scrollContainer, textRef, fluidBgRef }: { scrollContainer: React.RefObject<HTMLDivElement | null>, textRef: React.RefObject<HTMLDivElement | null>, fluidBgRef: React.RefObject<HTMLDivElement | null> }) => {
  const { camera } = useThree()
  const modelRef = useRef<THREE.Group>(null)
  const sceneRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (!scrollContainer.current) return

    // Set initial position
    camera.position.set(-2.23, 0.00, -0.14)
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

        // Phase 2: Animate Model Rotation
        // We can do this safely because refs adhere to the same component lifecycle here
        if (modelRef.current) {
            modelRef.current.rotation.set(0, 0, 0)
            modelRef.current.scale.set(1, 1, 1)
            
            tl.to(modelRef.current.rotation, {
                x: 0, // Rotated opposite direction to face camera
                y: 0,
                z: 0, // Adjust if text is upside down
                duration: 1,
                ease: "power2.out"
            }, 0)

            // Animate Material Color to Black (Theme Switch)


            // Slight Tilt Adjustment
            tl.to(modelRef.current.rotation, {
                x: 0.2,
                y: 0.2,
                z: -0.1,
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
                x: -0.8,
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

        // Add a buffer at the end
        tl.to({}, { duration: 0.5 })

        // Force refresh to ensure positions are correct
        ScrollTrigger.refresh()

    }, scrollContainer)

    return () => ctx.revert()
  }, [camera, scrollContainer])

  useFrame((state) => {
    if (sceneRef.current) {
        // Simple subtle mouse influence
        const targetY = state.mouse.x * 0.02
        const targetX = -state.mouse.y * 0.01

        sceneRef.current.rotation.y += (targetY - sceneRef.current.rotation.y) * 0.1
        sceneRef.current.rotation.x += (targetX - sceneRef.current.rotation.x) * 0.1
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

  return (
    <div className="relative w-full">
        <div ref={containerRef} id="hero-container" className="relative h-screen w-full" style={{ backgroundColor: '#18181b' }}>
            <Canvas className="pointer-events-none z-0 relative" camera={{ position: [-2.23, 0.00, -0.14], fov: 45 }}>
                <Suspense fallback={null}>
                    <SceneContent scrollContainer={containerRef} textRef={textRef} fluidBgRef={fluidBgRef} />
                </Suspense>
            </Canvas>
            <LivingFluidBackground ref={fluidBgRef} className="z-10" />
            <div 
                ref={textRef}
                className="absolute top-0 right-0 w-1/2 h-full flex items-center justify-center opacity-0 pointer-events-none z-20"
            >
                <div className="text-zinc-800 text-2xl font-bold p-10">
                    I'm a passionate full-stack developer with expertise in building modern web applications. With a strong foundation in both front-end and back-end technologies, I create seamless digital experiences that solve real-world problems.<br></br><br></br>
                    My journey in web development began 5 years ago, and since then, I've worked with various clients from startups to established businesses, helping them achieve their digital goals.
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero