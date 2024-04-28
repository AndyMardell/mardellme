import classNames from 'classnames'
import styles from './Divider.module.scss'

interface Props {
  $small?: Boolean
}

export default function Divider({ $small }: Props) {
  return (
    <div className={classNames(styles.divider, { [styles.small]: $small })} />
  )
}
