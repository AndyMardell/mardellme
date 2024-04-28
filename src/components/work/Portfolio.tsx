import Sup from '@/components/global/Sup'
import Text from '@/components/global/Text'
import style from './Portfolio.module.scss'

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
    <ul className={style.projects}>
      {projects.map((project, i) => (
        <li key={i}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={project.url}
          >
            <h3>{project.name}</h3>
            <Text $grey>
              {project.description}
              {project.footnote && <Sup>{project.footnote}</Sup>}
            </Text>
          </a>
        </li>
      ))}
    </ul>
  )
}
