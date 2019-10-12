import React, { useState, useRef } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import { HomeCard } from "./home-card"
import { MainScene } from "./main-scene"

export const Home = ({ setUploaded, uploaded }) => {
  const [photoUploaded, setPhotoUploaded] = useState(false)
  const [checkedBackground] = useState(false)
  const [photoPreview, setPhotoPreview] = useState()
  const [photoRatio, setPhotoRatio] = useState(0)
  const [photoGallery, setPhotoGallery] = useState([])

  const handlePhotoUpload = e => {
    const { files } = e.target

    let img = new Image()
    img.onload = function() {
      setPhotoRatio(this.width / this.height)
    }

    img.src = URL.createObjectURL(files[0])
    setPhotoPreview(img.src)
    setPhotoUploaded(true)
  }

  return (
    <MainParent uploaded={uploaded ? 1 : 0}>
      <Wrapper photoUploaded={uploaded ? 1 : 0}>
        {!uploaded ? (
          <HomeCard
            handlePhotoUpload={handlePhotoUpload}
            setUploaded={setUploaded}
          />
        ) : (
          <MainScene
            setPhotoGallery={setPhotoGallery}
            photoPreview={photoPreview}
            checkedBackground={checkedBackground}
            setPhotoPreview={setPhotoPreview}
            handlePhotoUpload={handlePhotoUpload}
            photoGallery={photoGallery}
            photoRatio={photoRatio}
            setPhotoRatio={setPhotoRatio}
            photoUploaded={photoUploaded}
            setPhotoUploaded={setPhotoUploaded}
          />
        )}
      </Wrapper>
      <Tag photoUploaded={uploaded ? 1 : 0}>
        Made in Montreal by Nico Pellerin :)
      </Tag>
    </MainParent>
  )
}

// Styles
const MainParent = styled.div`
  display: grid;
`

const Wrapper = styled(motion.div)`
  background: ${props => (props.photoUploaded ? "none" : "#111")};
  padding: ${props => (props.photoUploaded ? 0 : "0 6rem")};
  display: flex;
  justify-content: center;
  min-height: 42rem;
  min-width: 55vw;
  border-radius: 25px;
  box-shadow: ${props =>
    props.photoUploaded ? "none" : "0 0 15px rgba(0, 0, 0, 0.15)"};
  transition: padding 1000ms;
`

const Tag = styled.h6`
  display: ${props => (props.photoUploaded ? "none" : "block")};
  margin-top: 40px;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 400;
  color: #666;
  letter-spacing: 2.3px;
`
