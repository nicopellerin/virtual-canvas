import React, { useState, Dispatch, SetStateAction, ReactElement } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import { HomeCard } from "./home-card"
import { MainScene } from "./main-scene"

interface Props {
  setUploaded: Dispatch<SetStateAction<boolean>>
  uploaded: boolean
}

interface Photo {
  src: string
  ratio: number
}

export const Home = ({ setUploaded, uploaded }: Props) => {
  const [photoUploaded, setPhotoUploaded] = useState<boolean>(false)
  const [checkedBackground] = useState<boolean>(false)
  const [photoPreview, setPhotoPreview] = useState<string>("")
  const [photoRatio, setPhotoRatio] = useState<number>(0)
  const [photoGallery, setPhotoGallery] = useState<Photo[]>([])

  const handlePhotoUpload = (e: React.FormEvent<HTMLFontElement>) => {
    const { files } = e.target as HTMLInputElement

    let img = new Image()
    img.onload = function() {
      setPhotoRatio(this.width / this.height)
    }

    img.src = URL.createObjectURL(files && files[0])
    setPhotoPreview(img.src)
    setPhotoUploaded(true)
  }

  return (
    <MainParent uploaded={uploaded ? true : false}>
      {!uploaded ? (
        <Wrapper photoUploaded={uploaded ? true : false}>
          <HomeCard
            handlePhotoUpload={handlePhotoUpload}
            setUploaded={setUploaded}
          />
        </Wrapper>
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
    </MainParent>
  )
}

// Styles
const MainParent = styled.div`
  display: grid;
`

const Wrapper = styled(motion.div)`
  background: ${(props: { photoUploaded: boolean }) =>
    props.photoUploaded ? "none" : "#f4f4f4"};
  padding: ${(props: { photoUploaded: boolean }) =>
    props.photoUploaded ? 0 : "0 6rem"};
  display: flex;
  justify-content: center;
  min-height: 42rem;
  min-width: 40vw;
  border-radius: 25px;
  box-shadow: ${(props: { photoUploaded: boolean }) =>
    props.photoUploaded ? "none" : "0 0 15px rgba(0, 0, 0, 0.15)"};
  transition: padding 1000ms;

  @media (max-width: 700px) {
    min-width: 320px;
    padding: 0 1rem;
  }
`
