import { FunctionComponent } from 'react'
import styled from 'styled-components'

interface Props {
  small?: Boolean
  spaced?: Boolean
}

const Divider: FunctionComponent<Props> = ({ small, spaced }) => (
  <StyledDivider small={small} spaced={spaced} />
)

const StyledDivider = styled.div<Props>`
  height: 2px;
  width: 100%;
  margin: ${({ spaced }) => (spaced ? '5rem 0' : '3rem 0')};
  background: ${({ theme }) => theme.colors.grey};
  ${({ small }) => small && `width: 30px;`};
`

export default Divider
