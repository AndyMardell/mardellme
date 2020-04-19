import { FunctionComponent } from 'react'
import styled from 'styled-components'

interface Props {
  small?: Boolean
}

const Divider: FunctionComponent<Props> = ({ small }) => (
  <StyledDivider small={small} />
)

const StyledDivider = styled.div<Props>`
  height: 2px;
  width: 100%;
  margin: 3rem 0;
  background: ${({ theme }) => theme.colors.white};
  ${({ small }) => small && `width: 30px;`};
`

export default Divider
