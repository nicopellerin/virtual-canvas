import React from 'react'
import styled from 'styled-components'

import { useStores } from '../stores/useStores'

export const ArtworkInfo: React.FC = () => {
  const { artworkStore } = useStores()

  return (
    <Wrapper>
      <Name
        backgroundColor={artworkStore.imageInfo.backgroundColor ? true : false}
      >
        {artworkStore.imageInfo.artworkName}
      </Name>
    </Wrapper>
  )
}

// Styles
const Wrapper = styled.div`
  position: absolute;
  left: 3rem;
  bottom: 2rem;
`

const Name = styled.h2`
  color: ${(props: { backgroundColor: boolean }) =>
    props.backgroundColor ? '#333' : '#f4f4f4'};
`
