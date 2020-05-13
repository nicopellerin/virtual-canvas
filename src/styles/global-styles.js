import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *, *:after, *:before {
    box-sizing: inherit;
  }

  canvas {
    width: 100vw!important;
    min-height: 100vh;
    cursor: grab;
  }


#demo-home {
  canvas {
    width: 900px !important;
    pointer-events: none;

    @media (min-width: 1600px) {
      width: 1300px !important;
    }
  }
  
}
  
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  html, body, #___gatsby, #gatsby-focus-wrapper {
    height: 100vh;
}
  
  body{
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    overflow: hidden;
  }

  div[role="group"][tabindex] {
    height: 100%;
  }

  p, span {
    color: #333;
  }

  a {
    text-decoration: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
`
