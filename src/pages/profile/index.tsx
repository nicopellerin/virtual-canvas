import * as React from 'react'
import { Router } from '@reach/router'
import cookie from 'js-cookie'

import { ProfileScene } from '../../components/profile/profile-scene'
import SEO from '../../components/seo'

import usePublicProfile from '../../hooks/usePublicProfile'
import { usernameFromPathname as username } from '../../utils/utils'

const ProfileIndexPage = () => {
  usePublicProfile()

  const token = cookie.get('vc_token')

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
