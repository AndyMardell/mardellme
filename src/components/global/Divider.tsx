'use client'

import styled from 'styled-components'

interface Props {
  $small?: Boolean
}

export default function Divider({ $small }: Props) {
  return <StyledDivider $small={$small} />
}

const StyledDivider = styled.div<Props>`
  height: 2px;
  width: 100%;
  margin: 3rem 0;
  background: ${({ theme }) => theme.colors.grey};
  ${({ $small }) => $small && `width: 30px;`};
`
