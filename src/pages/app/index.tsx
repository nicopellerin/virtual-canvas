import React, { useState, useEffect, useContext } from "react"
import { Router } from "@reach/router"
import axios from "axios"
import uuid from "uuid/v4"
import cookie from "js-cookie"

import { MainScene } from "../../components/main-scene"
import PrivateRoute from "../../components/private-route"
import SEO from "../../components/seo"
import { ProfileScene } from "../../components/profile/profile-scene"

import { ArtworkContext } from "../../context/artwork-context"
import { UserContext } from "../../context/user-context"

interface Photo {
  id: string
  src: string
  ratio: number
  name: string
}

const IndexAppPage: React.FC = () => {
  const [photoUploaded, setPhotoUploaded] = useState<boolean>(false)
  const [photoPreview, setPhotoPreview] = useState<string>("")
  const [photoRatio, setPhotoRatio] = useState<number>(0)
  const [photoGallery, setPhotoGallery] = useState<Photo[]>([])
  const [loader, setLoader] = useState<string>("")
  const [, setLoaded] = useState<boolean>(false)
  const [, setErrMsg] = useState<string>("")
  const [, setUploaded] = useState(true)

  const { setArtworkName } = useContext(ArtworkContext)
  const { userToken } = useContext(UserContext)

  const handlePhotoUpload = async (e: React.FormEvent<HTMLFontElement>) => {
    const { files } = e.target as HTMLInputElement

    const token = cookie.getJSON("vc_token")

    const maxAllowedSize = 5 * 1024 * 1024
    if (files[0].size > maxAllowedSize) {
      setErrMsg("Maximum file size is 5mb")
      return null
    }

    if (token) {
      const data = new FormData()
      data.append("file", files[0])
      data.append("upload_preset", "virtual_canvas")

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dl9mctxsb/image/upload",
          data,
          {
            onUploadProgress: progressEvent => {
              setLoader(
                Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                  "%"
              )
              if (progressEvent.loaded === progressEvent.total) {
                setLoader("Finished uploading :)")
                setLoaded(true)
                setTimeout(() => {
                  setLoader("")
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
          name: "",
          ratio: res.data.width / res.data.height,
          src: res.data.secure_url,
        }

        const info = await axios.post(
          "https://api.virtualcanvas.app/api/add",
          image,
          {
            headers: {
              "Content-Type": "application/json",
              Token: token,
            },
          }
        )

        setPhotoGallery([...photoGallery, JSON.parse(info.config.data)])
        setPhotoUploaded(false)
        setArtworkName("")
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

  // Fetch all images from database
  const getAllArtwork = async () => {
    const token = cookie.getJSON("vc_token")

    const res = await axios.get("https://api.virtualcanvas.app/api/account", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Token: token,
      },
    })

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
        title="Account | Virtual Canvas"
        description="Turn your art into a virtual 3D canvas"
      />
      <Router>
        <PrivateRoute
          path="/app"
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
        <PrivateRoute
          path="/app/profile"
          component={ProfileScene}
          setPhotoGallery={setPhotoGallery}
          photoPreview={photoPreview}
          setPhotoPreview={setPhotoPreview}
          photoGallery={photoGallery}
          photoRatio={photoRatio}
          setPhotoRatio={setPhotoRatio}
        />
      </Router>
    </>
  )
}

export default IndexAppPage
