import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

const shade = require('../../../images/shade.png')

const Wrapper = styled.div`
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
  overflow: hidden;
`

const BackgroundImage = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('${shade}');
  background-size: cover;
  background-position: center center;
  z-index: -1;
`

const Content = styled.div`
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
  const { scale } = useSpring({
    config: {
      tension: 200,
      friction: 400
    },
    from: { scale: 1 },
    scale: 1.05
  })

  return (
    <Wrapper>
      <Content>{children}</Content>
      <BackgroundImage
        style={{
          transform: scale.interpolate((s) => `scale(${s})`)
        }}
      />
    </Wrapper>
  )
}

export default Container
