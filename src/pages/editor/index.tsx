import React, { useEffect, useContext } from 'react'
import { Router } from '@reach/router'
import axios from 'axios'
import uuid from 'uuid/v4'
import cookie from 'js-cookie'

import { MainScene } from '../../components/main-scene'
import PrivateRoute from '../../components/private-route'
import SEO from '../../components/seo'

import { ArtworkContext } from '../../context/artwork-context'
import { UserContext } from '../../context/user-context'

const IndexAppPage: React.FC = () => {
  const {
    setArtworkName,
    photoUploaded,
    setPhotoUploaded,
    photoPreview,
    setPhotoPreview,
    photoRatio,
    setPhotoRatio,
    photoGallery,
    setPhotoGallery,
    loader,
    setLoader,
    setLoaded,
    setErrMsg,
    setUploaded,
  } = useContext(ArtworkContext)
  const { user } = useContext(UserContext)

  const handlePhotoUpload = async (e: React.FormEvent<HTMLFontElement>) => {
    const { files } = e.target as HTMLInputElement

    const token = cookie.getJSON('vc_token')

    const maxAllowedSize = 5 * 1024 * 1024
    if (files[0].size > maxAllowedSize) {
      setErrMsg('Maximum file size is 5mb')
      return null
    }

    if (token) {
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

        setPhotoPreview(res.data.secure_url)
        setPhotoRatio(res.data.width / res.data.height)
        setPhotoUploaded(true)
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

        setPhotoGallery([...photoGallery, JSON.parse(info.config.data)])
        setPhotoUploaded(false)
        setArtworkName('')
      } catch (err) {
        console.error(err)
      }
    } else {
      let img = new Image()
      img.onload = function() {
        setPhotoRatio(this.width / this.height)
      }

      img.src = URL.createObjectURL(files && files[0])
      setPhotoPreview(img.src)
      setPhotoUploaded(true)
      setUploaded(true)
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
          username={user}
          component={MainScene}
          setPhotoGallery={setPhotoGallery}
          photoPreview={photoPreview}
          setPhotoPreview={setPhotoPreview}
          handlePhotoUpload={handlePhotoUpload}
          photoGallery={photoGallery}
          photoRatio={photoRatio}
          setPhotoRatio={setPhotoRatio}
          photoUploaded={photoUploaded}
          setPhotoUploaded={setPhotoUploaded}
          setUploaded={setUploaded}
          loader={loader}
        />
      </Router>
    </>
  )
}

export default IndexAppPage
