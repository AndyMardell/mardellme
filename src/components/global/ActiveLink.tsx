import Link from 'next/link'
import classNames from 'classnames'
import style from '@/styles/NavItem.module.scss'

interface Props {
  children: React.ReactNode
  href: string
  active?: boolean
}

export default function ActiveLink({ children, href, active }: Props) {
  return (
    <Link
      href={href}
      className={classNames(style.link, { [style.active]: active })}
    >
      {children}
    </Link>
  )
}
