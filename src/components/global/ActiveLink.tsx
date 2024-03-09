'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props extends React.PropsWithChildren {
  href: string
}

export default function ActiveLink({ children, href }: Props) {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Link
      href={href}
      className={active ? 'active' : undefined}
    >
      {children}
    </Link>
  )
}
