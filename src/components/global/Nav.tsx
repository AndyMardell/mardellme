'use client'

import styled from 'styled-components'
import ActiveLink from '@/components/global/ActiveLink'

export interface NavLink {
  name: string
  url: string
  internal?: boolean
}

interface Props {
  links: NavLink[]
}

export default function Nav({ links }: Props) {
  return (
    <StyledNav>
      <ul>
        {links.map(({ name, url, internal }, i) => (
          <li key={i}>
            {internal ? (
              <ActiveLink href={url}>{name}</ActiveLink>
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
}

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
