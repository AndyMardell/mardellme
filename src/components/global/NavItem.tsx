import ActiveLink from '@/components/global/ActiveLink'

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
  return (
    <li>
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
  )
}
