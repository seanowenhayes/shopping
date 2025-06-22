import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { XR, createXRStore } from '@react-three/xr'
import { ShoppingAisle } from './components/ShoppingAisle'
import { EnterVRButton } from './components/EnterVRButton'

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
            <Environment preset="night" />
          </Suspense>
        </XR>
      </Canvas>
    </div>
  )
}

export default App
