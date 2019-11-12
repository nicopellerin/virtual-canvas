import React, { useContext, useEffect, useState } from 'react'
import { Router } from '@reach/router'
import cookie from 'js-cookie'
import axios from 'axios'

import { ProfileScene } from '../../components/profile/profile-scene'
import SEO from '../../components/seo'

import { ArtworkContext } from '../../context/artwork-context'

const ProfileIndexPage = () => {
  const {
    photoGallery,
    setPhotoGallery,
    photoPreview,
    setPhotoPreview,
    photoRatio,
    setPhotoRatio,
    setUploaded,
    setArtworkName,
  } = useContext(ArtworkContext)

  const [profileTitle, setProfileTitle] = useState('')

  // Get username from url
  let username
  useEffect(() => {
    username = window.location.href.split('/').pop()
    setProfileTitle(username)
  }, [])

  // Fetch all images from database
  const getAllArtwork = async () => {
    const token = cookie.getJSON('vc_token')

    const res = await axios.get(
      `https://api.virtualcanvas.app/api/account/${username}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Token: token,
        },
      }
    )

    // If images, add all images to photoGallery state
    if (res && res.data && res.data.images && res.data.images.length > 0) {
      setUploaded(true)
      setPhotoGallery(res.data.images)
      setPhotoPreview(res.data.images[0].src)
      setPhotoRatio(res.data.images[0].ratio)
      setArtworkName(res.data.images[0].name)
    }
  }

  // Run function to fetch all images on load
  useEffect(() => {
    getAllArtwork()
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
      </Router>
    </>
  )
}

export default ProfileIndexPage
