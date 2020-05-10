import { observable, action } from 'mobx'
import cookie from 'js-cookie'
import { GraphQLClient } from 'graphql-request'

const token: string = cookie.getJSON('vc_token')
const usernameRef: string = cookie.getJSON('vc_user')

let usernameURLRef: string
if (typeof window !== 'undefined') {
  usernameURLRef = window.location.href.split('/')[4]
}

const client = new GraphQLClient('http://localhost:8080/query', {
  headers: {
    Token: token,
  },
})

export class UserStore {
  @observable username = usernameRef || usernameURLRef
  @observable userToken = ''
  @observable socialLinks = { instagram: '', facebook: '', website: '' }

  @action
  async getUserProfile() {
    try {
      const query = `
      query getUser($input: UsernameInput){
        getUser(input: $input) {
          email
          username
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
          username: this.username,
        },
      }

      const { getUser } = await client.request(query, variables)

      this.socialLinks = {
        instagram: getUser.social.instagram,
        facebook: getUser.social.facebook,
        website: getUser.social.website,
      }
    } catch (err) {
      console.log(err)
    }
  }

  @action
  async updateUserProfile() {
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
          username: this.username,
          facebook: this.socialLinks.facebook,
          website: this.socialLinks.website,
          instagram: this.socialLinks.instagram,
        },
      }

      await client.request(query, variables)

      return { msg: 'Profile updated' }
    } catch (err) {
      console.error(err)
    }
  }
}
