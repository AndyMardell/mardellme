'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  children?: ReactNode
  small?: boolean
}

export default function Subtitle({ children, small }: Props) {
  return <StyledDiv small={small}>{children}</StyledDiv>
}

const StyledDiv = styled.h2<{
  small?: boolean
}>`
  font-family: ${({ theme }) => theme.font.family.heading};
  font-weight: 800;
  font-size: calc(30px + (60 - 30) * ((100vw - 300px) / (1600 - 300)));
  text-shadow: 4px 5px 0px rgba(255, 255, 255, 0.1);
  margin: 2em 0 0.8em;

  @media only screen and (min-width: 700px) {
    margin: 1.5em 0 0.5em;
  }

  @media only screen and (min-width: 900px) {
    margin: 1em 0 0.5em;
    text-shadow: 7px 9px 0px rgba(255, 255, 255, 0.1);
  }

  ${({ small }) =>
    small &&
    `font-size: calc(25px + (50 - 25) * ((100vw - 300px) / (1600 - 300)));`}

  a {
    color: ${({ theme }) => theme.colors.sipink};
    line-height: 1.4;
    &:hover {
      text-decoration: none;
      border-bottom: none;
      font-style: italic;
    }
  }
`
