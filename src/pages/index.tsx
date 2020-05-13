import React from 'react'

import Landing from '../components/landing'
import SEO from '../components/seo'

const IndexPage = () => {
  return (
    <>
      <SEO
        title="Virtual Canvas | Bring your art to life"
        description="Turn your 2D art into a 3D canvas."
      />
      <Landing />
    </>
  )
}

export default IndexPage
