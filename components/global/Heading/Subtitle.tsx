import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 7rem;
  letter-spacing: 0.05em;
  text-shadow: 7px 9px 0px rgba(70, 70, 70, 1);
`

interface Props {
  children?: ReactNode
}

const Subtitle: FunctionComponent<Props> = ({ children }) => (
  <StyledDiv>{children}</StyledDiv>
)

export default Subtitle
