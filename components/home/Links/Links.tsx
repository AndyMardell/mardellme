import React, { FunctionComponent } from 'react'
import Link from 'next/link'

const links = [
  { name: 'Work', url: '/work', internal: true },
  { name: 'GitHub', url: 'https://github.com/AndyMardell' },
  { name: 'Twitter', url: 'https://twitter.com/AndyMardell' },
  { name: 'Instagram', url: 'https://instagram.com/AndyMardell' },
  { name: 'Email', url: 'mailto:andy@mardell.me' }
]

const Links: FunctionComponent = () => (
  <nav>
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
  </nav>
)

export default Links
