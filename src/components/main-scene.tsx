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
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, extend, useThree, useRender } from 'react-three-fiber'
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

import useSelectedImage from '../hooks/useSelectedImage'

import { observer } from 'mobx-react-lite'

interface Props {
  photoUploaded: boolean
  setUploaded: Dispatch<SetStateAction<boolean>>
  loader: string
  errMsg: string
}

export const MainScene: React.FC<Props> =
  ({ setUploaded, loader, errMsg }) => {
    extend({ OrbitControls })

    const {selectedImage, selectImage, updateImage} = useSelectedImage()
    const userProfile = queryCache.getQueryData('userProfile')


    const [screenShot, setScreenShot] = useState()
    const [snap, setSnap] = useState(false)


    // const { lightIntensity } = useContext(ArtworkContext)

    // Temp
    // const lightIntensity = 3

    const getPhoto = React.useCallback(
      gl => {
        setScreenShot(gl.domElement.toDataURL('image/jpeg'))
        setSnap(false)
      },
      [screenShot]
    )


    const saveToFile = async () => {
      await save(
        screenShot,
        `${selectedImage?.image?.name || 'virtual-canvas'}.jpg`
      )
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
        Number(
          selectedImage?.image?.background ? '0xffffff' : '0x000004'
        ),
        1
      )

      useRender(() => {
        if (orbitRef.current) {
          orbitRef.current.update()
        }
      }, false)

      return (
        <orbitControls
          enableDamping
          dampingFactor={0.05}
          enableKeys
          minDistance={1}
          maxDistance={7.8}
          minPolarAngle={THREE.Math.degToRad(70)}
          maxPolarAngle={THREE.Math.degToRad(90)}
          minAzimuthAngle={THREE.Math.degToRad(-50)}
          maxAzimuthAngle={THREE.Math.degToRad(50)}
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
              url={selectedImage?.image?.src}
              photoRatio={selectedImage?.image?.ratio}
              showTexture={selectedImage?.image?.texture}
              showBorder={selectedImage?.image?.border}
              rotateIncrement={selectedImage?.image?.rotate}
              getPhoto={getPhoto}
              snap={snap}
            />
            <Controls />
          </Suspense>
          <spotLight
            castShadow
            position={[-15, 0, 50]}
            penumbra={0}
            intensity={Number(selectedImage?.image?.lighting) / 100}
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
        <Logo backgroundColor={selectedImage?.image?.background} />
        <Sidebar
          loader={loader}
          setSnap={setSnap}
          selectedImage={selectedImage}
          updateImage={updateImage}
          errMsg={errMsg}
        />
        <Gallery selectImage={selectImage} selectedImage={selectedImage}/>
        <Menu />
        <ArtworkInfo selectedImage={selectedImage?.image} />
        {userProfile?.images?.length === 0 && (
          <AddArtwork
            handlePhotoUpload={handlePhotoUpload}
            setUploaded={setUploaded}
            loader={loader}
          />
        )}
      </div>
    )
  }

