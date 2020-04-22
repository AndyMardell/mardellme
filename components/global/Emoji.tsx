import styled from 'styled-components'
import { FunctionComponent } from 'react'

interface Props {
  inline?: Boolean
  right?: Boolean
  bottom?: Boolean
}

const Emoji: FunctionComponent<Props> = ({
  inline,
  right,
  bottom,
  children,
}) => {
  if (inline) {
    return <InlineEmoji right={right}>{children}</InlineEmoji>
  }

  return <BlockEmoji bottom={bottom}>{children}</BlockEmoji>
}

const BlockEmoji = styled.p<Props>`
  ${({ bottom }) => (bottom ? `margin: 0 0 1.5em;` : `margin: 1.5em 0 0;`)}
  font-size: 2rem;

  @media only screen and (min-width 750px) {
    ${({ bottom }) => (bottom ? `margin-bottom: 3em;` : `margin-top: 3em;`)}
  }
`

const InlineEmoji = styled.span<Props>`
  font-size: 2rem;
  vertical-align: -0.1em;
  ${({ right }) => !right && 'margin-right: 0.3em;'}
  ${({ right }) => right && 'margin-left: 0.3em;'}
`

export default Emoji
