import React, { useEffect, useState } from "react"
import axios from "axios"
import cookie from "js-cookie"

const ProfilePage = () => {
  const [userArtwork, setUserArtwork] = useState([])

  const getAllArtwork = async () => {
    const token = cookie.getJSON("vc_token")

    const res = await axios.get("https://api.virtualcanvas.app/api/account", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Token: token,
      },
    })

    if (res && res.data && res.data.images && res.data.images.length > 0) {
      setUserArtwork(prevState => [...prevState, res.data.images])
      // setUploaded(true)
      // setPhotoGallery(res.data.images)
      // setPhotoPreview(res.data.images[0].src)
      // setPhotoRatio(res.data.images[0].ratio)
      // setArtworkName(res.data.images[0].name)
    }
  }

  useEffect(() => {
    getAllArtwork()
  }, [])

  return (
    <div>
      <h1>Profile page</h1>
    </div>
  )
}

export default ProfilePage
