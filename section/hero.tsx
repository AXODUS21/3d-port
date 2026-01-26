'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei'
import { Model as XelltextModel } from '@/components/Xelltext'

type Props = {}

const Hero = (props: Props) => {
  return (
    <div className="h-screen w-full bg-slate-900">
      <Canvas className="pointer-events-none" camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
            <Center>
              <XelltextModel scale={1} />
            </Center>
            <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Hero