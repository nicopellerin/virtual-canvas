import React, { useState, useContext, Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import axios from "axios"
import uuid from "uuid/v4"

import { HomeCard } from "./home-card"
import { MainScene } from "./main-scene"
import { ArtworkContext } from "../context/artwork-context"

interface Props {
  setUploaded: Dispatch<SetStateAction<boolean>>
  uploaded: boolean
}

interface Photo {
  src: string
  ratio: number
}

export const Home: React.FC<Props> = ({ setUploaded, uploaded }) => {
  const [photoUploaded, setPhotoUploaded] = useState<boolean>(false)
  const [checkedBackground] = useState<boolean>(false)
  const [photoPreview, setPhotoPreview] = useState<string>("")
  const [photoRatio, setPhotoRatio] = useState<number>(0)
  const [photoGallery, setPhotoGallery] = useState<Photo[]>([])
  const [loader, setLoader] = useState(null)
  const [loaded, setLoaded] = useState(false)

  const { setArtworkName } = useContext(ArtworkContext)

  const handlePhotoUpload = async (e: React.FormEvent<HTMLFontElement>) => {
    const { files } = e.target as HTMLInputElement

    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "virtual_canvas")

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dl9mctxsb/image/upload",
        data,
        {
          onUploadProgress: progressEvent => {
            setLoader(
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                "%"
            )
            if (loader === 100 + "%") {
              setLoader("Finished uploading :)")
              setLoaded(true)
              setTimeout(() => {
                setLoader("")
              }, 1000)
            }
          },
        }
      )

      setPhotoPreview(res.data.secure_url)
      setPhotoRatio(res.data.width / res.data.height)

      setPhotoUploaded(true)
      setUploaded(true)

      const image = {
        id: uuid(),
        name: "",
        ratio: res.data.width / res.data.height,
        src: res.data.secure_url,
      }

      const info = await axios.post("http://localhost:4000/artwork", image, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      setPhotoGallery([...photoGallery, JSON.parse(info.config.data)])
      setPhotoUploaded(false)
      setArtworkName("")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <MainParent uploaded={uploaded ? true : false}>
      {!uploaded ? (
        <Wrapper photoUploaded={uploaded ? true : false}>
          <HomeCard
            handlePhotoUpload={handlePhotoUpload}
            setUploaded={setUploaded}
            loader={loader}
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
          setUploaded={setUploaded}
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
