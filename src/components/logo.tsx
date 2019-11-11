import React from "react"
import styled from "styled-components"

import LogoCanvas from "../images/canvas.svg"
import LogoCanvasDark from "../images/canvas-dark.svg"
import LogoText from "../images/logo-text.svg"

interface Props {
  backgroundColor: boolean
  full: boolean
}

export const Logo: React.FC<Props> = ({ backgroundColor, full }) => {
  return (
    <Wrapper>
      {full ? (
        <img src={backgroundColor ? LogoText : LogoText} width={275} />
      ) : (
        <img src={backgroundColor ? LogoCanvasDark : LogoCanvas} width={40} />
      )}
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
