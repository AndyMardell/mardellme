'use client'

import { ReactNode } from 'react'

interface Props {
  maxWidth?: number
  children: ReactNode
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
