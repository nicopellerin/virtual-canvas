import * as React from 'react'
import { Router } from '@reach/router'
import cookie from 'js-cookie'

import { ProfileScene } from '../../components/profile/profile-scene'
import SEO from '../../components/seo'

import { usernameFromPathname as username } from '../../utils/utils'
import { ProfileProvider } from '../../context/profile-context'

const ProfileIndexPage = () => {
  const token = cookie.get('vc_token')
  return (
    <>
      <SEO
        title={`${username} | Virtual Canvas`}
        description="Turn your art into a virtual 3D canvas"
      />
      <ProfileProvider>
        <Router>
          <ProfileScene
            path="/profile/:username"
            username={username}
            token={token}
          />
          <ProfileScene path="/profile/:username/:id" username={username} />
        </Router>
      </ProfileProvider>
    </>
  )
}

export default ProfileIndexPage
