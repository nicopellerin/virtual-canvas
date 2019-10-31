import React, { useState, useEffect, useContext } from "react"
import { Router } from "@reach/router"
import axios from "axios"
import uuid from "uuid/v4"
import cookie from "js-cookie"

import { MainScene } from "../../components/main-scene"
import { ArtworkContext } from "../../context/artwork-context"
import PrivateRoute from "../../components/private-route"
import SEO from "../../components/seo"

const IndexAppPage = () => {
  const [photoUploaded, setPhotoUploaded] = useState<boolean>(false)
  const [checkedBackground] = useState<boolean>(false)
  const [photoPreview, setPhotoPreview] = useState<string>("")
  const [photoRatio, setPhotoRatio] = useState<number>(0)
  const [photoGallery, setPhotoGallery] = useState<Photo[]>([])
  const [loader, setLoader] = useState<string>("")
  const [loaded, setLoaded] = useState<boolean>(false)
  const [errMsg, setErrMsg] = useState<string>("")
  const [uploaded, setUploaded] = useState(true)

  const { setArtworkName } = useContext(ArtworkContext)

  const user = false

  const handlePhotoUpload = async (e: React.FormEvent<HTMLFontElement>) => {
    const { files } = e.target as HTMLInputElement

    const token = cookie.getJSON("vc_token")

    const maxAllowedSize = 5 * 1024 * 1024
    if (files[0].size > maxAllowedSize) {
      setErrMsg("Maximum file size is 5mb")
      return null
    }

    if (!user) {
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

        console.log("INFO", info)

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

  const getAllArtwork = async () => {
    const token = cookie.getJSON("vc_token")

    const res = await axios.get("https://api.virtualcanvas.app/api/account", {
      headers: {
        "Content-Type": "application/json",
        Token: token,
      },
    })

    if (res && res.data && res.data.images && res.data.images.length > 0) {
      setUploaded(true)
      setPhotoGallery(res.data.images)
      setPhotoPreview(res.data.images[0].src)
      setPhotoRatio(res.data.images[0].ratio)
      setArtworkName(res.data.images[0].name)
    }
  }

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
          checkedBackground={checkedBackground}
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
