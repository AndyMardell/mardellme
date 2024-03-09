'use client'

import styled from 'styled-components'

export default function Sup({ children }: React.PropsWithChildren) {
  return <StyledSup>{children}</StyledSup>
}

const StyledSup = styled.sup`
  font-size: 0.7em;
  vertical-align: super;
  margin-left: 0.2em;
  line-height: 0;
  color: ${({ theme }) => theme.colors.grey};
`
