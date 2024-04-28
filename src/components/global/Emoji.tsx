'use client'

import { useSpring, animated, config, SpringValues } from 'react-spring'
import classNames from 'classnames'
import style from './Emoji.module.scss'

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
  animate
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

  const animations: Record<string, SpringValues<{ transform: string }>> = {
    wave,
    flex
  }

  return (
    <div
      className={classNames(style.wrapper, {
        [style.right]: right,
        [style.bottom]: bottom,
        [style.inline]: inline
      })}
    >
      <animated.span
        style={{ ...animations[animate ?? ''] }}
        className={classNames(style.emoji, {
          [style.right]: right,
          [style.inline]: inline
        })}
      >
        {children}
      </animated.span>
    </div>
  )
}
