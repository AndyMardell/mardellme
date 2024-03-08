'use client'

import { FunctionComponent } from 'react'
import styled from 'styled-components'

// import ActiveLink from '@/components/global/ActiveLink'
import Link from 'next/link'

export interface NavLink {
  name: string
  url: string
  internal?: boolean
}

interface Props {
  links: NavLink[]
}

const Nav: FunctionComponent<Props> = ({ links }) => (
  <StyledNav>
    <ul>
      {links.map(({ name, url, internal }, i) => (
        <li key={i}>
          {internal ? (
            // TODO: Fix ActiveLink
            // <ActiveLink href={url}>{name}</ActiveLink>
            <Link href={url}>{name}</Link>
          ) : (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={url}
            >
              {name}
            </a>
          )}
        </li>
      ))}
    </ul>
  </StyledNav>
)

const StyledNav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: inline;

      a {
        color: ${({ theme }) => theme.colors.grey};
        text-decoration: none;
        font-weight: 500;
        &:hover,
        &.active {
          color: ${({ theme }) => theme.colors.white};
        }
      }

      &:not(:last-child)::after {
        color: ${({ theme }) => theme.colors.grey};
        content: '/';
        display: inline-block;
        margin: 0 1em;
      }
    }
  }
`

export default Nav
