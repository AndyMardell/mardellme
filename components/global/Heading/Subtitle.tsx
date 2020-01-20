import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: calc(33px + (120 - 33) * ((100vw - 300px) / (1600 - 300)));
  letter-spacing: 0.05em;
  text-shadow: 4px 5px 0px rgba(70, 70, 70, 1);
  margin: 2em 0 1.5em;

  @media only screen and (min-width: 900px) {
    margin: 0.5em 0;
    text-shadow: 7px 9px 0px rgba(70, 70, 70, 1);
  }
`

interface Props {
  children?: ReactNode
}

const Subtitle: FunctionComponent<Props> = ({ children }) => (
  <StyledDiv>{children}</StyledDiv>
)

export default Subtitle
