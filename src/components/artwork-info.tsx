import React from 'react'
import styled from 'styled-components'

export const ArtworkInfo: React.FC = ({selectedImage}) => {

  return (
    <Wrapper>
      <Name
        backgroundColor={selectedImage?.image?.background ? true : false}
      >
        {selectedImage?.name}
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
