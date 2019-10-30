import React from "react"
import ReactDOM from "react-dom"

import { GlobalStyles } from "./src/styles/global-styles"

import { ArtworkProvider } from "./src/context/artwork-context.tsx"

import "typeface-inter"
import "typeface-nunito-sans"

export const wrapRootElement = ({ element }) => {
  return (
    <ArtworkProvider>
      {element}
      <GlobalStyles />
    </ArtworkProvider>
  )
}

export const replaceHydration = () => {
  return (element, container) => {
    ReactDOM.createRoot(container).render(element)
  }
}
