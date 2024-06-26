import NavItem from './NavItem'
import style from './Nav.module.scss'

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
        {links.map((link, i) => (
          <NavItem
            key={i}
            link={link}
          />
        ))}
      </ul>
    </nav>
  )
}
