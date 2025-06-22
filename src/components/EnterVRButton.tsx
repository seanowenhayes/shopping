import { useState, useEffect } from 'react'

export function EnterVRButton() {
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