import React from 'react'

import { GlobalStyles } from './src/styles/global-styles'

import 'typeface-inter'
import 'typeface-nunito-sans'

export const wrapRootElement = ({ element }) => {
  return (
    <>
      {element}
      <GlobalStyles />
    </>
  )
}
