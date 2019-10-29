import React, { useState, useMemo, createContext, ReactNode } from "react"

export const UserContext = createContext(null)

interface Props {
  children: ReactNode
}

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null)

  const value = useMemo(() => {
    return {
      user,
      setUser,
    }
  }, [user, setUser])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
