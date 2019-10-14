import React, { useContext } from "react"
import styled from "styled-components"

import { ArtworkContext } from "../context/artwork-context"

export const ArtworkInfo = () => {
  const { artworkName } = useContext(ArtworkContext)

  return (
    <Wrapper>
      <Name>{artworkName}</Name>
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
  color: #f4f4f4;
`
