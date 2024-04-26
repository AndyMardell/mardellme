import style from '@/styles/Subtitle.module.scss'

interface Props {
  children?: React.ReactNode
  $small?: boolean
}

export default function Subtitle({ children, $small }: Props) {
  const className = [$small && style.small].filter(Boolean).join(' ')
  return <h2 className={`${style.subtitle} ${className}`}>{children}</h2>
}
