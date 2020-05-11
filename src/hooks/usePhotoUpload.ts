import { queryCache } from "react-query"
import axios from 'axios'
import uuid from 'uuid/v4'
import cookie from 'js-cookie'
import { GraphQLClient } from 'graphql-request'

import { clientUrl } from '../utils/utils'

const usePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, setErrMsg, setLoader) => {
  const { files } = e.target

  const token = cookie.getJSON('vc_token')

  const userProfile = queryCache.getQueryData('userProfile')


  const maxAllowedSize = 5 * 1024 * 1024
  if (files[0].size > maxAllowedSize) {
    // setErrMsg('Maximum file size is 5mb')
    return null
  }

  const data = new FormData()
  data.append('file', files[0])
  data.append('upload_preset', 'virtual_canvas')

  try {
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dl9mctxsb/image/upload',
      data,
      {
        onUploadProgress: progressEvent => {
          setLoader(
            Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              '%'
          )
          if (progressEvent.loaded === progressEvent.total) {
            setLoader('Finished uploading :)')
            setTimeout(() => {
              setLoader('')
            }, 1000)
          }
        },
      }
    )


    const client = new GraphQLClient(clientUrl, {
      headers: {
        Token: token,
      },
    })

    const query = `
  mutation addArtwork($input: AddArtworkInput!){
    addArtwork(input: $input) {
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
    const variables = {
      input: {
        username: userProfile?.username,
        id: uuid(),
        name: '',
        ratio: res.data.width / res.data.height,
        src: res.data.secure_url,
        border: false,
        rotate: false,
        texture: false,
        background: false,
        lighting: '3',
      },
    }

    const { addArtwork } = await client.request(query, variables)

    queryCache.setQueryData('userProfile', old => ({
      ...old,
      images: [...old.images, addArtwork],
    }))
  } catch (err) {
    console.error(err)
  }
}

export default usePhotoUpload