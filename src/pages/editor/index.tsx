import * as React from 'react'
import { Router } from '@reach/router'
import { queryCache } from 'react-query'

import { MainScene } from '../../components/main-scene'
import PrivateRoute from '../../components/private-route'
import SEO from '../../components/seo'

import useUserProfile from '../../hooks/useUserProfile'

const IndexAppPage: React.FC = () => {
  useUserProfile()
  const userProfile = queryCache.getQueryData('userProfile')

  return (
    <>
      <SEO
        title="Editor | Virtual Canvas"
        description="Turn your art into a virtual 3D canvas"
      />
      <Router>
        <PrivateRoute
          path="/editor/:username"
          username={userProfile?.username}
          component={MainScene}
        />
      </Router>
    </>
  )
}

export default IndexAppPage
