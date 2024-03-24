'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSpring, config, animated } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import styles from '@/styles/Button.module.scss'

interface Props {
  children: React.ReactNode
  loading?: boolean
  href?: string
  icon?: IconDefinition
  animation?: string
  style?: React.CSSProperties
}

export default function Button({
  children,
  loading,
  href,
  icon,
  animation,
  style
}: Props) {
  const [pending, setPending] = useState(false)
  useEffect(() => setPending(loading ? true : false), [loading])

  const fly = useSpring({
    config: config.default,
    from: {
      transform: 'rotate(0deg) translate(0px, 0px)'
    },
    to: async (next: any) => {
      await next({
        transform: pending
          ? 'rotate(20deg) translate(0px, 0px)'
          : 'rotate(0deg) translate(0px, 0px)'
      })
      await next({
        transform: pending
          ? 'rotate(20deg) translate(50px, -50px)'
          : 'rotate(0deg) translate(0px, 0px)'
      })
    },
    delay: 100
  })

  const animations: Record<string, any> = {
    fly
  }

  return (
    <div
      className={styles.wrapper}
      style={style}
    >
      {href ? (
        <Link
          className={styles.button}
          href={href}
        >
          {children} {icon && <Icon icon={icon} />}
        </Link>
      ) : (
        <button
          className={styles.button}
          disabled={pending}
        >
          {children}
          {icon && (
            <Icon
              className={styles.icon}
              icon={icon}
              style={animation && animations[animation]}
            />
          )}
        </button>
      )}
    </div>
  )
}

const Icon = animated(FontAwesomeIcon)
