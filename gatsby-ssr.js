import React from "react"

import { GlobalStyles } from "./src/styles/global-styles"

import "typeface-inter"

export const wrapRootElement = ({ element }) => {
  return (
    <>
      {element}
      <GlobalStyles />
    </>
  )
}
