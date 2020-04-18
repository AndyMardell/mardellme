import { FunctionComponent } from 'react'
import styled from 'styled-components'

interface Props {
  style?: object
}

const Container: FunctionComponent<Props> = ({ children, style }) => {
  return (
    <Wrapper>
      <Content style={style}>{children}</Content>
    </Wrapper>
  )
}
interface StyleProps {
  background?: boolean
}

const Wrapper = styled.div<StyleProps>`
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  background-color: #1a1a1a;
  border-width: calc(10px + (20 - 10) * ((100vw - 300px) / (1600 - 300)));
  border-style: solid;
  border-color: #f9f9f9;
`

const Content = styled.div`
  box-sizing: border-box;
  padding-left: calc(20px + (90 - 20) * ((100vw - 300px) / (1600 - 300)));
  padding-right: calc(20px + (90 - 20) * ((100vw - 300px) / (1600 - 300)));
  padding-top: calc(45px + (90 - 45) * ((100vw - 300px) / (1600 - 300)));
  padding-bottom: calc(45px + (90 - 45) * ((100vw - 300px) / (1600 - 300)));
  min-height: calc(
    100vh - ((10px + (20 - 10) * ((100vw - 300px) / (1600 - 300))) * 2)
  );
`

export default Container
