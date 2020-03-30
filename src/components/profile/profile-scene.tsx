import React, {
  useRef,
  useContext,
  useEffect,
  Suspense,
  Dispatch,
  SetStateAction,
} from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, extend, useThree, useRender } from 'react-three-fiber'

import { ProfileInfo } from './profile-info'
import { ProfileBox } from './profile-box'
import ProfileGallery from './profile-gallery'
import ProfileControls from './profile-controls'
import ProfileCta from './profile-cta'

import { Logo } from '../logo'

import { ArtworkContext } from '../../context/artwork-context'
import ProfileBack from './profile-back'
import ProfileUsername from './profile-username'
import Fallback from '../fallback'

interface Props {
  photoPreview: string
  setPhotoPreview: Dispatch<SetStateAction<string>>
  photoRatio: number
  setPhotoRatio: Dispatch<SetStateAction<number>>
  photoGallery: Photo[]
  setPhotoGallery: Dispatch<SetStateAction<Photo[]>>
  photoUploaded: boolean
  setPhotoUploaded: Dispatch<SetStateAction<boolean>>
  handlePhotoUpload: () => void
  setUploaded: Dispatch<SetStateAction<boolean>>
  loader: string
}

interface Photo {
  id: string
  src: string
  ratio: number
  name: string
}

export const ProfileScene: React.FC<Props> = ({
  photoPreview,
  setPhotoPreview,
  photoGallery,
  photoRatio,
  setPhotoRatio,
  id,
}) => {
  extend({ OrbitControls })

  const {
    rotateCanvas,
    lightIntensity,
    showTexture,
    showBorder,
    backgroundColor,
    rotateIncrement,
    setQueryId,
  } = useContext(ArtworkContext)

  useEffect(() => {
    if (id) {
      setQueryId(id)
    }
  }, [])

  // Control canvas
  const Controls = () => {
    const orbitRef = useRef(null)
    const { camera, gl } = useThree()

    useRender(() => {
      if (orbitRef.current) {
        orbitRef.current.update()
      }
    }, false)

    return (
      <orbitControls
        // autoRotate={rotate}
        autoRotateSpeed={0.3}
        enableDamping
        dampingFactor={0.05}
        enableKeys
        minDistance={1}
        maxDistance={7.8}
        minPolarAngle={THREE.Math.degToRad(70)}
        maxPolarAngle={THREE.Math.degToRad(90)}
        minAzimuthAngle={THREE.Math.degToRad(-60)}
        maxAzimuthAngle={THREE.Math.degToRad(60)}
        args={[camera, gl.domElement]}
        ref={orbitRef}
        zoomEnabled
      />
    )
  }

  return (
    <div>
      <Canvas
        style={{
          background: backgroundColor
            ? 'linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%'
            : '#000004',
        }}
        id="main-image"
        // vr
        camera={{
          position: [0, 0, 3.8],
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >
        <ambientLight intensity={0.8} />
        <hemisphereLight intensity={0.2} />
        <Suspense fallback={null}>
          <ProfileBox
            url={photoPreview}
            photoRatio={photoRatio}
            showTexture={showTexture}
            showBorder={showBorder}
            rotateIncrement={rotateIncrement}
          />
          <Controls rotate={rotateCanvas} />
        </Suspense>
        <spotLight
          castShadow
          position={[-15, 0, 50]}
          penumbra={0}
          intensity={lightIntensity / 100}
          lightColor="#fff"
        />
        <pointLight
          direction={[0, 0, 0]}
          distance={20}
          intensity={0.8}
          color="white"
        />
      </Canvas>
      <Logo backgroundColor={backgroundColor} full />
      <ProfileCta />
      <ProfileBack />
      <ProfileGallery
        photoGallery={photoGallery}
        setPhotoRatio={setPhotoRatio}
        setPhotoPreview={setPhotoPreview}
      />
      <ProfileUsername />
      <ProfileControls
        photoGallery={photoGallery}
        photoPreview={photoPreview}
        setPhotoPreview={setPhotoPreview}
        setPhotoRatio={setPhotoRatio}
      />
      <ProfileInfo />
    </div>
  )
}
