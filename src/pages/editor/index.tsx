import * as React from 'react'
import { Router } from '@reach/router'
import { ReactQueryDevtools } from 'react-query-devtools'

import { MainScene } from '../../components/main-scene'
import PrivateRoute from '../../components/private-route'
import SEO from '../../components/seo'

import { usernameFromPathname } from '../../utils/utils'
import { EditorProvider } from '../../context/editor-context'

const IndexAppPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Editor | Virtual Canvas"
        description="Turn your art into a virtual 3D canvas"
      />
      <EditorProvider>
        <Router>
          <PrivateRoute
            path="/editor/:username"
            username={usernameFromPathname}
            component={MainScene}
          />
        </Router>
      </EditorProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export default IndexAppPage
