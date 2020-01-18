import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  position: fixed;
  overflow: scroll;
  height: 100vh;
  width: 100%;
  background: #2f2f2f;
  border-color: #c8c8c8;
  border-style: solid;
  border-width: calc(10px + (20 - 10) * ((100vw - 300px) / (1600 - 300)));
  box-sizing: border-box;
  color: #c8c8c8;
  background-image: url('shade.png');
  background-size: cover;
`

const Wrapper = styled.div`
  padding: calc(30px + (110 - 30) * ((100vw - 300px) / (1600 - 300)));
  display: flex;
  min-height: calc(
    100vh - calc((30px + (110 - 30) * ((100vw - 300px) / (1600 - 300))) * 2) -
      40px
  );
  flex-direction: column;

  @media only screen and (min-width: 900px) {
    justify-content: space-between;
  }
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
