'use client'

import { usePathname } from 'next/navigation'
import ActiveLink from '@/components/global/ActiveLink'
import style from '@/styles/NavItem.module.scss'

export type NavLink = {
  name: string
  url: string
  internal?: boolean
}

type Props = {
  link: NavLink
}

export default function NavItem({ link }: Props) {
  const { name, url, internal } = link
  const pathname = usePathname()
  const active = pathname === url

  return (
    <li>
      {internal ? (
        <ActiveLink
          href={url}
          active={active}
        >
          {name}
        </ActiveLink>
      ) : (
        <a
          className={style.link}
          target="_blank"
          rel="noopener noreferrer"
          href={url}
        >
          {name}
        </a>
      )}
    </li>
  )
}
