import { useRef, useState } from 'react'
import { useXR } from '@react-three/xr'
import { Group, TextureLoader, MeshStandardMaterial } from 'three'
import { useLoader } from '@react-three/fiber'

export interface ProductProps {
  position?: [number, number, number]
  color?: string
  imageUrl?: string
  name?: string
  price?: string
  scale?: [number, number, number]
}

export function Product({ 
  position = [0, 0, 0], 
  color = "white",
  imageUrl = "/images/lv-bag-placeholder.jpg",
  name = "Louis Vuitton Bag",
  price = "$2,500",
  scale = [1, 1, 1]
}: ProductProps) {
  const { session } = useXR()
  const ref = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  
  // Load texture if imageUrl is provided
  let texture = null
  try {
    texture = useLoader(TextureLoader, imageUrl)
  } catch (error) {
    console.warn('Failed to load texture:', error)
  }
  
  const handleClick = () => {
    if (session) {
      console.log('Product selected:', name)
    }
  }

  const handlePointerOver = () => {
    setHovered(true)
  }

  const handlePointerOut = () => {
    setHovered(false)
  }

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Product Display Stand */}
      <mesh position={[0, -0.3, 0]} receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 8]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      
      {/* Product Box/Container */}
      <mesh 
        position={[0, 0.2, 0]} 
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.8, 0.6, 0.4]} />
        <meshStandardMaterial 
          color={texture ? undefined : color}
          map={texture}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Product Label */}
      <mesh position={[0, 0.6, 0]}>
        <planeGeometry args={[0.9, 0.2]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.8} />
      </mesh>
      
      {/* Hover Effect */}
      {hovered && (
        <mesh position={[0, 0.8, 0]}>
          <planeGeometry args={[1.2, 0.4]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>
      )}
    </group>
  )
} 