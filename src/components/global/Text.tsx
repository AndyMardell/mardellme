import style from '@/styles/Text.module.scss'

interface Props {
  $small?: boolean
  $italic?: boolean
  $grey?: boolean
  children: React.ReactNode
}

export default function Text({ $small, $italic, $grey, children }: Props) {
  return (
    <p
      className={
        style.text +
        ($small ? ' ' + style.small : '') +
        ($italic ? ' ' + style.italic : '') +
        ($grey ? ' ' + style.grey : '')
      }
    >
      {children}
    </p>
  )
}
