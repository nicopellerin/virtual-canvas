import { useQuery, queryCache } from 'react-query'
import { GraphQLClient } from 'graphql-request'

import { clientUrl, isPublicProfile } from '../utils/utils'

const client = new GraphQLClient(clientUrl)

const getPublicProfile = async username => {
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

const usePublicProfile = username => {
  return useQuery(isPublicProfile && 'publicProfile', () =>
    getPublicProfile(username)
  )
}

export default usePublicProfile
