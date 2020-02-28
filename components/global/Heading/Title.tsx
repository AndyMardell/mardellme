import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

interface Props {
  children?: ReactNode
}

const Title: FunctionComponent<Props> = ({ children }) => (
  <Link href='/'>
    <StyledLink>
      <StyledHeading>{children}</StyledHeading>
    </StyledLink>
  </Link>
)

const StyledLink = styled.a`
  &:hover {
    border-bottom: none;
    cursor: pointer;
  }
`

const StyledHeading = styled.h1`
  font-size: calc(20px + (35 - 20) * ((100vw - 300px) / (1600 - 300)));
  font-weight: 500;
  text-transform: lowercase;
  margin: 0;
  color: #c8c8c8;

  &:hover {
    color: #eee;
  }

  span {
    color: #686868;
  }
`

export default Title
