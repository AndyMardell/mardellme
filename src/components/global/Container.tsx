'use client'

import styled from 'styled-components'

export default function Container({
  children,
  style
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <Wrapper>
      <Content style={style}>{children}</Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.black};
  border-width: calc(10px + (20 - 10) * ((100vw - 300px) / (1600 - 300)));
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.white};
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
