import styles from '@/styles/Divider.module.scss'
import classNames from 'classnames'

interface Props {
  $small?: Boolean
}

export default function Divider({ $small }: Props) {
  return (
    <div className={classNames(styles.divider, { [styles.small]: $small })} />
  )
}
