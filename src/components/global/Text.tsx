import style from '@/styles/Text.module.scss'

interface Props {
  $small?: boolean
  $italic?: boolean
  $grey?: boolean
  children: React.ReactNode
}

export default function Text({ $small, $italic, $grey, children }: Props) {
  const className = [
    style.text,
    $small && style.small,
    $italic && style.italic,
    $grey && style.grey
  ]
    .filter(Boolean)
    .join(' ')

  return <p className={className}>{children}</p>
}
