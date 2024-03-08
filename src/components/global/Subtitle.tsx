'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'

export default function Subtitle({
  children,
  small
}: {
  children?: ReactNode
  small?: boolean
}) {
  return <StyledDiv small={small}>{children}</StyledDiv>
}

const StyledDiv = styled.h2<{
  small?: boolean
}>`
  font-family: ${({ theme }) => theme.font.family.heading};
  font-weight: 800;
  text-transform: uppercase;
  font-size: calc(35px + (110 - 35) * ((100vw - 300px) / (1600 - 300)));
  letter-spacing: 0.05em;
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
    `font-size: calc(25px + (80 - 25) * ((100vw - 300px) / (1600 - 300)));`}
`
