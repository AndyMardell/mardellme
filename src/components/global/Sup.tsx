import style from '@/styles/Sup.module.scss'

export default function Sup({ children }: React.PropsWithChildren) {
  return <sup className={style.sup}>{children}</sup>
}
