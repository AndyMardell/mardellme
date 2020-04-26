import styled from 'styled-components'
import { FunctionComponent } from 'react'
import { useSpring, animated, config } from 'react-spring'

interface Props {
  inline?: Boolean
  right?: Boolean
  bottom?: Boolean
  animate?: Boolean
}

const Emoji: FunctionComponent<Props> = ({
  inline,
  right,
  bottom,
  children,
  animate,
}) => {
  const wave = useSpring({
    config: { duration: 800 },
    from: { transform: 'rotate(0deg)' },
    to: async (next: any) => {
      while (1) {
        await next({ transform: 'rotate(-10deg)' })
        await next({ transform: 'rotate(10deg)' })
      }
    },
  })

  return (
    <Wrapper right={right} bottom={bottom} inline={inline}>
      <StyledEmoji style={animate && wave}>{children}</StyledEmoji>
    </Wrapper>
  )
}

const Wrapper = styled.div<Props>`
  ${({ inline }) => inline && 'display: inline;'}
  ${({ bottom }) =>
    bottom
      ? `margin-bottom: 1.5em;`
      : `margin-top: 1.5em;`}

  @media only screen and (min-width 750px) {
    ${({ bottom }) => (bottom ? `margin-bottom: 3em;` : `margin-top: 3em;`)}
  }
`

const StyledEmoji = styled(animated.span)<Props>`
  ${({ right }) => (right ? 'margin-right: 0.3em;' : 'margin-left: 0.3em;')}
  display: inline-block;
  font-size: 2rem;
  vertical-align: -0.1em;
  cursor: default;
  transform-origin: bottom right;
`

export default Emoji
