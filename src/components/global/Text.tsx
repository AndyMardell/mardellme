'use client'

import styled from 'styled-components'

interface Props {
  $small?: boolean
  $italic?: boolean
  $grey?: boolean
  children: React.ReactNode
}

export default function Text({ $small, $italic, $grey, children }: Props) {
  return (
    <StyledP
      $small={$small}
      $italic={$italic}
      $grey={$grey}
    >
      {children}
    </StyledP>
  )
}

const StyledP = styled.p<Props>`
  ${({ $italic }) => $italic && `font-style: italic;`}
  ${({ $small }) => $small && `font-size: 0.8em;`}
  ${({ $grey, theme }) => $grey && `color: ${theme.colors.grey};`}
`
