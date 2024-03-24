import style from '@/styles/Sup.module.scss'

interface Props {
  children?: React.ReactNode
}

export default function Sup({ children }: Props) {
  return <sup className={style.sup}>{children}</sup>
}
