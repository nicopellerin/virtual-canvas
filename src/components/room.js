import React, { useState, useEffect } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

let loaded = false

const Room = ({ show }) => {
  const [model, setModel] = useState()

  useEffect(() => {
    new GLTFLoader().load("/other/scene.gltf", setModel)
  }, [])

  return model ? (
    <primitive
      visible={show}
      scale={[0.8, 0.8, 0.8]}
      object={model.scene}
      position={[280, -15, -160.3]}
      rotation={[-Math.PI / 2, Math.PI / 2, Math.PI / 2]}
    />
  ) : null
}

export default Room
