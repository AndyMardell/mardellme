import styled from 'styled-components'
import { FunctionComponent } from 'react'

interface Props {
  inline?: Boolean
  right?: Boolean
}

const Emoji: FunctionComponent<Props> = ({ inline, right, children }) => {
  if (inline) {
    return <InlineEmoji right={right}>{children}</InlineEmoji>
  }

  return <BlockEmoji>{children}</BlockEmoji>
}

const BlockEmoji = styled.p`
  margin: 1.5em 0 0;
  font-size: 2rem;

  @media only screen and (min-width 750px) {
    margin-top: 3em;
  }
`

const InlineEmoji = styled.span<Props>`
  font-size: 2rem;
  vertical-align: -0.1em;
  ${({ right }) => !right && 'margin-right: 0.3em;'}
  ${({ right }) => right && 'margin-left: 0.3em;'}
`

export default Emoji
