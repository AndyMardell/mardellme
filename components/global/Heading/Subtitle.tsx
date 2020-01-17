import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.h2`
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
`

interface Props {
  children?: ReactNode
}

const Subtitle: FunctionComponent<Props> = ({ children }) => (
  <StyledDiv>{children}</StyledDiv>
)

export default Subtitle
