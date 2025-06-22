export function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial 
        color="#e6d9c3"
        roughness={0.08}
        metalness={0.7}
      />
    </mesh>
  )
} 