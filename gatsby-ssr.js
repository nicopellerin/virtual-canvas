import React from "react"

import { GlobalStyles } from "./src/styles/global-styles"

import { ArtworkProvider } from "./src/context/artwork-context.tsx"
import { UserProvider } from "./src/context/user-context.tsx"

import "typeface-inter"
import "typeface-nunito-sans"

export const wrapRootElement = ({ element }) => {
  return (
    <UserProvider>
      <ArtworkProvider>
        {element}
        <GlobalStyles />
      </ArtworkProvider>
    </UserProvider>
  )
}
