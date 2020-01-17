import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.h1`
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  text-transform: lowercase;
`

interface Props {
  children?: ReactNode
}

const Title: FunctionComponent<Props> = ({ children }) => (
  <StyledDiv>{children}</StyledDiv>
)

export default Title
