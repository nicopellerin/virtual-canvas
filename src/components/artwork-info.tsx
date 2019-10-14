import React, { useContext } from "react"
import styled from "styled-components"

import { ArtworkContext } from "../context/artwork-context"

export const ArtworkInfo = () => {
  const { artworkName, backgroundColor } = useContext(ArtworkContext)

  return (
    <Wrapper>
      <Name backgroundColor={backgroundColor ? true : false}>
        {artworkName}
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
  color: ${props => (props.backgroundColor ? "#333" : "#f4f4f4")};
`
