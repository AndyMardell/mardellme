import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: #2f2f2f;
  border: 20px solid #c8c8c8;
  box-sizing: border-box;
  color: #c8c8c8;
  padding: 5rem 7rem;
`

interface Props {
  children?: ReactNode
}

const Container: FunctionComponent<Props> = ({ children }) => (
  <StyledDiv>{children}</StyledDiv>
)

export default Container
