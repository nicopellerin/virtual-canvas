import * as React from 'react'
import { useState } from 'react'
import { Router } from '@reach/router'
import axios from 'axios'
import uuid from 'uuid/v4'
import cookie from 'js-cookie'
import { observer } from 'mobx-react-lite'

import { MainScene } from '../../components/main-scene'
import PrivateRoute from '../../components/private-route'
import SEO from '../../components/seo'

import { useStores } from '../../stores/useStores'
import { GraphQLClient } from 'graphql-request'
import { clientUrl } from '../../utils/utils'
import { queryCache } from 'react-query'
import useUserProfile from '../../hooks/useUserProfile'

const IndexAppPage: React.FC = () => {
  // const { loader, setLoader, setLoaded, setErrMsg, setUploaded } = useContext(
  //   ArtworkContext
  // )
  const [loader, setLoader] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const { artworkStore, userStore } = useStores()

  const { data, error } = useUserProfile()

  console.log(data, error)

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    const token = cookie.getJSON('vc_token')

    const maxAllowedSize = 5 * 1024 * 1024
    if (files[0].size > maxAllowedSize) {
      setErrMsg('Maximum file size is 5mb')
      return null
    }

    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'virtual_canvas')

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dl9mctxsb/image/upload',
        data,
        {
          onUploadProgress: progressEvent => {
            setLoader(
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                '%'
            )
            if (progressEvent.loaded === progressEvent.total) {
              setLoader('Finished uploading :)')
              setTimeout(() => {
                setLoader('')
              }, 1000)
            }
          },
        }
      )

      artworkStore.imageInfo.photoPreview = res.data.secure_url
      artworkStore.imageInfo.photoRatio = res.data.width / res.data.height

      const client = new GraphQLClient(clientUrl, {
        headers: {
          Token: token,
        },
      })

      const query = `
    mutation addArtwork($input: AddArtworkInput!){
      addArtwork(input: $input) {
          id
          src
          name
          ratio
          border
          texture
          background
          rotate
          lighting
      }
    }
    `
      const variables = {
        input: {
          username: userStore.username,
          id: uuid(),
          name: '',
          ratio: res.data.width / res.data.height,
          src: res.data.secure_url,
          border: false,
          rotate: false,
          texture: false,
          background: false,
          lighting: '3',
        },
      }

      const { addArtwork } = await client.request(query, variables)

      queryCache.setQueryData('userProfile', old => ({
        ...old,
        images: [...old.images, addArtwork],
      }))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <SEO
        title="Editor | Virtual Canvas"
        description="Turn your art into a virtual 3D canvas"
      />
      <Router>
        <PrivateRoute
          path="/editor/:username"
          username={userStore.username}
          component={MainScene}
          handlePhotoUpload={handlePhotoUpload}
          loader={loader}
        />
      </Router>
    </>
  )
}

export default observer(IndexAppPage)
