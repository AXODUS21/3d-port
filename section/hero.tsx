'use client'

import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei'
import { Model as XelltextModel } from '@/components/Xelltext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const SceneContent = ({ scrollContainer, textRef }: { scrollContainer: React.RefObject<HTMLDivElement | null>, textRef: React.RefObject<HTMLDivElement | null> }) => {
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
        }
        
        // Phase 3: Move Scene Left (Reliable)
        // Accessing sceneRef directly
        if (sceneRef.current) {
             // Move Scene Left
            tl.to(sceneRef.current.position, {
                x: -1.0,
                duration: 0.8,
                ease: "power2.inOut",
            }, "+=0.2")
        }

        if (modelRef.current) {
            tl.to(modelRef.current.scale, {
                x: 0.4,
                y: 0.4,
                z: 0.4,
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

  return (
    <>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
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

  return (
    <div className="relative w-full">
        <div ref={containerRef} className="relative h-screen w-full bg-slate-900">
            <Canvas className="pointer-events-none" camera={{ position: [-2.23, 0.00, -0.14], fov: 45 }}>
                <Suspense fallback={null}>
                    <SceneContent scrollContainer={containerRef} textRef={textRef} />
                </Suspense>
            </Canvas>
            <div 
                ref={textRef}
                className="absolute top-0 right-0 w-1/2 h-full flex items-center justify-center opacity-0 pointer-events-none"
            >
                <div className="text-white text-4xl font-bold">
                    hi
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero