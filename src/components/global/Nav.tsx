import ActiveLink from '@/components/global/ActiveLink'
import style from '@/styles/Nav.module.scss'

export type NavLink = {
  name: string
  url: string
  internal?: boolean
}

interface Props {
  links: NavLink[]
}

export default function Nav({ links }: Props) {
  return (
    <nav className={style.nav}>
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
    </nav>
  )
}
