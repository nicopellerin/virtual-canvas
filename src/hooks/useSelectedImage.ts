import { useRef, useEffect } from 'react'
import { queryCache, useMutation } from 'react-query'
import { useImmer } from 'use-immer'
import cookie from 'js-cookie'
import { GraphQLClient } from 'graphql-request'

import { clientUrl } from '../utils/utils'
import useUserProfile from './useUserProfile'

const token: string = cookie.getJSON('vc_token')
const username: string = cookie.getJSON('vc_user')

const client = new GraphQLClient(clientUrl, {
  headers: {
    Token: token,
  },
})

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

const updateImageDB = async (
  image
) => {
  const query = `
      mutation updateArtwork($input: UpdateArtworkInput!) {
        updateArtwork(
          input: $input
        ) {
          id
          src
          name
          ratio
          border
          texture
          background
          rotate
          lighting
        }
      }
    `

  const {updateArtwork} = await client.request(query, {
    input: {
      id: image.id,
      src: image.src,
      name: image.name,
      ratio: image.ratio,
      border: image.border,
      texture: image.texture,
      background: image.background,
      rotate: image.rotate,
      lighting: image.lighting,
      username,
    },
  })

  return {updateArtwork}
}

export default function useSelectedImage() {
  const {data, isFetching, isStale} = useUserProfile()

  const userProfile = queryCache.getQueryData('userProfile')
  const [mutate] = useMutation(updateImageDB, {
    onSuccess: () => {
      queryCache.refetchQueries('userProfile')
    },
  })

  const [selectedImage, setSelectedImage] = useImmer({
    image: {
      src: '',
      id: '',
      lighting: '',
      name: '',
      ratio: 0,
      rotate: false,
      texture: false,
      border: false,
      background: false,
    },
  })

  let firstLoad = useRef(true)

  useEffect(() => {
    if(!isFetching && firstLoad.current) {
      setSelectedImage(draft => {
        draft.image = userProfile?.images[0]
      })
      firstLoad.current = false
    } 
  }, [isFetching])

  useEffect(() => {
    (async () => {
      if(!firstLoad.current) {
      await mutate(selectedImage?.image)
      }
    })()
  }, [selectedImage])

  const selectImage = image => {
    const img = data?.images?.find(i => i.id === image.id)
    setSelectedImage(draft => {
      draft.image = image
    })
  }

  const updateImage = async (attr, val) => {
    setSelectedImage(draft => {
      draft.image[attr] = val
    })
  }

  const removeImage = async (e, id: string) => {
    e.stopPropagation()

    const query = `
      mutation deleteArtwork($input: DeleteArtworkInput) {
        deleteArtwork(
          input: $input
        ) {
            id
        }
      }
    `

    await client.request(query, {
      input: {
        username,
        id,
      },
    })

    queryCache.setQueryData('userProfile', old => ({
      ...old,
      images: old.images.filter(image => image.id !== id),
    }))
  }

  return {
    selectedImage,
    setSelectedImage,
    selectImage,
    updateImage,
    removeImage,
  }
}
