import React from 'react'
import styled from 'styled-components'

import Landing from '../components/landing'
import SEO from '../components/seo'

const IndexPage = () => {
  return (
    <>
      <SEO
        title="Virtual Canvas | Bring your art to life"
        description="Bring your art to life"
      />
      <Landing />
    </>
  )
}

export default IndexPage

// Styles
const Wrapper = styled.div`
  background: ${(props: { uploaded: boolean; background: string }) =>
    props.uploaded
      ? '#000004'
      : `linear-gradient(45deg, rgba(255,255,255,0.9) 0%, rgba(246,246,246,0.92) 47%, rgba(237,237,237,0.95) 100%), url(${props.background})`};
  background-size: cover;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
