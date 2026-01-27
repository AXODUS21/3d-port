import React from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Text003: THREE.Mesh
  }
  materials: {
    ['Material.022']: THREE.MeshStandardMaterial
  }
}

export function Model(props: React.JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/Xelltext.glb') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text003.geometry}
        material={materials['Material.022']}
        position={[2.658, -0.005, 2.569]}
        scale={2.03}
      />
    </group>
  )
}

useGLTF.preload('/models/Xelltext.glb')