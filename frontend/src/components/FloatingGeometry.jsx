import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Wireframe } from '@react-three/drei'
import * as THREE from 'three'

// Jednotlivý floating objekt
function FloatingShape({ position, rotation, scale, speed = 1, geometry = 'box' }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * speed
      meshRef.current.rotation.y += 0.008 * speed
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.002
    }
  })

  const renderGeometry = () => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />
      case 'sphere':
        return <icosahedronGeometry args={[0.8, 0]} />
      case 'octahedron':
        return <octahedronGeometry args={[0.8]} />
      case 'tetrahedron':
        return <tetrahedronGeometry args={[0.8]} />
      default:
        return <boxGeometry args={[1, 1, 1]} />
    }
  }

  return (
    <Float
      speed={speed * 2}
      rotationIntensity={0.3}
      floatIntensity={0.5}
      floatingRange={[0, 0.5]}
    >
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
      >
        {renderGeometry()}
        <meshBasicMaterial wireframe color="white" transparent opacity={0.15} />
      </mesh>
    </Float>
  )
}

// Celá scéna s více objekty
function Scene() {
  return (
    <>
      {/* Ambientní světlo */}
      <ambientLight intensity={0.3} />
      
      {/* Floating objekty - strategicky rozmístěné */}
      
      {/* KOSTKY - 6 kusů */}
      <FloatingShape 
        position={[-8, 4, -5]} 
        rotation={[0.3, 0.2, 0]} 
        scale={0.8} 
        speed={0.8} 
        geometry="box" 
      />
      
      <FloatingShape 
        position={[8, -4, -6]} 
        rotation={[0.1, 0.9, 0.2]} 
        scale={0.7} 
        speed={0.9} 
        geometry="box" 
      />

      <FloatingShape 
        position={[-3, -6, -4]} 
        rotation={[0.7, 0.4, 0.1]} 
        scale={0.6} 
        speed={1.1} 
        geometry="box" 
      />

      <FloatingShape 
        position={[6, 2, -8]} 
        rotation={[0.2, 1.1, 0.5]} 
        scale={0.9} 
        speed={0.7} 
        geometry="box" 
      />

      <FloatingShape 
        position={[-10, -2, -3]} 
        rotation={[0.8, 0.1, 0.9]} 
        scale={0.5} 
        speed={1.3} 
        geometry="box" 
      />

      <FloatingShape 
        position={[4, 8, -7]} 
        rotation={[0.4, 0.6, 0.2]} 
        scale={0.8} 
        speed={0.6} 
        geometry="box" 
      />
      
      {/* KOULE - 6 kusů */}
      <FloatingShape 
        position={[9, 5, -4]} 
        rotation={[0.5, 0.8, 0.3]} 
        scale={0.9} 
        speed={1.2} 
        geometry="sphere" 
      />
      
      <FloatingShape 
        position={[-6, -3, -7]} 
        rotation={[0.6, 0.3, 0.8]} 
        scale={0.6} 
        speed={1.3} 
        geometry="sphere" 
      />

      <FloatingShape 
        position={[2, -8, -5]} 
        rotation={[0.9, 0.7, 0.4]} 
        scale={0.7} 
        speed={0.8} 
        geometry="sphere" 
      />

      <FloatingShape 
        position={[-8, 6, -6]} 
        rotation={[0.3, 1.2, 0.6]} 
        scale={0.5} 
        speed={1.4} 
        geometry="sphere" 
      />

      <FloatingShape 
        position={[7, -1, -9]} 
        rotation={[0.7, 0.2, 1.0]} 
        scale={0.8} 
        speed={0.9} 
        geometry="sphere" 
      />

      <FloatingShape 
        position={[-4, 9, -3]} 
        rotation={[0.1, 0.9, 0.3]} 
        scale={0.4} 
        speed={1.6} 
        geometry="sphere" 
      />
      
      {/* OKTAEDR - 4 kusy */}
      <FloatingShape 
        position={[-5, 7, -8]} 
        rotation={[0.2, 0.5, 0.1]} 
        scale={0.5} 
        speed={0.6} 
        geometry="octahedron" 
      />
      
      <FloatingShape 
        position={[10, -6, -4]} 
        rotation={[0.4, 0.7, 0.1]} 
        scale={0.3} 
        speed={1.1} 
        geometry="octahedron" 
      />

      <FloatingShape 
        position={[-7, -8, -6]} 
        rotation={[0.6, 0.3, 0.8]} 
        scale={0.6} 
        speed={0.8} 
        geometry="octahedron" 
      />

      <FloatingShape 
        position={[5, 3, -2]} 
        rotation={[0.8, 1.1, 0.4]} 
        scale={0.4} 
        speed={1.5} 
        geometry="octahedron" 
      />

      {/* TETRAEDR - 4 kusy */}
      <FloatingShape 
        position={[3, -5, -7]} 
        rotation={[0.8, 0.2, 0.6]} 
        scale={0.4} 
        speed={1.5} 
        geometry="tetrahedron" 
      />
      
      <FloatingShape 
        position={[-9, 1, -5]} 
        rotation={[0.9, 0.1, 0.5]} 
        scale={0.35} 
        speed={0.7} 
        geometry="tetrahedron" 
      />

      <FloatingShape 
        position={[8, 7, -9]} 
        rotation={[0.3, 0.8, 0.2]} 
        scale={0.5} 
        speed={1.2} 
        geometry="tetrahedron" 
      />

      <FloatingShape 
        position={[-2, -4, -10]} 
        rotation={[0.7, 0.4, 0.9]} 
        scale={0.3} 
        speed={1.7} 
        geometry="tetrahedron" 
      />
    </>
  )
}

// Hlavní komponenta
export default function FloatingGeometry() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ 
          position: [0, 0, 12], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
