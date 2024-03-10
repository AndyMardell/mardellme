'use client'

import styled from 'styled-components'
import Sup from '@/components/global/Sup'
import Text from '@/components/global/Text'

const projects = [
  {
    name: 'Mr & Mrs Hayward',
    url: 'https://mrandmrshayward.com',
    description: 'A wedding website for some friends',
    footnote: '2'
  },
  {
    name: 'Mr & Mrs Sign',
    url: 'https://mrandmrssign.com/',
    description: 'Another wedding website for some friends',
    footnote: '2'
  },
  {
    name: 'Teletext',
    url: 'https://teletext.mardell.me',
    description: 'A nostalgic teletext clone'
  },
  {
    name: 'Poem Generator',
    url: 'https://daily.mardell.me/poem',
    description: 'An extremely advanced poem generator'
  },
  {
    name: 'Hayfever Helper',
    url: 'https://daily.mardell.me/hayfever',
    description: 'Whether or not you should take a hayfever tablet today',
    footnote: '3'
  }
]

export default function Portfolio() {
  return (
    <Projects>
      {projects.map((project, i) => (
        <li key={i}>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={project.url}
          >
            <h3>{project.name}</h3>
            <Text $grey>
              {project.description}
              {project.footnote && <Sup>{project.footnote}</Sup>}
            </Text>
          </Link>
        </li>
      ))}
    </Projects>
  )
}

const Projects = styled.ul`
  list-style: none;
  margin: 3rem 0;
  padding: 0;

  @media only screen and (min-width 750px) {
    margin: 5rem;
  }
`

const Link = styled.a`
  line-height: normal;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.midgrey};

  &:hover {
    border-bottom: none;
    color: ${({ theme }) => theme.colors.white};
  }

  h3 {
    padding-right: 0.2em;
    font-size: calc(20px + (50 - 20) * ((100vw - 300px) / (1600 - 300)));
    margin: 0;
  }

  p {
    margin: 0;
    margin-bottom: 2rem;
    color: inherit;
  }
`
