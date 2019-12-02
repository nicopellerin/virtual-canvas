import React, { useRef, useMemo, Dispatch, SetStateAction } from 'react'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader, useFrame, useThree } from 'react-three-fiber'
import lerp from 'lerp'

interface Props {
  url: string
  photoRatio: number
  showTexture: Dispatch<SetStateAction<boolean>>
}

export const DemoBox: React.FC<Props> = ({ url, photoRatio, showTexture }) => {
  // Load image on box
  const [texture] = useLoader(THREE.TextureLoader, [url])

  const { camera } = useThree()

  const canvasTexture = useMemo(
    () => new TextureLoader().load('/canvas.jpg'),
    []
  )

  const bump = useMemo(() => new TextureLoader().load('/canvas.jpg'), [])

  // Dolly back and forth effect
  const ref = useRef(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.z = Math.sin(clock.getElapsedTime()) * 0.1
    }
    camera.zoom = lerp(camera.zoom, 1.5, 0.05)
    // camera.position.y = lerp(camera.position.y, 0, 0.05)
    if (Math.abs(camera.zoom - 100) > 0.001) camera.updateProjectionMatrix()
  })

  return (
    <group ref={ref} rotation={[0, -0.2, 0]} position={[0, 0.3, 0]}>
      <mesh castShadow rotation={[0, 0, 0]}>
        <boxBufferGeometry attach="geometry" args={[3 * photoRatio, 3, 0.2]} />
        <meshBasicMaterial
          attach="material"
          map={canvasTexture}
          args={[2, 2, 2]}
        />
      </mesh>
      <mesh receiveShadow rotation={[0, 0, 0]} position={[0, 0, 0.112]}>
        <planeBufferGeometry attach="geometry" args={[3 * photoRatio, 3]} />
        <meshPhongMaterial
          attach="material"
          map={texture}
          bumpMap={bump}
          bumpScale={showTexture ? 0.012 : 0}
          specular="rgb(255,255,255)"
          shininess={2}
          args={[2, 2, 2]}
        />
      </mesh>
    </group>
  )
}
