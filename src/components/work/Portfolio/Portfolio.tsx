import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const projects = [
  {
    name: `Hayward's Wedding`,
    url: 'https://mrandmrshayward.com',
    description: 'Development & Design',
  },
  {
    name: 'Mr & Mrs Sign',
    url: 'https://mrandmrssign.com/',
    description: 'Development & Design',
  },
  {
    name: 'Aurochs Fitness',
    url: 'https://aurochs.fitness',
    description: 'Development, Branding & Design',
  },
  {
    name: 'Neocape',
    url: 'https://neocape.co.uk',
    description: 'Development, Branding & Design',
  }
]

const Portfolio: FunctionComponent = () => (
  <Projects>
    {projects.map((project, i) => (
      <li key={i}>
        <Link target='_blank' rel='noopener noreferrer' href={project.url}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </Link>
      </li>
    ))}
  </Projects>
)

const Projects = styled.ul`
  list-style: none;
  margin: 3rem 0;
  padding: 0;

  @media only screen and (min-width 750px) {
    margin: 5rem;
  }
`

const Link = styled.a`
  display: flex;
  align-items: baseline;
  line-height: normal;
  overflow: hidden;

  &:hover {
    border-bottom: none;
  }

  h3 {
    padding-right: 0.2em;
    font-size: calc(30px + (70 - 30) * ((100vw - 300px) / (1600 - 300)));
    margin: 0;
  }

  p {
    display: none;
    margin: 0;
    margin-bottom: -1.2em;
  }

  @media only screen and (min-width: 600px) {
    &:hover {
      h3 {
        opacity: 0.5;
        padding-bottom: 2px;
      }

      p {
        display: block;
      }
    }
  }
`

export default Portfolio
