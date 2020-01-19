import Head from 'next/head'
import { FunctionComponent, ReactNode, useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'
import useGoogleFonts from 'use-google-fonts'

const GlobalStyle = createGlobalStyle`
  ${normalize()}
`

interface Props {
  children?: ReactNode
}

const Layout: FunctionComponent<Props> = ({ children }) => {
  useGoogleFonts([
    ['IBM Plex Sans', '400,500,600'],
    ['Montserrat', '800']
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
