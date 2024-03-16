import Title from '@/components/global/Title'
import Nav, { NavLink } from '@/components/global/Nav'
import style from '@/styles/Header.module.scss'

const links: NavLink[] = [
  { name: 'Work', url: '/work', internal: true },
  { name: 'Contact', url: '/contact', internal: true }
]

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
