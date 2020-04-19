import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  children?: ReactNode
}

const Block: FunctionComponent<Props> = ({ children }) => (
  <StyledDiv>{children}</StyledDiv>
)

const StyledDiv = styled.div`
  margin-left: 7px;
  max-width: 480px;

  @media only screen and (min-width: 550px) {
    border-left: 4px solid ${({ theme }) => theme.colors.white};
    padding-left: 2rem;
  }
`

export default Block
