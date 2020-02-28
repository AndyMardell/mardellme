import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  children?: ReactNode
}

const Block: FunctionComponent<Props> = ({ children }) => (
  <StyledDiv>{children}</StyledDiv>
)

const StyledDiv = styled.div`
  margin-left: 7px;
  max-width: 480px;

  @media only screen and (min-width: 550px) {
    border-left: 4px solid #c8c8c8;
    padding-left: 2rem;
  }

  a {
    color: inherit;
    text-decoration: none;
    font-weight: 500;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-top: 2em;

    li {
      margin-top: 1.5em;
    }

    @media only screen and (min-width: 550px) {
      margin-top: 1.5em;

      li {
        display: inline;
        margin-top: 0;
      }

      li:not(:last-child)::after {
        content: '/';
        display: inline-block;
        margin: 0 0.5em;
      }
    }
  }
`

export default Block
