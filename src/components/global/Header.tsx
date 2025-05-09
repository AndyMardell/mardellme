import Title from '@/components/global/Title'
import Nav, { NavLink } from '@/components/global/Nav'
import style from './Header.module.scss'

const links: NavLink[] = [{ name: 'Contact', url: '/contact', internal: true }]

export default function Header() {
  return (
    <header className={style.header}>
      <Title>
        Mardell<span>.me</span>
      </Title>
      <Nav links={links} />
    </header>
  )
}
