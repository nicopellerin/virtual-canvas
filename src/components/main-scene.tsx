import React, {
  useRef,
  useContext,
  useEffect,
  Suspense,
  Dispatch,
  SetStateAction,
} from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Canvas, extend, useThree, useRender } from "react-three-fiber"
import { WEBVR } from "./WebVR"
import uuid from "uuid/v4"

import { Sidebar } from "./sidebar"
import { ArtworkInfo } from "./artwork-info"
import { Box } from "./box"
import { Logo } from "./logo"
import Gallery from "./gallery"
import Tips from "./tips"

import { ArtworkContext } from "../context/artwork-context"
import AddArtwork from "./add-artwork"

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
}

interface Photo {
  id: number
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
  photoUploaded,
  setPhotoUploaded,
  handlePhotoUpload,
  setUploaded,
}) => {
  extend({ OrbitControls })

  const {
    checkedBackground,
    rotateCanvas,
    lightIntensity,
    showTexture,
    showBorder,
    setArtworkName,
    backgroundColor,
    rotateIncrement,
  } = useContext(ArtworkContext)

  useEffect(() => {
    if (photoRatio && photoUploaded) {
      setPhotoGallery([
        ...photoGallery,
        { id: uuid(), src: photoPreview, ratio: photoRatio, name: "" },
      ])
      setPhotoUploaded(false)
      setArtworkName("")
    }
  }, [photoRatio])

  // function saveAsImage(gl, scene, camera) {
  //   var w = window.open("", "")
  //   w.document.title = "Screenshot"
  //   //w.document.body.style.backgroundColor = "red";
  //   var img = new Image()
  //   let canvas
  //   img.onload = function() {
  //     canvas = document.querySelector("#main-image")
  //     console.log(canvas)
  //   }
  //   // Without 'preserveDrawingBuffer' set to true, we must render now
  //   // gl.render(scene, camera)
  //   // img.src = canvas.toDataURL()
  //   console.log("IMG", img)
  //   w.document.body.appendChild(img)
  // }

  // Control canvas
  const Controls = ({ rotate }: { rotate: boolean }) => {
    const orbitRef = useRef(null)
    const { camera, gl } = useThree()

    useRender(() => {
      if (orbitRef.current) {
        orbitRef.current.update()
      }
    }, false)

    return (
      <orbitControls
        autoRotate={rotate}
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

  return (
    <div>
      <Canvas
        style={{
          background: backgroundColor
            ? "linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%"
            : "#000004",
        }}
        id="main-image"
        // vr
        camera={{
          position: window.innerWidth > 800 ? [0, -4, -1] : [0, -4, 8],
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
          // document.body.appendChild(WEBVR.createButton(gl))
        }}
      >
        <ambientLight intensity={0.8} />
        <hemisphereLight intensity={0.2} />
        <Suspense fallback={null}>
          <Box
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
      <Tips />
      <Logo backgroundColor={backgroundColor} />
      <Sidebar
        handlePhotoUpload={handlePhotoUpload}
        checkedBackground={checkedBackground}
        setPhotoUploaded={setPhotoUploaded}
        photoGallery={photoGallery}
        setPhotoGallery={setPhotoGallery}
        photoPreview={photoPreview}
      />
      <Gallery
        photoGallery={photoGallery}
        setPhotoGallery={setPhotoGallery}
        setPhotoRatio={setPhotoRatio}
        setPhotoPreview={setPhotoPreview}
      />
      <ArtworkInfo />
      {photoGallery.length === 0 && (
        <AddArtwork
          handlePhotoUpload={handlePhotoUpload}
          setUploaded={setUploaded}
        />
      )}
    </div>
  )
}
