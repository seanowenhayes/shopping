import { useRef, useState, useEffect } from 'react'
import { useXR } from '@react-three/xr'
import { Group, TextureLoader } from 'three'
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
  const fallbackImage = "/images/lv-bag-placeholder.jpg"
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl)

  // Load texture from currentImageUrl
  let texture
  try {
    texture = useLoader(TextureLoader, currentImageUrl)
  } catch (error) {
    // This block won't catch async errors, so we use useEffect below
    texture = undefined
  }

  // If the image fails to load, fallback to placeholder
  useEffect(() => {
    let isMounted = true
    const loader = new TextureLoader()
    loader.load(
      currentImageUrl,
      () => {},
      undefined,
      (err) => {
        if (isMounted && currentImageUrl !== fallbackImage) {
          setCurrentImageUrl(fallbackImage)
        }
      }
    )
    return () => { isMounted = false }
  }, [currentImageUrl, fallbackImage])
  
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