import React from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Text001: THREE.Mesh
  }
  materials: {
    ['Material.020']: THREE.MeshStandardMaterial
  }
}




export function Model(props: React.JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/Xelltext.glb') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Text001.geometry}
        material={materials['Material.020']}
        position={[-0.005, 0, 0.766]}
      />
    </group>
  )
}

useGLTF.preload('/models/Xelltext.glb')
