import React from 'react'

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
