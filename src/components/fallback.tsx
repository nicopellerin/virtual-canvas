import React from 'react'
import { Dom } from 'react-three-fiber'
import styled, { keyframes } from 'styled-components'

const Fallback = () => {
  return (
    <Dom>
      <Loader>Loading...</Loader>
    </Dom>
  )
}

export default Fallback

// Styles
const delay = keyframes`
from {
  opacity: 0;
}
  to {
    opacity: 1;
  }
`

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 100vw;
  height: 100vh;
  font-size: 3rem;
  font-weight: 800;
  opacity: 0;
  animation: ${delay} 10ms 1000ms forwards ease-in-out;
  transition: opacity 300ms ease-in-out;
`
