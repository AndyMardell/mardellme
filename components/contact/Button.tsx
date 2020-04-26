import React, { FunctionComponent, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSpring, config, animated } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

interface Props {
  loadingText?: string
  loading?: boolean
}

const Button: FunctionComponent<Props> = ({ children, loading }) => {
  const [pending, setPending] = useState(false)
  useEffect(() => setPending(loading ? true : false), [loading])

  const fly = useSpring({
    config: config.default,
    from: { transform: 'rotate(0deg) translate(0px, 0px)' },
    to: async (next: any) => {
      await next({
        transform: pending
          ? 'rotate(20deg) translate(0px, 0px)'
          : 'rotate(0deg) translate(0px, 0px)',
      })
      await next({
        transform: pending
          ? 'rotate(20deg) translate(50px, -50px)'
          : 'rotate(0deg) translate(0px, 0px)',
      })
    },
    delay: 100,
  })

  return (
    <Wrapper>
      <StyledButton disabled={pending}>
        {children}
        <Icon icon={faPaperPlane} style={fly} />
      </StyledButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 1rem;
`

const StyledButton = styled.button`
  padding: 0.8em 2em;
  border-radius: 2em;
  font-size: 1.1em;
  font-weight: 500;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.lightgrey};
    margin-top: 3px;
    margin-bottom: -3px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  &:loading:not(:disabled) {
    margin-top: 5px;
    margin-bottom: -5px;
    background: ${({ theme }) => theme.colors.grey};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    cursor: wait;
    margin-top: 5px;
    margin-bottom: -5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`

const Icon = styled(animated(FontAwesomeIcon))`
  margin-left: 0.5em;
`

export default Button
