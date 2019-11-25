import React, {
  useState,
  useContext,
  useMemo,
  useEffect,
  createContext,
  ReactNode,
} from 'react'
import axios from 'axios'
import cookie from 'js-cookie'
import useSWR from 'swr'

import { UserContext } from './user-context'

export const ArtworkContext = createContext(null)

interface Props {
  children: ReactNode
}

interface Photo {
  id: string
  src: string
  ratio: number
  name: string
  rotate: boolean
  border: boolean
  texture: boolean
  background: boolean
  lighting: string
}

export const ArtworkProvider = ({ children }: Props) => {
  const [checkedBackground, setCheckedBackground] = useState<boolean>(false)
  const [rotateCanvas, setRotateCanvas] = useState<boolean>(false)
  const [lightIntensity, setLightIntensity] = useState<string>('0')
  const [light, setLight] = useState<string>('0')
  const [showTexture, setShowTexture] = useState<boolean>(false)
  const [showBorder, setShowBorder] = useState<boolean>(false)
  const [artworkName, setArtworkName] = useState<string>('')
  const [artworkPrice, setArtworkPrice] = useState<number>(0)
  const [backgroundColor, setBackgroundColor] = useState<boolean>(false)
  const [rotateIncrement, setRotateIncrement] = useState<boolean>(false)
  const [photoUploaded, setPhotoUploaded] = useState<boolean>(false)
  const [photoPreview, setPhotoPreview] = useState<string>('')
  const [photoRatio, setPhotoRatio] = useState<number>(0)
  const [photoGallery, setPhotoGallery] = useState<Photo[]>([])
  const [loader, setLoader] = useState<string>('')
  const [loaded, setLoaded] = useState<boolean>(false)
  const [errMsg, setErrMsg] = useState<string>('')
  const [uploaded, setUploaded] = useState(true)
  const [queryId, setQueryId] = useState('')

  const { setSocialLinks } = useContext(UserContext)

  // Fetch all data ------------------------------------
  let username
  if (typeof window !== 'undefined') {
    username = window.location.href.split('/')[4]
  }
  const fetcher = url => fetch(url).then(r => r.json())
  const { data } = useSWR(
    `https://api.virtualcanvas.app/api/account/${username}`,
    fetcher
  )

  const getAllArtwork = async () => {
    if (data && data.images && data.images.length > 0) {
      if (queryId) {
        const photo = data.images.find(url => url.id === queryId)
        setPhotoGallery(data.images)
        setPhotoPreview(photo.src)
        setPhotoRatio(photo.ratio)
        setArtworkName(photo.name)
        setBackgroundColor(photo.background)
        setRotateIncrement(photo.rotate)
        setShowBorder(photo.border)
        setShowTexture(photo.texture)
        setLightIntensity(photo.lighting)
        setSocialLinks({
          instagram: data.social_links.instagram,
          facebook: data.social_links.facebook,
          website: data.social_links.website,
        })
      } else {
        setPhotoGallery(data.images)
        setPhotoPreview(data.images[0].src)
        setPhotoRatio(data.images[0].ratio)
        setArtworkName(data.images[0].name)
        setBackgroundColor(data.images[0].background)
        setRotateIncrement(data.images[0].rotate)
        setShowBorder(data.images[0].border)
        setShowTexture(data.images[0].texture)
        setLightIntensity(data.images[0].lighting)
        setSocialLinks({
          instagram: data.social_links.instagram,
          facebook: data.social_links.facebook,
          website: data.social_links.website,
        })
      }
    }
  }

  useEffect(() => {
    getAllArtwork()
  }, [data])

  // Sidebar actions -----------------------------------------------
  useEffect(() => {
    const token = cookie.getJSON('vc_token')
    const photo = photoGallery.find(url => url.src === photoPreview)

    if (photo) {
      photo.background = backgroundColor
      photo.texture = showTexture
      photo.border = showBorder
      photo.rotate = rotateIncrement
      photo.lighting = light

      const update = async () =>
        await axios.patch(
          `https://api.virtualcanvas.app/api/artwork/${photo.id}`,
          photo,
          {
            headers: {
              Token: token,
            },
          }
        )
      update()
    }
  }, [backgroundColor, showTexture, showBorder, rotateIncrement, light])

  const value = useMemo(() => {
    return {
      checkedBackground,
      setCheckedBackground,
      rotateCanvas,
      setRotateCanvas,
      lightIntensity,
      setLightIntensity,
      light,
      setLight,
      showTexture,
      setShowTexture,
      showBorder,
      setShowBorder,
      artworkName,
      setArtworkName,
      artworkPrice,
      setArtworkPrice,
      backgroundColor,
      setBackgroundColor,
      rotateIncrement,
      setRotateIncrement,
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
      loaded,
      setLoaded,
      errMsg,
      setErrMsg,
      uploaded,
      setUploaded,
      username,
      queryId,
      setQueryId,
      data,
    }
  }, [
    checkedBackground,
    rotateCanvas,
    lightIntensity,
    light,
    showTexture,
    showBorder,
    artworkName,
    artworkPrice,
    backgroundColor,
    rotateIncrement,
    photoUploaded,
    photoPreview,
    photoRatio,
    photoGallery,
    setPhotoGallery,
    loader,
    loaded,
    errMsg,
    uploaded,
    username,
    queryId,
    data,
  ])

  return (
    <ArtworkContext.Provider value={value}>{children}</ArtworkContext.Provider>
  )
}
