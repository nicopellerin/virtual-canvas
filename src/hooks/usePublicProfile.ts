import { useQuery } from 'react-query'
import { GraphQLClient } from 'graphql-request'

import { clientUrl } from '../utils/utils'
import { PublicProfile } from '../modules/types'

const usePublicProfile = ({ username }) => {
  const client = new GraphQLClient(clientUrl)

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
            price
            buyLink
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

  return useQuery('publicProfile', getPublicProfile)
}

export default usePublicProfile
