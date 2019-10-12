import React, { useState, useEffect } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

let loaded = false

const Room = ({ show }) => {
  const [model, setModel] = useState()

  useEffect(() => {
    if (show && !loaded) {
      new GLTFLoader().load("/new/scene.gltf", setModel)
      loaded = true
    }
  }, [show])

  return model ? (
    <primitive
      visible={show}
      scale={[1, 1, 1]}
      object={model.scene}
      position={[6, -70, 9.3]}
      rotation={[-Math.PI / 2, Math.PI / 2, Math.PI / 2]}
    />
  ) : null
}

export default Room
