import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.h1`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: calc(20px + (35 - 20) * ((100vw - 300px) / (1600 - 300)));
  font-weight: 500;
  text-transform: lowercase;
  margin: 0;

  span {
    color: #686868;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

interface Props {
  children?: ReactNode
}

const Title: FunctionComponent<Props> = ({ children }) => (
  <StyledDiv>{children}</StyledDiv>
)

export default Title
