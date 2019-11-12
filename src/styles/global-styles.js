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

    @media (min-width: 1600px) {
      width: 1300px !important;
    }
  }
  
}
  

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  html, body, #___gatsby {
    height: 100%;
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
/* 
  #demo-image {
    width: 1000px !important;
    position: absolute;
    top: 0;
    right: 0;
  } */
`
