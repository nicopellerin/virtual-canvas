import React, { useState, useMemo, createContext, ReactNode } from "react"

export const ArtworkContext = createContext()

interface Props {
  children: ReactNode
}

export const ArtworkProvider = ({ children }: Props) => {
  const [checkedBackground, setCheckedBackground] = useState<boolean>(false)
  const [rotateCanvas, setRotateCanvas] = useState<boolean>(true)
  const [lightIntensity, setLightIntensity] = useState<number>(4)
  const [showTexture, setShowTexture] = useState<boolean>(true)
  const [showBorder, setShowBorder] = useState<boolean>(true)
  const [artworkName, setArtworkName] = useState<string>("")

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
    }
  }, [
    checkedBackground,
    rotateCanvas,
    lightIntensity,
    showTexture,
    showBorder,
    artworkName,
  ])

  return (
    <ArtworkContext.Provider value={value}>{children}</ArtworkContext.Provider>
  )
}
