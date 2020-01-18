import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: calc(30px + (120 - 30) * ((100vw - 300px) / (1600 - 300)));
  letter-spacing: 0.05em;
  text-shadow: 7px 9px 0px rgba(70, 70, 70, 1);
  margin: 1.5em 0;

  @media only screen and (min-width: 900px) {
    margin: 0.5em 0;
  }
`

interface Props {
  children?: ReactNode
}

const Subtitle: FunctionComponent<Props> = ({ children }) => (
  <StyledDiv>{children}</StyledDiv>
)

export default Subtitle
