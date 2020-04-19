import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  children?: ReactNode
  small?: boolean
}

const Subtitle: FunctionComponent<Props> = ({ children, small }) => (
  <StyledDiv small={small}>{children}</StyledDiv>
)
interface StyleProps {
  small?: boolean
}

const StyledDiv = styled.h2<StyleProps>`
  font-family: ${({ theme }) => theme.font.family.heading};
  font-weight: 800;
  text-transform: uppercase;
  font-size: calc(33px + (110 - 33) * ((100vw - 300px) / (1600 - 300)));
  letter-spacing: 0.05em;
  text-shadow: 4px 5px 0px rgba(255, 255, 255, 0.1);
  margin: 1.2em 0 0.8em;

  @media only screen and (min-width: 900px) {
    margin: 0.7em 0 0.5em;
    text-shadow: 7px 9px 0px rgba(255, 255, 255, 0.1);
  }

  ${({ small }) =>
    small &&
    `
    font-size: calc(25px + (80 - 25) * ((100vw - 300px) / (1600 - 300)));
  `}
`

export default Subtitle
