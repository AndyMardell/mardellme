import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import { animated } from 'react-spring'

const shade = require('./images/shade.png')

interface StyleProps {
  flex?: boolean
  background?: boolean
  backgroundImage?: boolean
}

const Wrapper = styled.div<StyleProps>`
  ${({ flex }) =>
    flex &&
    `
    position: fixed;
    height: 100vh;
    width: 100%;
    background: #2f2f2f;
  `}
  ${({ background }) =>
    background &&
    `
    background: #2f2f2f;
  `}
  border-color: #c8c8c8;
  border-style: solid;
  border-width: calc(10px + (20 - 10) * ((100vw - 300px) / (1600 - 300)));
  box-sizing: border-box;
  color: #c8c8c8;
  overflow: hidden;
`

const BackgroundImageComponent = styled(animated.div)`
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

const Content = styled.div<StyleProps>`
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  padding: calc(30px + (110 - 30) * ((100vw - 300px) / (1600 - 300)));

  ${({ flex }) =>
    flex &&
    `
    display: flex;
    flex-direction: column;
    min-height: calc(
      100vh - calc((30px + (110 - 30) * ((100vw - 300px) / (1600 - 300))) * 2) -
        40px
    );

    @media only screen and (min-width: 900px) {
      justify-content: space-between;
    }
  `}

  p {
    letter-spacing: 1px;
    line-height: 1.8;
  }
`

interface Props {
  flex?: boolean
  background?: boolean
  backgroundImage?: boolean
}

const Container: FunctionComponent<Props> = ({
  children,
  flex,
  background,
  backgroundImage
}) => {
  return (
    <Wrapper background={background}>
      <Content flex={flex}>{children}</Content>
      {backgroundImage && <BackgroundImageComponent />}
    </Wrapper>
  )
}

export default Container
