import React, { useEffect, useContext } from 'react'
import { Router } from '@reach/router'
import axios from 'axios'
import uuid from 'uuid/v4'
import cookie from 'js-cookie'
import { observer } from 'mobx-react-lite'

import { MainScene } from '../../components/main-scene'
import PrivateRoute from '../../components/private-route'
import SEO from '../../components/seo'

import { ArtworkContext } from '../../context/artwork-context'
import { useStores } from '../../stores/useStores'

const IndexAppPage: React.FC = () => {
  const { loader, setLoader, setLoaded, setErrMsg, setUploaded } = useContext(
    ArtworkContext
  )

  const { artworkStore, userStore } = useStores()

  useEffect(() => {
    artworkStore.getAllArtwork()
  }, [artworkStore])

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
              setLoaded(true)
              setTimeout(() => {
                setLoader('')
              }, 1000)
            }
          },
        }
      )

      artworkStore.imageInfo.photoPreview = res.data.secure_url
      artworkStore.imageInfo.photoRatio = res.data.width / res.data.height
      setUploaded(true)

      const image = {
        id: uuid(),
        name: '',
        ratio: res.data.width / res.data.height,
        src: res.data.secure_url,
        border: false,
        rotate: false,
        texture: false,
        background: false,
      }

      const info = await axios.post(
        'https://api.virtualcanvas.app/api/add',
        image,
        {
          headers: {
            'Content-Type': 'application/json',
            Token: token,
          },
        }
      )

      artworkStore.updateGalleryState([
        ...artworkStore.imageInfo.photoGallery,
        JSON.parse(info.config.data),
      ])
      artworkStore.imageInfo.artworkName = ''
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
