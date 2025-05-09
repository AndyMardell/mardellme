import classNames from 'classnames'
import style from './List.module.scss'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function List({ children, className = '' }: Props) {
  return <ul className={classNames(style.list, className)}>{children}</ul>
}
