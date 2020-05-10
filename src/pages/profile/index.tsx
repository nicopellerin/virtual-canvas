import React, { useContext, useEffect, useState } from 'react'
import { Router } from '@reach/router'

import { ProfileScene } from '../../components/profile/profile-scene'
import SEO from '../../components/seo'

import { ArtworkContext } from '../../context/artwork-context'
import { useStores } from '../../stores/useStores'

const ProfileIndexPage = () => {
  const {
    photoGallery,
    setPhotoGallery,
    photoPreview,
    setPhotoPreview,
    photoRatio,
    setPhotoRatio,
  } = useContext(ArtworkContext)

  const { userStore } = useStores()

  const [profileTitle, setProfileTitle] = useState('')

  // Get username from url
  let username
  useEffect(() => {
    username = window.location.href.split('/')[4]
    setProfileTitle(username)
    userStore.getUserProfile()
  }, [])

  return (
    <>
      <SEO
        title={`${profileTitle} | Virtual Canvas`}
        description="Turn your art into a virtual 3D canvas"
      />
      <Router>
        <ProfileScene
          path="/profile/:username"
          username={username}
          photoGallery={photoGallery}
          setPhotoGallery={setPhotoGallery}
          photoPreview={photoPreview}
          setPhotoPreview={setPhotoPreview}
          photoRatio={photoRatio}
          setPhotoRatio={setPhotoRatio}
        />
        <ProfileScene
          path="/profile/:username/:id"
          username={username}
          photoGallery={photoGallery}
          setPhotoGallery={setPhotoGallery}
          photoPreview={photoPreview}
          setPhotoPreview={setPhotoPreview}
          photoRatio={photoRatio}
          setPhotoRatio={setPhotoRatio}
        />
      </Router>
    </>
  )
}

export default ProfileIndexPage
