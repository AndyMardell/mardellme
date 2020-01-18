import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  letter-spacing: 1px;
  line-height: 1.8;
  margin-left: 7px;
  max-width: 480px;

  @media only screen and (min-width: 550px) {
    border-left: 4px solid #c8c8c8;
    padding-left: 2rem;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      border-bottom: 2px solid #c8c8c8;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin-top: 2em;

    li {
      margin-top: 0.5em;

      a {
        font-weight: 500;
      }
    }

    @media only screen and (min-width: 550px) {
      margin-top: 0;

      li {
        display: inline;
      }

      li:not(:last-child)::after {
        content: '/';
        display: inline-block;
        margin: 0 0.5em;
      }
    }
  }
`

interface Props {
  children?: ReactNode
}

const Block: FunctionComponent<Props> = ({ children }) => (
  <StyledDiv>{children}</StyledDiv>
)

export default Block
