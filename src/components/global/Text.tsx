import classNames from 'classnames'
import style from './Text.module.scss'

interface Props {
  $small?: boolean
  $italic?: boolean
  $grey?: boolean
  children: React.ReactNode
}

export default function Text({ $small, $italic, $grey, children }: Props) {
  return (
    <p
      className={classNames(style.text, {
        [style.small]: $small,
        [style.italic]: $italic,
        [style.grey]: $grey
      })}
    >
      {children}
    </p>
  )
}
