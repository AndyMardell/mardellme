import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const StyledHeading = styled.h1`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: calc(20px + (35 - 20) * ((100vw - 300px) / (1600 - 300)));
  font-weight: 500;
  text-transform: lowercase;
  margin: 0;
  color: #c8c8c8;
  text-decoration: none;

  span {
    color: #686868;
  }
`

interface Props {
  children?: ReactNode
}

const Title: FunctionComponent<Props> = ({ children }) => (
  <Link href='/'>
    <a style={{ textDecoration: 'none' }}>
      <StyledHeading>{children}</StyledHeading>
    </a>
  </Link>
)

export default Title
