import React, { useState, useMemo, createContext, ReactNode } from 'react'

export const ArtworkContext = createContext(null)

interface Props {
  children: ReactNode
}

interface Photo {
  id: string
  src: string
  ratio: number
  name: string
}

export const ArtworkProvider = ({ children }: Props) => {
  const [checkedBackground, setCheckedBackground] = useState<boolean>(false)
  const [rotateCanvas, setRotateCanvas] = useState<boolean>(true)
  const [lightIntensity, setLightIntensity] = useState<number>(0)
  const [showTexture, setShowTexture] = useState<boolean>(true)
  const [showBorder, setShowBorder] = useState<boolean>(true)
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

  const value = useMemo(() => {
    return {
      checkedBackground,
      setCheckedBackground,
      rotateCanvas,
      setRotateCanvas,
      lightIntensity,
      setLightIntensity,
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
    }
  }, [
    checkedBackground,
    rotateCanvas,
    lightIntensity,
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
  ])

  return (
    <ArtworkContext.Provider value={value}>{children}</ArtworkContext.Provider>
  )
}
