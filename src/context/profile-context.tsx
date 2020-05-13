import * as React from 'react'
import { useQuery, queryCache } from 'react-query'
import { GraphQLClient } from 'graphql-request'

import { UserProfile, PublicProfile } from '../modules/types'

import { usernameFromPathname as username, clientUrl } from '../utils/utils'

export const ProfileContext = React.createContext(null)

export const ProfileProvider = ({ children }) => {
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

  useQuery('publicProfile', getPublicProfile)

  const profile = queryCache.getQueryData('publicProfile') as UserProfile

  const isPublicProfile = true

  return (
    <ProfileContext.Provider
      value={{
        profile,
        username,
        isPublicProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}
