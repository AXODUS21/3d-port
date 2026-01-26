'use client'

import React, { Suspense, useLayoutEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei'
import { Model as XelltextModel } from '@/components/Xelltext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const CameraController = ({ 
    scrollContainer, 
    modelRef 
}: { 
    scrollContainer: React.RefObject<HTMLDivElement | null>,
    modelRef: React.RefObject<THREE.Group | null>
}) => {
  const { camera } = useThree()

  useLayoutEffect(() => {
    if (!scrollContainer.current) return

    // Set initial position
    camera.position.set(-2.23, 0.00, -0.14)
    camera.lookAt(0, 0, 0)

    let ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scrollContainer.current,
                start: "top top",
                end: "+=500%", // Increased scroll distance
                scrub: 1, // Smoother scrubbing
                pin: true,
                // markers: true,
            }
        })

        // Animate Camera
        tl.to(camera.position, {
            x: -0.00,
            y: 3.73,
            z: 0.01,
            duration: 1,
            ease: "power2.out", // Slow down at the end
            onUpdate: () => {
                camera.lookAt(0, 0, 0)
            }
        }, 0)

        // Animate Model Rotation if ref exists
        if (modelRef.current) {
            // Reset initial rotation
            modelRef.current.rotation.set(0, 0, 0)
            
            tl.to(modelRef.current.rotation, {
                x: -Math.PI / 2,
                y: 0,
                z: 0,
                duration: 1,
                ease: "power2.out" // Slow down at the end
            }, 0)
        }

        // Add a buffer at the end so animation finishes before unpinning
        tl.to({}, { duration: 0.5 })

    }, scrollContainer) // Coping to container

    return () => ctx.revert()
  }, [camera, scrollContainer, modelRef])

  return null
}

type Props = {}

const Hero = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<THREE.Group>(null)

  return (
    <div className="relative w-full">
        <div ref={containerRef} className="h-screen w-full bg-slate-900">
        <Canvas className="pointer-events-none" camera={{ position: [-2.23, 0.00, -0.14], fov: 45 }}>
            <CameraController scrollContainer={containerRef} modelRef={modelRef} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
                <Center>
                    <group ref={modelRef}>
                        <XelltextModel scale={1} />
                    </group>
                </Center>
                <Environment preset="city" />
            </Suspense>
        </Canvas>
        </div>
    </div>
  )
}

export default Hero