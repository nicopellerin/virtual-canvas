import { useState, useEffect } from 'react'
import { queryCache } from 'react-query'

interface Image {
  src: string
  id: string
  lighting: string
  name: string
  ratio: number
  rotate: boolean
  texture: boolean
  border: boolean
  background: boolean
}

export default function useSelectedImage() {
  const userProfile = queryCache.getQueryData('userProfile')

  useEffect(() => {
    setSelectedImage(userProfile?.images[0])
  }, [userProfile])

  const [selectedImage, setSelectedImage] = useState<Image | null>(null)

  const selectImage = (image) => {
    setSelectedImage(image)
  }

  return [selectedImage, selectImage]
}
