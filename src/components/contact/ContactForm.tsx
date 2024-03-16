'use client'

import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Emoji from '@/components/global/Emoji'
import Button from '@/components/global/Button'

type Inputs = {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [autoHeight, setAutoHeight] = useState<number>()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Inputs>()
  const [formStatus, setFormStatus] = useState({
    loading: false,
    submitted: false,
    error: false
  })
  const { ref, ...textareaRegister } = register('message', {
    required: true,
    minLength: 8
  })

  const onSubmit = async ({ name, email, message }: Inputs) => {
    try {
      setFormStatus({ loading: true, submitted: false, error: false })
      await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      })
      setTimeout(() => {
        reset()
        setFormStatus({ loading: false, submitted: true, error: false })
      }, 1000)
    } catch (err) {
      setFormStatus({ loading: false, submitted: true, error: true })
    }
  }

  const autosizeTextarea = (textarea?: HTMLTextAreaElement) => {
    if (textarea) {
      setTimeout(() => setAutoHeight(textarea.scrollHeight), 5)
    }
  }

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.addEventListener('keydown', () => autosizeTextarea(textarea))
    }
    return () =>
      textarea?.removeEventListener('keydown', () => autosizeTextarea(textarea))
  }, [])

  if (formStatus.submitted && !formStatus.error) {
    return (
      <Thanks>
        Thanks for the message – I&apos;ll get back to you soon. In the meantime
        you can connect with me on the following platforms.
        <Emoji bottom>👇</Emoji>
      </Thanks>
    )
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {formStatus.error && (
        <Error>
          There was an error sending your message, please try again.
        </Error>
      )}
      <FormElement>
        <Label htmlFor="name">Full Name:</Label>
        <Input
          type="text"
          id="name"
          error={errors.name ? true : false}
          placeholder="Your name"
          {...register('name', { required: true })}
        />
        {errors.name && <Error>This field is required</Error>}
      </FormElement>
      <FormElement>
        <Label htmlFor="email">Email Address:</Label>
        <Input
          type="email"
          id="email"
          error={errors.email ? true : false}
          placeholder="your@emailaddress.com"
          {...register('email', { required: true })}
        />
        {errors.email && <Error>This field is required</Error>}
      </FormElement>
      <FormElement>
        <Label htmlFor="message">Message:</Label>
        <Textarea
          id="message"
          error={errors.message ? true : false}
          placeholder="Your message"
          rows={1}
          autoHeight={autoHeight}
          {...textareaRegister}
          ref={(e) => {
            ref(e)
            textareaRef.current = e
          }}
        />
        {errors.message && (
          <Error>I&apos;m going to need more information than that...</Error>
        )}
      </FormElement>
      <Button
        loading={formStatus.loading}
        icon={faPaperPlane}
        animation="fly"
      >
        {formStatus.loading ? 'Sending...' : 'Send'}
      </Button>
    </Form>
  )
}

const Thanks = styled.div`
  margin: 4rem 0;
  font-weight: 500;
  line-height: 1.8;
`

const Form = styled.form`
  margin: 4rem 0 4.2rem;
`

const FormElement = styled.div`
  padding: 1rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }
`

const Label = styled.label`
  color: ${({ theme }) => theme.colors.white};
  display: block;
  font-weight: 500;
`

const Input = styled.input<{ error: boolean }>`
  background: transparent;
  width: 100%;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.font.size.big};
  color: ${({ theme }) => theme.colors.white};
  border-bottom: 2px solid ${({ theme }) => theme.colors.darkgrey};
  ${({ error, theme }) => error && `border-bottom-color: ${theme.colors.red}`};
  padding: 0;
  margin: 0.2em 0;

  ::placeholder {
    opacity: 0.3;
  }

  ${({ error, theme }) =>
    !error &&
    `
    &:focus {
      border-bottom-color: ${theme.colors.grey};
    }
  `}
`

const Textarea = styled.textarea<{
  autoHeight?: number | null
  error: boolean
}>`
  display: block;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.font.size.big};
  color: ${({ theme }) => theme.colors.white};
  border-bottom: 2px solid ${({ theme }) => theme.colors.darkgrey};
  ${({ error, theme }) => error && `border-bottom-color: ${theme.colors.red}`};
  padding: 0;
  margin: 0.2em 0;
  overflow: hidden;
  line-height: 1.4;

  ::placeholder {
    opacity: 0.3;
  }

  ${({ autoHeight }) =>
    autoHeight &&
    `
    height: auto;
    height: ${autoHeight}px;
  `}

  ${({ error, theme }) =>
    !error &&
    `
    &:focus {
      border-bottom-color: ${theme.colors.grey};
    }
  `}
`

const Error = styled.div`
  margin: 0.5em 0;
  color: ${({ theme }) => theme.colors.red};
`
