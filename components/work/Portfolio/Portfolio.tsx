import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

const Projects = styled.ul`
  list-style: none;
  margin: 5rem 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
`

const Project = styled.li`
  color: #555;

  img {
    max-width: 100%;
    height: auto;
  }

  h3 {
    color: #222;
  }
`

const Link = styled.a`
  color: inherit;
  text-decoration: none;
  background: white;
  display: block;
  border-radius: 10px;
  padding: 2rem 1.5rem;
  overflow: hidden;

  a {
    color: #222;
    display: block;
  }
`

const projects = [
  {
    name: 'Hayward Wedding Website',
    url: 'https://mrandmrshayward.com',
    description: 'Soansdoansdoansd',
    image: require('./images/mrandmrshayward.png')
  },
  {
    name: 'Hayward Wedding Website',
    url: 'https://mrandmrshayward.com',
    description: 'Soansdoansdoansd',
    image: require('./images/mrandmrshayward.png')
  },
  {
    name: 'Hayward Wedding Website',
    url: 'https://mrandmrshayward.com',
    description: 'Soansdoansdoansd',
    image: require('./images/mrandmrshayward.png')
  },
  {
    name: 'Hayward Wedding Website',
    url: 'https://mrandmrshayward.com',
    description: 'Soansdoansdoansd',
    image: require('./images/mrandmrshayward.png')
  }
]

const Portfolio: FunctionComponent = () => (
  <Projects>
    {projects.map((project, i) => (
      <Project key={i}>
        <Link target='_blank' rel='noopener noreferrer' href={project.url}>
          <img src={project.image} alt={project.name} />
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <a>View project &rarr;</a>
        </Link>
      </Project>
    ))}
  </Projects>
)

export default Portfolio
