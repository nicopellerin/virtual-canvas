import React from "react"
import styled from "styled-components"

import LogoCanvas from "../images/canvas.svg"
import LogoCanvasDark from "../images/canvas-dark.svg"

interface Props {
  backgroundColor: boolean
}

export const Logo = ({ backgroundColor }: Props) => {
  return (
    <Wrapper>
      <img src={backgroundColor ? LogoCanvasDark : LogoCanvas} width={40} />
    </Wrapper>
  )
}

export default Logo

// Styles
const Wrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`
