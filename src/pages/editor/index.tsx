import * as React from 'react'
import { Router } from '@reach/router'
import { ReactQueryDevtools } from 'react-query-devtools'

import { MainScene } from '../../components/main-scene'
import PrivateRoute from '../../components/private-route'
import SEO from '../../components/seo'

import { usernameFromPathname } from '../../utils/utils'
import useUserProfile from '../../hooks/useUserProfile'

const IndexAppPage: React.FC = () => {
  useUserProfile()

  return (
    <>
      <SEO
        title="Editor | Virtual Canvas"
        description="Turn your art into a virtual 3D canvas"
      />
      <Router>
        <PrivateRoute
          path="/editor/:username"
          username={usernameFromPathname}
          component={MainScene}
        />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export default IndexAppPage
