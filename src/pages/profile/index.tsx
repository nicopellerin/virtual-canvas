import * as React from 'react'
import { Router, useLocation } from '@reach/router'
import cookie from 'js-cookie'

import { ProfileScene } from '../../components/profile/profile-scene'
import SEO from '../../components/seo'

import usePublicProfile from '../../hooks/usePublicProfile'

const ProfileIndexPage = () => {
  const { pathname } = useLocation()
  const username = pathname.split('/').pop()
  const token = cookie.get('vc_token')

  const res = usePublicProfile(username)
  console.log(res)
  return (
    <>
      <SEO
        title={`${username} | Virtual Canvas`}
        description="Turn your art into a virtual 3D canvas"
      />
      <Router>
        <ProfileScene
          path="/profile/:username"
          username={username}
          token={token}
        />
        <ProfileScene path="/profile/:username/:id" username={username} />
      </Router>
    </>
  )
}

export default ProfileIndexPage
