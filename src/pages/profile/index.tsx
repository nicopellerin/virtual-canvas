import * as React from 'react'
import { Router } from '@reach/router'
import cookie from 'js-cookie'

import { ProfileScene } from '../../components/profile/profile-scene'
import SEO from '../../components/seo'

import { usernameFromPathname as username } from '../../utils/utils'
import usePublicProfile from '../../hooks/usePublicProfile'

const ProfileIndexPage = () => {
  const token = cookie.get('vc_token')
  const userToken = cookie.get('vc_user')

  usePublicProfile({ username })

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
          userToken={userToken}
        />
      </Router>
    </>
  )
}

export default ProfileIndexPage
