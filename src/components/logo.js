import React from "react"
import styled from "styled-components"

import LogoCanvas from "../images/canvas.svg"

export const Logo = () => {
  return (
    <Wrapper>
      <img src={LogoCanvas} alt="logo" width={40} />
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
