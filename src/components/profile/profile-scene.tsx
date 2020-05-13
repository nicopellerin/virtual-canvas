import * as React from 'react'
import { useRef, Suspense, useContext } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, extend, useThree, useFrame } from 'react-three-fiber'

import { ProfileInfo } from './profile-info'
import { Box } from '../box'
import Gallery from '../gallery'
import ProfileControls from './profile-controls'
import ProfileCta from './profile-cta'
import ProfileBack from './profile-back'
import ProfileUsername from './profile-username'

import { Logo } from '../logo'

import useImages from '../../hooks/useImages'
import { usernameFromPathname } from '../../utils/utils'

interface Props {
  token: string
  userToken: string
}

export const ProfileScene: React.FC<Props> = ({ token, userToken }) => {
  extend({ OrbitControls })

  const isPublicProfile = true

  const { selectedImage, selectImage } = useImages({ isPublicProfile })

  // Control canvas
  const Controls = () => {
    const orbitRef = useRef(null)
    const { camera, gl } = useThree()

    useFrame(() => {
      if (orbitRef.current) {
        orbitRef.current.update()
      }
    })

    return (
      <orbitControls
        autoRotateSpeed={0.3}
        enableDamping
        dampingFactor={0.05}
        enableKeys
        minDistance={1}
        maxDistance={7.8}
        minPolarAngle={THREE.Math.degToRad(70)}
        maxPolarAngle={THREE.Math.degToRad(90)}
        minAzimuthAngle={THREE.Math.degToRad(-30)}
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
          <Box
            url={selectedImage?.src}
            ratio={selectedImage?.ratio}
            bumpTexture={selectedImage?.texture}
            border={selectedImage?.border}
            rotate={selectedImage?.rotate}
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
      <Logo backgroundColor={selectedImage?.background} full />
      <ProfileCta token={token} />
      {userToken && usernameFromPathname === userToken && (
        <ProfileBack token={token} />
      )}
      <Gallery
        type="publicProfile"
        selectImage={selectImage}
        selectedImage={selectedImage}
        isPublicProfile={isPublicProfile}
      />
      <ProfileUsername />
      <ProfileControls
        selectedImage={selectedImage}
        selectImage={selectImage}
      />
      <ProfileInfo selectedImage={selectedImage} />
    </div>
  )
}
