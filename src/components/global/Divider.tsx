'use client'

import styled from 'styled-components'

export default function Divider({ small }: { small?: boolean }) {
  return <StyledDivider small={small} />
}

const StyledDivider = styled.div<{ small?: boolean }>`
  height: 2px;
  width: 100%;
  margin: 3rem 0;
  background: ${({ theme }) => theme.colors.grey};
  ${({ small }) => small && `width: 30px;`};
`
