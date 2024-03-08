'use client'

import { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'

import { fonts } from './fonts'

const GlobalStyle = createGlobalStyle`
  ${normalize()}
  ${fonts()}

  body {
    font-family: 'IBM Plex Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 300;
    font-size: ${({ theme }) => theme.font.size.base.max}px;
    font-size: ${({ theme }) =>
      `calc(${theme.font.size.base.min}px + (${theme.font.size.base.max} - ${theme.font.size.base.min}) * ((100vw - 400px) / (1600 - 400)))`};
    color: ${({ theme }) => theme.colors.white};
  }

  p {
    letter-spacing: 1px;
    line-height: 1.8;
    margin: 1em 0;

    a {
      border-bottom: 2px solid ${({ theme }) => theme.colors.white};
    }
  }

  ul {
    margin: 1em 0;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      border-bottom: 2px solid ${({ theme }) => theme.colors.white};
    }
  }
`

export { GlobalStyle }
