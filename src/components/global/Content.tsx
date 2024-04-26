interface Props {
  maxWidth?: number
  children: React.ReactNode
}

export default function Content({ maxWidth, children }: Props) {
  const style = { maxWidth: maxWidth ? `${maxWidth}px` : 'auto' }
  return <div style={style}>{children}</div>
}
