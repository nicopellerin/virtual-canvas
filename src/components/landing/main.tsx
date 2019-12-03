import React, { useRef, useState, Suspense } from 'react'
import { MdCloudUpload } from 'react-icons/md'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import BG from '../../images/toile.jpg'
import Back from '../../images/back.png'

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

  // const springAnimation = { type: 'spring', stiffness: 10, damping: 150 }

  const containerVariants = {
    before: {},
    after: { transition: { staggerChildren: 0.1 } },
  }
  const letterVariants = {
    before: {
      opacity: 0,
      y: 50,
      // x: 50,
      transition: {
        type: 'string',
        damping: 26,
        stiffness: 200,
      },
    },
    after: {
      opacity: 1,
      y: 0,
      // x: 10,
      transition: {
        type: 'spring',
        damping: 46,
        stiffness: 200,
      },
    },
  }

  return (
    <Wrapper>
      <Container>
        <Content
          variants={containerVariants}
          initial={'before'}
          animate={'after'}
        >
          <TitleWrapper>
            <Title
              height={26}
              background={''}
              style={{ position: 'relative' }}
              variants={letterVariants}
            >
              Bring your
            </Title>
            <Title
              height={26}
              background={''}
              style={{ position: 'relative' }}
              variants={letterVariants}
            >
              art to life.
            </Title>
          </TitleWrapper>
          <Subtitle
            width="auto"
            height={26}
            background={''}
            style={{ position: 'relative' }}
            variants={letterVariants}
          >
            Turn your 2D art into 3D. Signup to try now.
          </Subtitle>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInputRef}
            accept="image/x-png,image/jpeg"
            onChange={e => {
              handlePhotoUpload(e)
            }}
          />
          {/* <UploadButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            height={26}
            background={''}
            style={{ position: 'relative' }}
            variants={letterVariants}
          >
            <CloudUploadIcon />
            Upload image
          </UploadButton> */}
        </Content>
        <motion.img
          src={Back}
          alt="Background"
          style={{
            // borderRadius: 5,
            // boxShadow: '0 0 15px rgba(0,0,0,0.3)',
            opacity: 0,
          }}
          width={700}
          animate={{
            opacity: [0, 1],
            y: [20, 0],
            scale: [0.9, 1.05, 1],
            transition: { delay: 0.2 },
          }}
        />
      </Container>
    </Wrapper>
  )
}

export default Main

// Styles
const Wrapper = styled.div`
  max-width: 160rem;
  margin: 0 auto;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-column-gap: 2rem;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Content = styled(motion.div)`
  position: relative;
  z-index: 10;
  /* opacity: 0; */
`

const TitleWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  /* max-width: 40rem; */
`

const Title = styled(motion.h1)`
  font-size: 7.3rem;
  margin: 0;
`

const Subtitle = styled(motion.h2)`
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
