import React from 'react'
import { MdCloudUpload } from 'react-icons/md'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import Back from '../../images/back.png'

const Main = () => {
  return (
    <Wrapper>
      <Container>
        <Content>
          <TitleWrapper>
            <Title height={26} background={''} style={{ position: 'relative' }}>
              Bring your
            </Title>
            <Title height={26} background={''} style={{ position: 'relative' }}>
              art to life.
            </Title>
          </TitleWrapper>
          <Subtitle
            width="auto"
            height={26}
            background={''}
            style={{ position: 'relative' }}
          >
            Turn your 2D art into a 3D canvas. Signup to try now.
          </Subtitle>
        </Content>
        <motion.img src={Back} alt="Background" width={650} />
      </Container>
    </Wrapper>
  )
}

export default Main

// Styles
const Wrapper = styled.div`
  max-width: 130rem;
  margin: 0 auto;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-column-gap: 10rem;
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
