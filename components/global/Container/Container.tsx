import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

const StyledDiv = styled(animated.div)`
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
  background-position: center center;
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

const Container: FunctionComponent<Props> = ({ children }) => {
  const backgroundSpring = useSpring({
    config: {
      tension: 200,
      friction: 400
    },
    from: { backgroundSize: '100%' },
    backgroundSize: '105%'
  })

  return (
    <StyledDiv style={backgroundSpring}>
      <Wrapper>{children}</Wrapper>
    </StyledDiv>
  )
}

export default Container
