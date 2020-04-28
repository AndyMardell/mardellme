import { FunctionComponent } from 'react'
import styled from 'styled-components'

import { Title } from '../Heading'
import Nav, { NavLink } from './Nav'

const links: NavLink[] = [
  { name: 'Work', url: '/work', internal: true },
  { name: 'Blog', url: '/blog', internal: true },
  { name: 'Contact', url: '/contact', internal: true },
]

const Header: FunctionComponent = () => (
  <StyledHeader>
    <Title>
      Mardell<span>.me</span>
    </Title>
    <Nav links={links} />
  </StyledHeader>
)

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3.3rem;
`

export default Header
