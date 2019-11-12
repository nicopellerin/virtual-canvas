import React, { useRef, useState } from 'react'
import { MdCloudUpload } from 'react-icons/md'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import BG from '../../images/toile.jpg'

import DemoScene from './demo-scene'

const Main = () => {
  const [photoPreview, setPhotoPreview] = useState(BG)
  const [photoRatio, setPhotoRatio] = useState(0.7481622651783283)

  const fileInputRef = useRef(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target as HTMLInputElement

    let img = new Image()
    img.onload = function() {
      setPhotoRatio(this.width / this.height)
    }

    img.src = URL.createObjectURL(files && files[0])
    setPhotoPreview(img.src)
  }

  return (
    <Wrapper>
      <Container>
        <Content>
          <Title>Bring your art to life.</Title>
          <Subtitle>Turn your 2D art into 3D. Try it out below.</Subtitle>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInputRef}
            accept="image/x-png,image/jpeg"
            onChange={e => {
              handlePhotoUpload(e)
            }}
          />
          <UploadButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <CloudUploadIcon />
            Upload image
          </UploadButton>
        </Content>
        <DemoScene photoPreview={photoPreview} photoRatio={photoRatio} />
      </Container>
    </Wrapper>
  )
}

export default Main

// Styles
const Wrapper = styled.div`
  max-width: 140rem;
  margin: 0 auto;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  grid-column-gap: 15rem;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`

const Content = styled.div`
  position: relative;
  z-index: 10;
`

const Title = styled.h1`
  font-size: 7.3rem;
  max-width: 40rem;
  margin-bottom: 0;
`

const Subtitle = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 3rem;
`

const UploadButton = styled(motion.button)`
  background: #623cea;
  padding: 1.5rem 3.8rem;
  min-width: 205px;
  border: none;
  color: ghostwhite;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  border-radius: 5px;
  box-shadow: 0 5px #4923d1;
  cursor: pointer;

  @media (max-width: 700px) {
    font-size: 1.4rem;
    padding: 1.2rem 3rem;
  }
`

const CloudUploadIcon = styled(MdCloudUpload)`
  font-size: 2rem;
  margin-right: 8px;

  @media (max-width: 700px) {
    font-size: 1.8rem;
    margin-right: 7px;
  }
`