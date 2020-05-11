import React, { useContext, useEffect, useState } from 'react'
import { Router } from '@reach/router'

import { ProfileScene } from '../../components/profile/profile-scene'
import SEO from '../../components/seo'

import { useStores } from '../../stores/useStores'
import useUserProfile from '../../hooks/useUserProfile'

const ProfileIndexPage = () => {
  const { userStore, artworkStore } = useStores()

  useEffect(() => {
    artworkStore.getAllArtwork()
  }, [artworkStore])

  const { status, data, error, isFetching } = useUserProfile()

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
          username={username}
          // photoGallery={photoGallery}
          // setPhotoGallery={setPhotoGallery}
          // photoPreview={photoPreview}
          // setPhotoPreview={setPhotoPreview}
          // photoRatio={photoRatio}
          // setPhotoRatio={setPhotoRatio}
        />
      </Router>
    </>
  )
}

export default ProfileIndexPage
