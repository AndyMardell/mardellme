import Link from 'next/link'
import style from '@/styles/Title.module.scss'

export default function Title({ children }: { children: React.ReactNode }) {
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
