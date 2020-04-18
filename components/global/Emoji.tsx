import styled from 'styled-components'
import { FunctionComponent } from 'react'

interface Props {
  inline?: Boolean
}

const Emoji: FunctionComponent<Props> = ({ inline, children }) => {
  if (inline) {
    return <InlineEmoji>{children}</InlineEmoji>
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

const InlineEmoji = styled.span`
  font-size: 2rem;
  vertical-align: -0.1em;
  margin-right: 0.3em;
`

export default Emoji
