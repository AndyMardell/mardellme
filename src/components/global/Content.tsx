interface Props {
  maxWidth?: number
  children: React.ReactNode
}

export default function Content({ maxWidth, children }: Props) {
  return (
    <div
      style={{
        maxWidth: maxWidth ? `${maxWidth}px` : 'auto'
      }}
    >
      {children}
    </div>
  )
}
