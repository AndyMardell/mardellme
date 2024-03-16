import styles from '@/styles/Container.module.scss'

interface Props {
  children: React.ReactNode
  style?: React.CSSProperties
}

export default function Container({ children, style }: Props) {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.content}
        style={style}
      >
        {children}
      </div>
    </div>
  )
}
