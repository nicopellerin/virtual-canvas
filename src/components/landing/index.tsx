import React from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import cookie from 'js-cookie'

import Navbar from './navbar'
import Main from './main'
import Footer from './footer'

const token = cookie.getJSON('vc_token')
const username = cookie.getJSON('vc_user')

const HomeIndex = () => {
  if (token && username) {
    if (typeof window !== 'undefined') {
      navigate(`/editor/${username}`)
    }
    return null
  }

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
