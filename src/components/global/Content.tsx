import { ReactNode } from 'react'

export default function Content({
  maxWidth,
  children
}: {
  maxWidth?: number
  children?: ReactNode
}) {
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
