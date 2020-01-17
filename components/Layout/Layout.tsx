import { FunctionComponent, ReactNode, useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'
import useFonts from '../../hooks/useFonts'

const GlobalStyle = createGlobalStyle`
  ${normalize()}
`

interface Props {
  children?: ReactNode
}

const Layout: FunctionComponent<Props> = ({ children }) => {
  useFonts(
    'https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,500,600|Montserrat:800&display=swap',
    ['IBM Plex Sans', 'Montserrat']
  )

  return (
    <>
      <GlobalStyle />
      <div>{children}</div>
    </>
  )
}

export default Layout
