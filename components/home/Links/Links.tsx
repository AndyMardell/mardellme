import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const links = [
  { name: 'Work', url: '/work', internal: true },
  { name: 'GitHub', url: 'https://github.com/AndyMardell' },
  { name: 'Twitter', url: 'https://twitter.com/AndyMardell' },
  { name: 'Instagram', url: 'https://instagram.com/AndyMardell' },
  { name: 'Email', url: 'mailto:andy@mardell.me' },
]

const Links: FunctionComponent = () => (
  <StyledNav>
    <ul>
      {links.map(({ name, url, internal }, i) => (
        <li key={i}>
          {internal ? (
            <Link href={url}>
              <a>{name}</a>
            </Link>
          ) : (
            <a target='_blank' rel='noopener noreferrer' href={url}>
              {name}
            </a>
          )}
        </li>
      ))}
    </ul>
  </StyledNav>
)

const StyledNav = styled.nav`
  a {
    color: inherit;
    text-decoration: none;
    font-weight: 500;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 2em 0;

    li {
      margin-top: 1.5em;
    }

    @media only screen and (min-width: 550px) {
      margin-top: 1.5em;

      li {
        display: inline;
        margin-top: 0;
      }

      li:not(:last-child)::after {
        content: '/';
        display: inline-block;
        margin: 0 0.5em;
      }
    }
  }
`

export default Links
