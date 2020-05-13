import * as React from 'react'
import { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import { useQuery, queryCache } from 'react-query'
import { GraphQLClient } from 'graphql-request'
import { clientUrl } from '../utils/utils'
import { UserProfile } from '../modules/types'

export const EditorContext = React.createContext(null)

export const EditorProvider = ({ children }) => {
  const token: string = cookie.getJSON('vc_token')
  const username: string = cookie.getJSON('vc_user')

  const client = new GraphQLClient(clientUrl, {
    headers: {
      Token: token,
    },
  })

  const updateUser = async ({
    username,
    facebook,
    website,
    instagram,
  }): Promise<{ msg: string }> => {
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

  const getUserProfil = async (): Promise<UserProfile> => {
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

  useQuery('userProfile', getUserProfil)

  const userProfile = queryCache.getQueryData('userProfile') as UserProfile

  const isPublicProfile = false

  return (
    <EditorContext.Provider
      value={{
        userProfile,
        updateUser,
        username,
        isPublicProfile,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}
