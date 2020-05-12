import { useRef, useEffect } from 'react'
import { queryCache, useMutation } from 'react-query'
import { useImmer } from 'use-immer'
import cookie from 'js-cookie'
import { GraphQLClient } from 'graphql-request'

import useUserProfile from './useUserProfile'
import usePublicProfile from './usePublicProfile'

import { clientUrl, isPublicProfile } from '../utils/utils'
import { Image, PublicProfile, UserProfile } from '../modules/types'

const token: string = cookie.getJSON('vc_token')
const username: string = cookie.getJSON('vc_user')

const client = new GraphQLClient(clientUrl, {
  headers: {
    Token: token,
  },
})

const updateImageDB = async (image: Image) => {
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

  const { updateArtwork } = await client.request(query, {
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

  return { updateArtwork }
}

const initialState = {
  src: '',
  id: '',
  lighting: 3,
  name: '',
  ratio: 0,
  rotate: false,
  texture: false,
  border: false,
  background: false,
}

export default function useSelectedImage() {
  const { isFetching: isFetchingUserProfile } = useUserProfile()
  const { isFetching: isFetchingPublicProfile } = usePublicProfile()

  const userProfile = queryCache.getQueryData('userProfile') as UserProfile
  const publicProfile = queryCache.getQueryData(
    'publicProfile'
  ) as PublicProfile

  const [updateImageDBMutation] = useMutation(updateImageDB, {
    onSuccess: () => {
      queryCache.refetchQueries('userProfile')
    },
  })

  const [selectedImage, setSelectedImage] = useImmer(initialState)

  let firstLoad = useRef(true)

  const firstImage = isPublicProfile
    ? publicProfile?.images[0]
    : userProfile?.images[0]

  const isFetching = isPublicProfile
    ? isFetchingPublicProfile
    : isFetchingUserProfile

  useEffect(() => {
    if (!isFetching && firstLoad.current && firstImage) {
      setSelectedImage(() => firstImage)
      firstLoad.current = false
    }
  }, [isFetching])

  useEffect(() => {
    ;(async () => {
      if (!firstLoad.current && userProfile?.images?.length > 0) {
        await updateImageDBMutation(selectedImage)
      }
    })()
  }, [selectedImage])

  const selectImage = image => {
    if (!image) {
      setSelectedImage(() => initialState)
      return
    }

    setSelectedImage(() => image)
  }

  const updateImage = async (attr, val) => {
    setSelectedImage(draft => {
      draft[attr] = val
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
