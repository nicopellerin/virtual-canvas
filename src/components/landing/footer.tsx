import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <Wrapper>
      <Text>
        &copy; {new Date().getFullYear()} Virtual Canvas. Made in Montreal by
        Nico Pellerin.
      </Text>
    </Wrapper>
  )
}

export default Footer

// Styles
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 10;
`

const Text = styled.span`
  font-size: 1.4rem;
`
