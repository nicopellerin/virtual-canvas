import React from 'react'
import styled from 'styled-components'

import Navbar from './navbar'
import Main from './main'
import Footer from './footer'

const HomeIndex = () => {
  return (
    <Layout>
      <Navbar />
      <Main />
      <Footer />
    </Layout>
  )
}

export default HomeIndex

// Styles
const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 7rem 1fr 5rem;
`
