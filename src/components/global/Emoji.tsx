'use client'

import { useSpring, animated, config } from 'react-spring'
import style from '@/styles/Emoji.module.scss'

interface Props {
  inline?: boolean
  right?: boolean
  bottom?: boolean
  children?: React.ReactNode
  animate?: string
  origin?: string
}

export default function Emoji({
  inline,
  right,
  bottom,
  children,
  animate,
  origin
}: Props) {
  const wave = useSpring({
    config: { duration: 1200 },
    from: { transform: 'rotate(0deg)' },
    to: async (next: any) => {
      while (1) {
        await next({ transform: 'rotate(-10deg)' })
        await next({ transform: 'rotate(10deg)' })
      }
    }
  })

  const flex = useSpring({
    config: config.slow,
    from: { transform: 'rotate(0deg)' },
    to: async (next: any) => {
      while (1) {
        await next({ transform: 'rotate(-10deg)' })
        await next({ transform: 'rotate(10deg)' })
      }
    }
  })

  const animations: Record<string, any> = { wave, flex }

  return (
    <div
      className={
        style.wrapper +
        (right ? ' ' + style.right : '') +
        (bottom ? ' ' + style.bottom : '') +
        (inline ? ' ' + style.inline : '')
      }
    >
      <animated.span
        className={
          style.emoji +
          (right ? ' ' + style.right : '') +
          (inline ? ' ' + style.inline : '')
        }
        style={{
          transformOrigin: origin ? origin : 'bottom right',
          ...(animate && animations[animate])
        }}
      >
        {children}
      </animated.span>
    </div>
  )
}
