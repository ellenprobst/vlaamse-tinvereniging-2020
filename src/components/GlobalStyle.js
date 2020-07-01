import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}
    *, *:before, *:after {
    box-sizing: border-box;
  }
  html {
    box-sizing: border-box;
  }
  
  body {
    line-height: 1.5;
    letter-spacing: 0;
    background-color: #fff;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 1.1px;
  }

  img {
    display: block;
    width: 100%;
  }

  a {
    color: currentColor;
    text-decoration: none;
  }

  h1,h2,h3 {
     font-family:  'Playfair Display', serif;
  }

  h1, h2 {
    letter-spacing: --1px;
  }

  button {
    letter-spacing: 1.2px;
    font-size: 14px;
  }
`

export default GlobalStyle
