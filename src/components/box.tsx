import React, {
  useRef,
  useMemo,
  Dispatch,
  SetStateAction,
  ReactElement,
} from "react"
import * as THREE from "three"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { useLoader, useFrame } from "react-three-fiber"

interface Props {
  url: string
  photoRatio: number
  showTexture: Dispatch<SetStateAction<boolean>>
  showBorder: Dispatch<SetStateAction<boolean>>
}

export const Box = ({
  url,
  photoRatio,
  showTexture,
  showBorder,
}: Props): ReactElement => {
  // Load image on box
  const [texture] = useLoader(THREE.TextureLoader, [url])

  const canvasTexture = useMemo(
    () => new TextureLoader().load("/canvas.jpg"),
    []
  )

  const bump = useMemo(() => new TextureLoader().load("/canvas.jpg"), [])

  // Dolly back and forth effect
  const ref = useRef(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.z = Math.sin(clock.getElapsedTime()) * 0.1
    }
  })

  return (
    <group ref={ref}>
      <mesh castShadow rotation={[0, 0, 0]}>
        <boxBufferGeometry
          attach="geometry"
          args={[3.5 * photoRatio, 3.5, 0.2]}
        />
        <meshBasicMaterial
          attach="material"
          map={canvasTexture}
          args={[2, 2, 2]}
        />
      </mesh>
      <mesh receiveShadow rotation={[0, 0, 0]} position={[0, 0, 0.112]}>
        <planeBufferGeometry
          attach="geometry"
          args={
            showBorder ? [3.42 * photoRatio, 3.42] : [3.5 * photoRatio, 3.5]
          }
        />
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
