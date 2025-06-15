import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense, useState, useEffect, useRef } from 'react'
import { XR, useXR, createXRStore } from '@react-three/xr'
import { Group } from 'three'

interface ShelfProps {
  position?: [number, number, number]
}

interface ProductProps {
  position?: [number, number, number]
  color?: string
}

function Shelf({ position = [0, 0, 0] }: ShelfProps) {
  return (
    <mesh position={position}>
      <boxGeometry args={[2, 0.1, 0.8]} />
      <meshStandardMaterial color="#8B4513" />
    </mesh>
  )
}

function Product({ position = [0, 0, 0], color = "red" }: ProductProps) {
  const { session } = useXR()
  const ref = useRef<Group>(null)
  
  const handleClick = () => {
    if (session) {
      console.log('Product selected')
    }
  }

  return (
    <mesh ref={ref} position={position} onClick={handleClick}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function ShoppingAisle() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Shelves */}
      <Shelf position={[-2, 0, 0]} />
      <Shelf position={[-2, 0.5, 0]} />
      <Shelf position={[-2, 1, 0]} />
      
      <Shelf position={[2, 0, 0]} />
      <Shelf position={[2, 0.5, 0]} />
      <Shelf position={[2, 1, 0]} />

      {/* Products */}
      <Product position={[-2, 0.1, 0]} color="red" />
      <Product position={[-2, 0.6, 0]} color="blue" />
      <Product position={[-2, 1.1, 0]} color="green" />
      
      <Product position={[2, 0.1, 0]} color="yellow" />
      <Product position={[2, 0.6, 0]} color="purple" />
      <Product position={[2, 1.1, 0]} color="orange" />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </group>
  )
}

function EnterVRButton() {
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-vr')
        .then(supported => setIsSupported(supported))
    }
  }, [])

  const enterVR = async () => {
    if (navigator.xr) {
      try {
        const session = await navigator.xr.requestSession('immersive-vr', {
          optionalFeatures: ['local-floor', 'bounded-floor']
        })
        // The session will be handled by @react-three/xr's XR component
      } catch (err) {
        console.error('Error starting VR session:', err)
      }
    }
  }

  if (!isSupported) return null

  return (
    <button
      onClick={enterVR}
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '12px 24px',
        background: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        zIndex: 1000
      }}
    >
      Enter VR
    </button>
  )
}

function App() {
  const store = createXRStore()
  
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <EnterVRButton />
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <XR store={store}>
          <Suspense fallback={null}>
            <ShoppingAisle />
            <OrbitControls />
            <Environment preset="warehouse" />
          </Suspense>
        </XR>
      </Canvas>
    </div>
  )
}

export default App
