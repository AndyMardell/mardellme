import React, { FunctionComponent } from 'react'

const links = [
  { name: 'GitHub', url: 'https://github.com/AndyMardell' },
  { name: 'Twitter', url: 'https://twitter.com/AndyMardell' },
  { name: 'Instagram', url: 'https://instagram.com/AndyMardell' },
  { name: 'andy@mardell.me', url: 'mailto:andy@mardell.me' }
]

const Links: FunctionComponent = () => (
  <nav>
    <ul>
      {links.map(({ name, url }, i) => (
        <li>
          <a key={i} target='_blank' rel='noopener noreferrer' href={url}>
            {name}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)

export default Links
