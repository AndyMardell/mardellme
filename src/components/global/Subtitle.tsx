import style from '@/styles/Subtitle.module.scss'

interface Props {
  children?: React.ReactNode
  small?: boolean
}

export default function Subtitle({ children, small }: Props) {
  return (
    <h2 className={style.subtitle + (small ? ' ' + style.small : '')}>
      {children}
    </h2>
  )
}
