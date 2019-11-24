import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  ReactNode,
} from 'react'
import cookie from 'js-cookie'
import axios from 'axios'

export const UserContext = createContext(null)

interface Props {
  children: ReactNode
}

export const UserProvider = ({ children }: Props) => {
  const token = cookie.getJSON('vc_token')
  const username = cookie.getJSON('vc_user')

  const [user, setUser] = useState(username)
  const [userToken, setUserToken] = useState(token)
  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    facebook: '',
    website: '',
  })

  const getUserProfile = async () => {
    try {
      const { data } = await axios.get(
        `https://api.virtualcanvas.app/api/profile`,
        {
          headers: {
            Token: token,
          },
        }
      )

      setSocialLinks(prevState => ({
        ...prevState,
        instagram: data.social_links.instagram,
        facebook: data.social_links.facebook,
        website: data.social_links.website,
      }))

      return data
    } catch (err) {
      console.error(err)
      return { msg: err }
    }
  }

  useEffect(() => {
    if (token) {
      getUserProfile()
    }
  }, [])

  const updateUserProfile = async () => {
    try {
      await axios.patch(
        `http://localhost:8080/api/profile/${username}`,
        socialLinks,
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

  const value = useMemo(() => {
    return {
      user,
      setUser,
      userToken,
      setUserToken,
      socialLinks,
      setSocialLinks,
      updateUserProfile,
    }
  }, [user, userToken, socialLinks])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
