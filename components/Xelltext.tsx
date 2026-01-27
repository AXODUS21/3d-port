import React from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Text002: THREE.Mesh
  }
  materials: {
    ['Material.021']: THREE.MeshStandardMaterial
  }
}

export function Model(props: React.JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/Xelltext.glb') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text002.geometry}
        material={materials['Material.021']}
        material-color="black"
        position={[2.785, 0, 0.883]}
        scale={1.999}
      />
    </group>
  )
}

useGLTF.preload('/models/Xelltext.glb')