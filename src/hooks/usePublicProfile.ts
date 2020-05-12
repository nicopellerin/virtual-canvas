import { useQuery } from 'react-query'
import { GraphQLClient } from 'graphql-request'

import { PublicProfile } from '../modules/types'
import { clientUrl, isPublicProfile } from '../utils/utils'

const client = new GraphQLClient(clientUrl)

import { usernameFromPathname as username } from '../utils/utils'

const getPublicProfile = async (): Promise<PublicProfile> => {
  const query = `
      query getPublicProfile($input: UsernameInput){
        getPublicProfile(input: $input) {
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

  const { getPublicProfile } = await client.request(query, variables)

  return getPublicProfile
}

const usePublicProfile = () => {
  return useQuery(isPublicProfile && 'publicProfile', getPublicProfile)
}

export default usePublicProfile
