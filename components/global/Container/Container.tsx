import { FunctionComponent } from 'react'
import styled from 'styled-components'

interface Props {
  flex?: boolean
  background?: boolean
  style?: object
}

const Container: FunctionComponent<Props> = ({
  children,
  flex,
  background,
  style
}) => {
  return (
    <Wrapper background={background}>
      <Content flex={flex} style={style}>
        {children}
      </Content>
    </Wrapper>
  )
}
interface StyleProps {
  flex?: boolean
  background?: boolean
}

const Wrapper = styled.div<StyleProps>`
  ${({ background }) =>
    background &&
    `
    background-image: url('${require('./images/shade.png')}');
    background-size: 100%;
    background-position: top center;
    background-repeat: no-repeat;
  `}

  border-color: #c8c8c8;
  border-style: solid;
  border-width: calc(10px + (20 - 10) * ((100vw - 300px) / (1600 - 300)));
  min-height: 100vh;
  width: 100%;
  background-color: #2c2c2c;
  box-sizing: border-box;
  color: #c8c8c8;
  overflow: hidden;
`

const Content = styled.div<StyleProps>`
  padding-left: calc(20px + (90 - 20) * ((100vw - 300px) / (1600 - 300)));
  padding-right: calc(20px + (90 - 20) * ((100vw - 300px) / (1600 - 300)));
  padding-top: calc(45px + (90 - 45) * ((100vw - 300px) / (1600 - 300)));
  padding-bottom: calc(45px + (90 - 45) * ((100vw - 300px) / (1600 - 300)));
  min-height: calc(
    100vh - ((10px + (20 - 10) * ((100vw - 300px) / (1600 - 300))) * 2)
  );
  box-sizing: border-box;

  ${({ flex }) =>
    flex &&
    `
    display: flex;
    flex-direction: column;

    @media only screen and (min-width: 900px) {
      justify-content: space-between;
    }
  `}
`

export default Container
