import { createContext } from 'react'

import { UserStore, ArtworkStore } from '../stores'

export const storesContext = createContext({
  userStore: new UserStore(),
  artworkStore: new ArtworkStore(),
})
