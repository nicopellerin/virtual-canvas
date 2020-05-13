import * as React from 'react'
import { useRef, useEffect, useState, Suspense } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber'
import { save } from 'save-file'
import { queryCache } from 'react-query'

import { Sidebar } from './sidebar'
import { ArtworkInfo } from './artwork-info'
import { Box } from './box'
import { Logo } from './logo'
import Gallery from './gallery'
import Tips from './tips'
import AddArtwork from './add-artwork'
import Menu from './menu'
// import Fallback from './fallback'

import useImages from '../hooks/useImages'

import { UserProfile } from '../modules/types'

interface Props {
  loader: string
  errMsg: string
}

export const MainScene: React.FC<Props> = ({ loader, errMsg }) => {
  extend({ OrbitControls })

  const isPublicProfile = false
  const { selectedImage, selectImage, updateImage } = useImages({
    isPublicProfile,
  })
  const userProfile = queryCache.getQueryData('userProfile') as UserProfile

  const [screenShot, setScreenShot] = useState()
  const [snap, setSnap] = useState(false)

  const getPhoto = gl => {
    setScreenShot(gl.domElement.toDataURL('image/jpeg'))
    setSnap(false)
  }

  const saveToFile = async () => {
    await save(screenShot, `${selectedImage?.name || 'virtual-canvas'}.jpg`)
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

    gl.setClearColor(
      Number(selectedImage?.background ? '0xffffff' : '0x000004'),
      1
    )

    useFrame(() => {
      if (orbitRef.current) {
        orbitRef.current.update()
      }
    })

    return (
      <orbitControls
        enableDamping
        dampingFactor={0.05}
        enableKeys
        minDistance={1}
        maxDistance={7.8}
        minPolarAngle={THREE.Math.degToRad(70)}
        maxPolarAngle={THREE.Math.degToRad(90)}
        minAzimuthAngle={THREE.Math.degToRad(-35)}
        maxAzimuthAngle={THREE.Math.degToRad(70)}
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
          background: selectedImage?.background
            ? 'linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%'
            : '#000004',
        }}
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
        <Suspense fallback={null}>
          <Box
            url={selectedImage?.src}
            ratio={selectedImage?.ratio}
            bumpTexture={selectedImage?.texture}
            border={selectedImage?.border}
            rotate={selectedImage?.rotate}
            getPhoto={getPhoto}
            snap={snap}
          />
          <Controls />
        </Suspense>
        <spotLight
          castShadow
          position={[-15, 0, 50]}
          penumbra={0}
          intensity={selectedImage?.lighting / 100}
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
      <Logo backgroundColor={selectedImage?.background} />
      <Sidebar
        loader={loader}
        setSnap={setSnap}
        selectImage={selectImage}
        selectedImage={selectedImage}
        updateImage={updateImage}
        errMsg={errMsg}
      />
      <Gallery
        type="userProfile"
        selectImage={selectImage}
        selectedImage={selectedImage}
        isPublicProfile={isPublicProfile}
      />
      <Menu selectedImage={selectedImage} />
      <ArtworkInfo selectedImage={selectedImage} />
      {userProfile?.images?.length === 0 && (
        <AddArtwork selectImage={selectImage} />
      )}
    </div>
  )
}
