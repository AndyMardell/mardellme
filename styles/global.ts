import { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'

import fonts from './fonts'

const GlobalStyle = createGlobalStyle`
  ${normalize()}
  ${fonts()}

  body {
    font-family: 'IBM Plex Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 300;
    font-size: 18px;
    font-size: calc(15px + (18 - 15) * ((100vw - 400px) / (1600 - 400)));
    color: #f5f5f5;
  }

  p {
    letter-spacing: 1px;
    line-height: 1.8;
    margin: 1em 0;

    a {
      border-bottom: 2px solid #f5f5f5;
    }
  }

  ul {
    margin: 1em 0;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: #fff;
      border-bottom: 2px solid #c8c8c8;
    }
  }
`

export default GlobalStyle
