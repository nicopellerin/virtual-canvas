import React, { useRef, useState, useEffect, Suspense } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Canvas, extend, useThree, useRender } from "react-three-fiber"
import { WEBVR } from "./WebVR"
import uniforms from "../three/uniforms"

import { Sidebar } from "./sidebar"
import { Box } from "./box"
import { Logo } from "./logo"
import Room from "./room"
import Gallery from "./gallery"
import Tips from "./tips"

uniforms.init(THREE)

export const MainScene = ({
  photoPreview,
  handlePhotoUpload,
  photoRatio,
  photoGallery,
  setPhotoPreview,
  setPhotoRatio,
  setPhotoGallery,
  setPhotoUploaded,
  photoUploaded,
}) => {
  extend({ OrbitControls })

  useEffect(() => {
    if (photoRatio && photoUploaded) {
      setPhotoGallery([
        ...photoGallery,
        { src: photoPreview, ratio: photoRatio },
      ])
      setPhotoUploaded(false)
    }
  }, [photoRatio])

  const [checkedBackground, setCheckedBackground] = useState<Boolean>(false)
  const [setUploaded] = useState<Boolean>(true)
  const [rotateCanvas, setRotateCanvas] = useState<Boolean>(true)
  const [lightIntensity, setLightIntensity] = useState<Number>(4)
  const [showTexture, setShowTexture] = useState<Boolean>(true)
  const [showBorder, setShowBorder] = useState<Boolean>(true)

  // const { gl, scene, camera } = useThree()

  // const mouse = useRef([0, 0])
  // const onMouseMove = useCallback(
  //   ({ clientX: x, clientY: y }) =>
  //     (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
  //   []
  // )

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
    const orbitRef = useRef()
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

  // Directional light
  const RectAreaLightDecl = ({
    color = "white",
    intensity = 1,
    width = 1000,
    height = 1000,
    position = [0, 0, 0],
    lookAt = [0, 0, 0],
  }) => {
    return (
      <rectAreaLight
        intensity={intensity}
        position={position}
        color={color}
        width={width}
        height={height}
        delay={2}
        penumbra={1}
        onUpdate={self => self.lookAt(...lookAt)}
      />
    )
  }

  return (
    <div>
      <Canvas
        id="main-image"
        // vr
        camera={{ position: [0, -4, -1] }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
          document.body.appendChild(WEBVR.createButton(gl))
        }}
      >
        <ambientLight intensity={0.8} />
        <hemisphereLight intensity={0.2} />
        {/* <Suspense fallback={null}>
          <Room show={checkedBackground} />
        </Suspense> */}
        <Suspense fallback={null}>
          <Box
            url={photoPreview}
            photoRatio={photoRatio}
            showTexture={showTexture}
            showBorder={showBorder}
          />
          <Controls rotate={rotateCanvas} />
        </Suspense>
        {/* <RectAreaLightDecl /> */}
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
      <Logo />
      <Sidebar
        handlePhotoUpload={handlePhotoUpload}
        setUploaded={setUploaded}
        checkedBackground={checkedBackground}
        setPhotoUploaded={setPhotoUploaded}
        setCheckedBackground={setCheckedBackground}
        setRotateCanvas={setRotateCanvas}
        rotateCanvas={rotateCanvas}
        lightIntensity={lightIntensity}
        setLightIntensity={setLightIntensity}
        showTexture={showTexture}
        setShowTexture={setShowTexture}
        showBorder={showBorder}
        setShowBorder={setShowBorder}
      />
      <Gallery
        setPhotoRatio={setPhotoRatio}
        setPhotoPreview={setPhotoPreview}
        photoGallery={photoGallery}
      />
    </div>
  )
}