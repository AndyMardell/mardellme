'use client'

import styled from 'styled-components'

import Title from '@/components/global/Title'
import Nav, { NavLink } from '@/components/global/Nav'

const links: NavLink[] = [
  { name: 'Work', url: '/work', internal: true },
  { name: 'Contact', url: '/contact', internal: true }
]

export default function Header() {
  return (
    <StyledHeader>
      <Title>
        Mardell<span>.me</span>
      </Title>
      <Nav links={links} />
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3.3rem;
`
