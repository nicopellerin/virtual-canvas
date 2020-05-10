import React from 'react'
import cookie from 'js-cookie'
import { navigate } from 'gatsby'

const authCookie = cookie.getJSON('vc_token')

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (!authCookie) {
    if (typeof window !== 'undefined') {
      navigate('/login')
    }
    return null
  }

  return (
    <>
      <Component {...rest} />
    </>
  )
}

export default PrivateRoute
