import React, { useContext, useEffect, useState } from 'react'
import { Router } from '@reach/router'

import { ProfileScene } from '../../components/profile/profile-scene'
import SEO from '../../components/seo'

import { useStores } from '../../stores/useStores'
import useUserProfile from '../../hooks/useUserProfile'

const ProfileIndexPage = () => {
  const { data } = useUserProfile()

  return (
    <>
      <SEO
        title={`${data?.username} | Virtual Canvas`}
        description="Turn your art into a virtual 3D canvas"
      />
      <Router>
        <ProfileScene path="/profile/:username" username={data?.username} />
        <ProfileScene
          path="/profile/:username/:id"
          username={data?.username}
        />
      </Router>
    </>
  )
}

export default ProfileIndexPage
