import { FunctionComponent, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import axios from 'axios'

type Inputs = {
  name: string
  email: string
  message: string
}

const ContactForm: FunctionComponent = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [autoHeight, setAutoHeight] = useState<number>()
  const { register, handleSubmit, errors } = useForm<Inputs>()

  const onSubmit = async ({ name, email, message }: Inputs) => {
    await axios(`${process.env.SPOTIFY_REDIRECT}/api/contact`, {
      method: 'POST',
      data: {
        name,
        email,
        message,
      },
    }).catch((err) => console.log(err))
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
  }, [textareaRef])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormElement>
        <Label htmlFor='name'>Full Name:</Label>
        <Input
          type='text'
          id='name'
          name='name'
          placeholder='Your name'
          ref={register({ required: true })}
        />
        {errors.name && <span>This field is required</span>}
      </FormElement>
      <FormElement>
        <Label htmlFor='email'>Email Address:</Label>
        <Input
          type='email'
          id='email'
          name='email'
          placeholder='your@emailaddress.com'
          ref={register({ required: true })}
        />
        {errors.email && <span>This field is required</span>}
      </FormElement>
      <FormElement>
        <Label htmlFor='message'>Message:</Label>
        <Textarea
          // ref={textareaRef}
          id='message'
          name='message'
          placeholder='Your message'
          rows={1}
          autoHeight={autoHeight}
          ref={register({ required: true })}
        />
        {errors.message && <span>This field is required</span>}
      </FormElement>
      <Button type='submit'>Send Message</Button>
    </Form>
  )
}

const Form = styled.form`
  margin: 4rem 0;
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

const Input = styled.input`
  background: transparent;
  width: 100%;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.font.size.big};
  color: ${({ theme }) => theme.colors.white};
  border-bottom: 2px solid ${({ theme }) => theme.colors.darkgrey};
  padding: 0;
  margin: 0.2em 0;

  ::placeholder {
    opacity: 0.3;
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.grey};
  }
`

const Textarea = styled.textarea<{ autoHeight?: number | null }>`
  display: block;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.font.size.big};
  color: ${({ theme }) => theme.colors.white};
  border-bottom: 2px solid ${({ theme }) => theme.colors.darkgrey};
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

  &:focus {
    border-bottom-color: ${({ theme }) => theme.colors.grey};
  }
`

const Button = styled.button`
  background: transparent;
  outline: none;
  border: 2px solid ${({ theme }) => theme.colors.darkgrey};
  color: ${({ theme }) => theme.colors.grey};
  padding: 0.56em 2em 0.76em;
  margin-top: 1.2rem;

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    cursor: pointer;
  }
`

export default ContactForm
