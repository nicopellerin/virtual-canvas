import React, { useState } from "react"
import styled from "styled-components"

import { Home } from "../components/home"
import SEO from "../components/seo"

const IndexPage = () => {
  const [uploaded, setUploaded] = useState(false)

  return (
    <>
      <SEO
        title="virtualcanvas"
        description="Turn your art into a virtual 3D canvas"
      />
      <Wrapper uploaded={uploaded ? 1 : 0}>
        <Home uploaded={uploaded} setUploaded={setUploaded} />
      </Wrapper>
    </>
  )
}

export default IndexPage

// Styles
const Wrapper = styled.div`
  background: ${props => (props.uploaded ? "#000901" : "#fff")};
  background-size: cover;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
