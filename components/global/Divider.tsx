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
  background: #f5f5f5;
  width: 100%;
  margin: 2rem 0;
  ${({ small }) => small && `width: 50px;`};
`

export default Divider
