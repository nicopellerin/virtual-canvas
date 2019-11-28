import React, {
  useRef,
  useContext,
  useEffect,
  useState,
  Suspense,
  Dispatch,
  SetStateAction,
} from 'react'
import * as THREE from 'three'
import styled, { keyframes } from 'styled-components'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, extend, useThree, useRender, Dom } from 'react-three-fiber'
import { save } from 'save-file'

import { Sidebar } from './sidebar'
import { ArtworkInfo } from './artwork-info'
import { Box } from './box'
import { Logo } from './logo'
import Gallery from './gallery'
import Tips from './tips'
import AddArtwork from './add-artwork'
import Menu from './menu'

import { ArtworkContext } from '../context/artwork-context'

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

export const MainScene: React.FC<Props> = ({
  photoPreview,
  setPhotoPreview,
  photoGallery,
  setPhotoGallery,
  photoRatio,
  setPhotoRatio,
  setPhotoUploaded,
  handlePhotoUpload,
  setUploaded,
  loader,
}) => {
  extend({ OrbitControls })

  const {
    checkedBackground,
    rotateCanvas,
    lightIntensity,
    showTexture,
    showBorder,
    backgroundColor,
    rotateIncrement,
    artworkName,
  } = useContext(ArtworkContext)

  const [screenShot, setScreenShot] = useState()
  const [snap, setSnap] = useState(false)

  const getPhoto = React.useCallback(
    gl => {
      setScreenShot(gl.domElement.toDataURL('image/jpeg'))
      setSnap(false)
    },
    [screenShot]
  )

  const saveToFile = async () => {
    await save(screenShot, `${artworkName || 'virtual-canvas'}.jpg`)
  }

  const firstLoad = useRef(true)
  useEffect(() => {
    if (firstLoad.current || snap === false) {
      firstLoad.current = false
      return
    }
    saveToFile()
  }, [snap])

  // Control canvas
  const Controls = () => {
    const orbitRef = useRef(null)
    const { camera, gl } = useThree()

    gl.setClearColor(Number(backgroundColor ? '0xffffff' : '0x000004'), 1)

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
        minAzimuthAngle={THREE.Math.degToRad(checkedBackground ? -55 : -50)}
        maxAzimuthAngle={THREE.Math.degToRad(checkedBackground ? 65 : 50)}
        args={[camera, gl.domElement]}
        ref={orbitRef}
        zoomEnabled
      />
    )
  }

  const Fallback = () => {
    return (
      <Dom>
        <Loader>Loading...</Loader>
      </Dom>
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
        // id="main-image"
        gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
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
        <Suspense fallback={<Fallback />}>
          <Box
            url={photoPreview}
            photoRatio={photoRatio}
            showTexture={showTexture}
            showBorder={showBorder}
            rotateIncrement={rotateIncrement}
            getPhoto={getPhoto}
            snap={snap}
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
      <Tips />
      <Logo backgroundColor={backgroundColor} />
      <Sidebar
        handlePhotoUpload={handlePhotoUpload}
        checkedBackground={checkedBackground}
        setPhotoUploaded={setPhotoUploaded}
        photoGallery={photoGallery}
        setPhotoGallery={setPhotoGallery}
        photoPreview={photoPreview}
        loader={loader}
        setSnap={setSnap}
      />
      <Gallery
        photoGallery={photoGallery}
        setPhotoGallery={setPhotoGallery}
        setPhotoRatio={setPhotoRatio}
        setPhotoPreview={setPhotoPreview}
      />
      <Menu />
      <ArtworkInfo />
      {photoGallery.length === 0 && (
        <AddArtwork
          handlePhotoUpload={handlePhotoUpload}
          setUploaded={setUploaded}
          loader={loader}
        />
      )}
    </div>
  )
}

// Styles
const delay = keyframes`
from {
  opacity: 0;
}
  to {
    opacity: 1;
  }
`

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 100vw;
  height: 100vh;
  font-size: 3rem;
  font-weight: 800;
  opacity: 0;
  animation: ${delay} 10ms 1000ms forwards ease-in-out;
  transition: opacity 300ms ease-in-out;
`
