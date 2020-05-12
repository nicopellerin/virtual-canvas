// import { observable, action, runInAction, computed, toJS } from 'mobx'
// import cookie from 'js-cookie'
// import { GraphQLClient } from 'graphql-request'

// import { clientUrl } from '../utils/utils'

// const token: string = cookie.getJSON('vc_token')
// const usernameRef: string = cookie.getJSON('vc_user')

// let usernameURLRef: string
// if (typeof window !== 'undefined') {
//   usernameURLRef = window.location.href.split('/')[4]
// }

// const client = new GraphQLClient(clientUrl, {
//   headers: {
//     Token: token,
//   },
// })

// export class UserStore {
//   @observable username = usernameRef || usernameURLRef
//   @observable userToken = token
//   @observable socialLinks = { instagram: '', facebook: '', website: '' }
//   @observable images = []

//   @computed
//   get userImages() {
//     const clone = toJS(this.images)
//     return clone
//   }

//   @action
//   async getUserProfile() {
//     try {
//       const query = `
//       query getUser($input: UsernameInput){
//         getUser(input: $input) {
//           email
//           username
//           images {
//             id
//             src
//             name
//             ratio
//             border
//             texture
//             background
//             rotate
//             lighting
//           }
//           social {
//             website
//             facebook
//             instagram
//           }
//         }
//       }
//       `
//       const variables = {
//         input: {
//           username: this.username,
//         },
//       }

//       const { getUser } = await client.request(query, variables)
//       runInAction(() => {
//         this.images.push(getUser.images)

//         this.socialLinks = {
//           instagram: getUser.social.instagram,
//           facebook: getUser.social.facebook,
//           website: getUser.social.website,
//         }
//       })
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   @action
//   async updateUserProfile() {
//     try {
//       const query = `
//       mutation updateUser($input: UpdateUserInput!){
//         updateUser(
//           input: $input
//         ) {
//           id
//         }
//       }
//       `
//       const variables = {
//         input: {
//           username: this.username,
//           facebook: this.socialLinks.facebook,
//           website: this.socialLinks.website,
//           instagram: this.socialLinks.instagram,
//         },
//       }

//       await client.request(query, variables)

//       return { msg: 'Profile updated' }
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }
