'use client'

import React, { useState, useEffect, CSSProperties, ReactNode } from 'react'
import styled, { DefaultTheme } from 'styled-components'
import { useSpring, config, animated } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function Button({
  children,
  loading,
  href,
  icon,
  animation,
  style
}: {
  loadingText?: string
  loading?: boolean
  href?: string
  icon?: IconDefinition
  animation?: string
  style?: CSSProperties
  children?: ReactNode
}) {
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
    <Wrapper style={style}>
      {href ? (
        <Link href={href}>
          <StyledLink>
            {children} {icon && <Icon icon={icon} />}
          </StyledLink>
        </Link>
      ) : (
        <StyledButton disabled={pending}>
          {children}
          {icon && (
            <Icon
              icon={icon}
              style={animation && animations[animation]}
            />
          )}
        </StyledButton>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 1rem;
`

const buttonLinkStyle = (theme: DefaultTheme) => `
  display: inline-block;
  padding: 0.9em 2.5em 1.1em;
  border-radius: 2em;
  font-size: 1em;
  font-weight: 600;
  background: ${theme.colors.white};
  color: ${theme.colors.black};
  border: none;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    cursor: pointer;
    background: ${theme.colors.lightgrey};
    margin-top: 2px;
    margin-bottom: -2px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    border-bottom: none;
  }

  &:loading:not(:disabled) {
    margin-top: 3px;
    margin-bottom: -3px;
    background: ${theme.colors.grey};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    cursor: wait;
    margin-top: 3px;
    margin-bottom: -3px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`

const StyledButton = styled.button`
  ${({ theme }) => buttonLinkStyle(theme)}
`

const StyledLink = styled.a`
  ${({ theme }) => buttonLinkStyle(theme)}
`

const Icon = styled(animated(FontAwesomeIcon))`
  margin-left: 0.5em;
`
