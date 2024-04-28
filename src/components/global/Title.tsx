import Link from 'next/link'
import style from './Title.module.scss'

interface Props {
  children: React.ReactNode
}

export default function Title({ children }: Props) {
  return (
    <h1 className={style.title}>
      <Link
        className={style.link}
        href="/"
        tabIndex={0}
      >
        {children}
      </Link>
    </h1>
  )
}
