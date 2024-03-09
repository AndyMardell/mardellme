'use client'

import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

interface Props {
  children?: ReactNode
}

const Title: FunctionComponent<Props> = ({ children }) => (
  <StyledHeading>
    <StyledLink
      href="/"
      tabIndex={0}
    >
      {children}
    </StyledLink>
  </StyledHeading>
)

const StyledLink = styled(Link)`
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
  color: #f5f5f5;

  span {
    color: #777777;
  }

  &:hover {
    span {
      color: #f5f5f5;
    }
  }
`

export default Title
