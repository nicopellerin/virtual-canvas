import * as React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaDollarSign } from 'react-icons/fa'

import { Image } from '../../modules/types'

interface Props {
  selectedImage: Image
}

export const ProfileInfo: React.FC<Props> = ({ selectedImage }) => {
  return (
    <Wrapper>
      <Content>
        <Name backgroundColor={selectedImage?.background ? true : false}>
          {selectedImage?.name}
        </Name>
        <Price backgroundColor={selectedImage?.background ? true : false}>
          {selectedImage?.price > 0 && `${selectedImage?.price}$`}
        </Price>
        {selectedImage?.buyLink && (
          <a href={selectedImage?.buyLink} target="_blank" rel="nofollower">
            <BuyNow>
              <FaDollarSign style={{ marginRight: 3 }} />
              Buy now
            </BuyNow>
          </a>
        )}
      </Content>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 3rem;
`

const Content = styled.div`
  display: flex;
  align-items: center;
`

const Name = styled.h2`
  color: ${(props: { backgroundColor: boolean }) =>
    props.backgroundColor ? '#333' : '#f4f4f4'};
  margin-right: 3rem;
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
  background: #623cea;
  color: #f4f4f4;
  padding: 0.9em 1.1em;
  border-radius: 5px;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
`
