import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { media, fontSize } from '../themes'
const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
  --main-bg-color: #fff;
  --grey-bg-color: #f4f4f4;
  --text-color:  #40544e;
  --theme--color: #B6BE9D;
  --input--color: #b6be9d73;
${'' /* --theme--color: #8d986e; */}
  --black:#393a3b;
  --white:#fff; 
}


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
          @media ${media.mobile} {
    font-size: ${fontSize.sm};
  }
  }

  p {
    color: var(--text-color);
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
    ${'' /* letter-spacing: -1px; */}
  }

  button {
    letter-spacing: 1.2px;
    font-size: 14px;
  }
`

export default GlobalStyle
