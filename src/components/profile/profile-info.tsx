import React, { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { ArtworkContext } from '../../context/artwork-context'
import { useStores } from '../../stores/useStores'

export const ProfileInfo: React.FC = () => {
  const { artworkStore } = useStores()

  return (
    <Wrapper>
      <Content>
        <Name
          backgroundColor={
            artworkStore.imageInfo.backgroundColor ? true : false
          }
        >
          {artworkStore.imageInfo.artworkName}
        </Name>
        {/* <Price backgroundColor={backgroundColor ? true : false}>0,00$</Price>
        <BuyNow>Buy now</BuyNow> */}
      </Content>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 2rem;
`

const Content = styled.div`
  display: flex;
  align-items: center;
`

const Name = styled.h2`
  color: ${(props: { backgroundColor: boolean }) =>
    props.backgroundColor ? '#333' : '#f4f4f4'};
  /* margin-right: 3rem; */
`

const Price = styled.span`
  color: ${(props: { backgroundColor: boolean }) =>
    props.backgroundColor ? '#333' : '#f4f4f4'};
  font-size: 1.8rem;
  margin-right: 3rem;
  user-select: none;
`

const BuyNow = styled(motion.button)`
  border: none;
  padding: 7px 12px;
  border-radius: 5px;
  font-size: 1.4rem;
  font-weight: bold;
`
