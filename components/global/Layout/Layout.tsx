import Head from 'next/head'
import { FunctionComponent, ReactNode } from 'react'
import { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'
import useGoogleFonts from 'use-google-fonts'

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  body {
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 300;
    font-size: 18px;
    font-size: calc(15px + (18 - 15) * ((100vw - 400px) / (1600 - 400)));
  }

  p {
    letter-spacing: 1px;
    line-height: 1.8;
    margin: 1em 0;

    a {
      border-bottom: 2px solid #c8c8c8;
    }
  }

  ul {
    margin: 1em 0;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: #eee;
      border-bottom: 2px solid #c8c8c8;
    }
  }
`

interface Props {
  children?: ReactNode
}

const Layout: FunctionComponent<Props> = ({ children }) => {
  useGoogleFonts([
    ['IBM Plex Sans', '300,400,500,600'],
    ['Montserrat', '800'],
  ])

  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='96x96'
          href='/favicon-96x96.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
      </Head>
      <GlobalStyle />
      <div>{children}</div>
    </>
  )
}

export default Layout
