import { createContext } from 'react'

import { UserStore } from '../stores'

export const storesContext = createContext({
  userStore: new UserStore(),
})
