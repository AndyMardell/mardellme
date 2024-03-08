'use client'

import { ReactNode } from 'react'
import styled from 'styled-components'
import { useSpring, animated, config } from 'react-spring'

interface Props {
  inline?: boolean
  right?: boolean
  bottom?: boolean
  animate?: string
  origin?: string
}

export default function Emoji({
  inline,
  right,
  bottom,
  children,
  animate,
  origin
}: {
  inline?: boolean
  right?: boolean
  bottom?: boolean
  children?: ReactNode
  animate?: string
  origin?: string
}) {
  const wave = useSpring({
    config: { duration: 1200 },
    from: { transform: 'rotate(0deg)' },
    to: async (next: any) => {
      while (1) {
        await next({ transform: 'rotate(-10deg)' })
        await next({ transform: 'rotate(10deg)' })
      }
    }
  })

  const flex = useSpring({
    config: config.slow,
    from: { transform: 'rotate(0deg)' },
    to: async (next: any) => {
      while (1) {
        await next({ transform: 'rotate(-10deg)' })
        await next({ transform: 'rotate(10deg)' })
      }
    }
  })

  const animations: Record<string, any> = { wave, flex }

  return (
    <Wrapper
      right={right}
      bottom={bottom}
      inline={inline}
    >
      <StyledEmoji
        style={animate && animations[animate]}
        inline={inline}
        origin={origin}
      >
        {children}
      </StyledEmoji>
    </Wrapper>
  )
}

const Wrapper = styled.div<Props>`
  ${({ inline }) => inline && 'display: inline;'}
  ${({ bottom }) => (bottom ? `margin-bottom: 1.5em;` : `margin-top: 1.5em;`)}

  @media only screen and (min-width 750px) {
    ${({ bottom }) => (bottom ? `margin-bottom: 3em;` : `margin-top: 3em;`)}
  }
`

const StyledEmoji = styled(animated.span)<Props>`
  ${({ right, inline }) =>
    right ? 'margin-right: 0.3em;' : inline && 'margin-left: 0.3em;'}
  display: inline-block;
  font-size: 2rem;
  vertical-align: -0.1em;
  cursor: default;
  transform-origin: ${({ origin }) => (origin ? origin : 'bottom right')};
`
