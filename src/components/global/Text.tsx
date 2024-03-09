'use client'

import styled from 'styled-components'

interface Props {
  $small?: boolean
  $italic?: boolean
  children: React.ReactNode
}

export default function Text({ $small, $italic, children }: Props) {
  return (
    <StyledP
      $small={$small}
      $italic={$italic}
    >
      {children}
    </StyledP>
  )
}

const StyledP = styled.p<Props>`
  ${({ $italic }) => $italic && `font-style: italic;`}
  ${({ $small }) => $small && `font-size: 0.8em;`}
  color: ${({ theme }) => theme.colors.grey};
`
