import React, { useState, useMemo, createContext, ReactNode } from 'react'
import cookie from 'js-cookie'

export const UserContext = createContext(null)

interface Props {
  children: ReactNode
}

export const UserProvider = ({ children }: Props) => {
  const token = cookie.getJSON('vc_token')
  const username = cookie.getJSON('vc_user')

  const [user, setUser] = useState(username)
  const [userToken, setUserToken] = useState(token)

  const value = useMemo(() => {
    return {
      user,
      setUser,
      userToken,
      setUserToken,
    }
  }, [user, userToken])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
