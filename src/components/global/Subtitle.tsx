import classNames from 'classnames'
import style from './Subtitle.module.scss'

interface Props {
  children?: React.ReactNode
  $small?: boolean
}

export default function Subtitle({ children, $small }: Props) {
  return (
    <h2 className={classNames(style.subtitle, { [style.small]: $small })}>
      {children}
    </h2>
  )
}
