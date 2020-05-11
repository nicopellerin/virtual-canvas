import { useQuery, queryCache } from 'react-query'
import cookie from 'js-cookie'
import { GraphQLClient } from 'graphql-request'

import { clientUrl } from '../utils/utils'

const token: string = cookie.getJSON('vc_token')
const username: string = cookie.getJSON('vc_user')

const client = new GraphQLClient(clientUrl, {
  headers: {
    Token: token,
  },
})

export const updateUser = async ({
  username,
  facebook,
  website,
  instagram,
}) => {
  try {
    const query = `
    mutation updateUser($input: UpdateUserInput!){
      updateUser(
        input: $input
      ) {
        id
      }
    }
    `
    const variables = {
      input: {
        username,
        facebook,
        website,
        instagram,
      },
    }

    await client.request(query, variables)

    queryCache.setQueryData('userProfile', old => ({
      ...old,
      social: { instagram, facebook, website },
    }))

    return { msg: 'Profile updated' }
  } catch (err) {
    console.error(err)
  }
}

const getUserProfil = async () => {
  const query = `
      query getUser($input: UsernameInput){
        getUser(input: $input) {
          email
          username
          images {
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
          social {
            website
            facebook
            instagram
          }
        }
      }
      `
  const variables = {
    input: {
      username,
    },
  }

  const { getUser } = await client.request(query, variables)

  return getUser
}

export default function useUserProfile() {
  return useQuery('userProfile', getUserProfil)
}
