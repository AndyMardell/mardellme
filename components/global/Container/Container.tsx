import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  position: fixed;
  overflow: scroll;
  height: 100vh;
  width: 100vw;
  background: #2f2f2f;
  border: 20px solid #c8c8c8;
  box-sizing: border-box;
  color: #c8c8c8;
  background-image: url('shade.png');
  background-size: cover;
`

const Wrapper = styled.div`
  padding: 7rem;
  display: flex;
  min-height: calc(100vh - 14rem - 40px);
  flex-direction: column;
  justify-content: space-between;
`

interface Props {
  children?: ReactNode
}

const Container: FunctionComponent<Props> = ({ children }) => (
  <StyledDiv>
    <Wrapper>{children}</Wrapper>
  </StyledDiv>
)

export default Container
