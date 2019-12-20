import { observable, action } from 'mobx'
import cookie from 'js-cookie'
import axios from 'axios'

const token: string = cookie.getJSON('vc_token')
const usernameRef: string = cookie.getJSON('vc_user')

export class UserStore {
  @observable username = usernameRef
  @observable userToken = ''
  @observable socialLinks = { instagram: '', facebook: '', website: '' }

  @action
  async getUserProfile() {
    try {
      const { data } = await axios.get(
        `https://api.virtualcanvas.app/api/profile`,
        {
          headers: {
            Token: token,
          },
        }
      )

      this.socialLinks = {
        instagram: data.social_links.instagram,
        facebook: data.social_links.facebook,
        website: data.social_links.website,
      }

      return data
    } catch (err) {
      return { msg: err }
    }
  }

  @action
  async updateUserProfile() {
    try {
      await axios.patch(
        `https://api.virtualcanvas.app/api/profile/${username}`,
        this.socialLinks,
        {
          headers: {
            Token: token,
          },
        }
      )
      return { msg: 'Profile updated' }
    } catch (err) {
      console.error(err)
    }
  }
}
