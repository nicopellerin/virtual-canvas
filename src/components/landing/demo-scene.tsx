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

import { DemoBox } from './demo-box'

const DemoScene = ({ photoPreview, photoRatio }) => {
  extend({ OrbitControls })

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
        autoRotateSpeed={0.3}
        enableDamping
        dampingFactor={0.05}
        enableKeys
        minDistance={3}
        maxDistance={5.8}
        minPolarAngle={THREE.Math.degToRad(70)}
        maxPolarAngle={THREE.Math.degToRad(90)}
        minAzimuthAngle={THREE.Math.degToRad(-80)}
        maxAzimuthAngle={THREE.Math.degToRad(20)}
        args={[camera, gl.domElement]}
        ref={orbitRef}
        zoomEnabled={false}
      />
    )
  }

  return (
    <div id="demo-home" style={{ position: 'absolute', right: 0 }}>
      <Canvas
        id="demo-image"
        camera={[0, -4, 8]}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >
        <ambientLight intensity={0.8} />
        <Suspense fallback={null}>
          <DemoBox url={photoPreview} photoRatio={photoRatio} />
          <Controls />
        </Suspense>
        <spotLight
          castShadow
          position={[-15, 0, 50]}
          penumbra={0}
          intensity={0.1}
          lightColor="#fff"
        />
        {/* <pointLight
          direction={[0, 0, 0]}
          distance={20}
          intensity={0.8}
          color="white"
        /> */}
      </Canvas>
    </div>
  )
}

export default DemoScene
