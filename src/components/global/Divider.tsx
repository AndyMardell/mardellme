import styles from '@/styles/Divider.module.scss'

interface Props {
  $small?: Boolean
}

export default function Divider({ $small }: Props) {
  return <div className={styles.divider + ($small ? ' ' + styles.small : '')} />
}
