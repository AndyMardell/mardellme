'use client'

import { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Emoji from '@/components/global/Emoji'
import Button from '@/components/global/Button'
import style from '@/styles/contact/ContactForm.module.scss'

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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/contact`,
        {
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
        }
      )

      if (!res.ok) {
        throw new Error('Error sending message')
      }

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
      <div className={style.thanks}>
        Thanks for the message – I&apos;ll get back to you soon. In the meantime
        you can connect with me on the following platforms.
        <Emoji bottom>👇</Emoji>
      </div>
    )
  }

  return (
    <form
      className={style.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      {formStatus.error && (
        <div className={style.error}>
          There was an error sending your message, please try again.
        </div>
      )}
      <div className={style.element}>
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          className={errors.name ? style.error : ''}
          placeholder="Your name"
          {...register('name', { required: true })}
        />
        {errors.name && (
          <div className={style.error}>This field is required</div>
        )}
      </div>
      <div className={style.element}>
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          className={errors.email ? style.error : ''}
          placeholder="your@emailaddress.com"
          {...register('email', { required: true })}
        />
        {errors.email && (
          <div className={style.error}>This field is required</div>
        )}
      </div>
      <div className={style.element}>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          className={errors.message ? style.error : ''}
          placeholder="Your message"
          rows={1}
          style={autoHeight ? { height: `${autoHeight}px` } : {}}
          {...textareaRegister}
          ref={(e) => {
            ref(e)
            textareaRef.current = e
          }}
        />
        {errors.message && (
          <div className={style.error}>
            I&apos;m going to need more information than that...
          </div>
        )}
      </div>
      <Button
        loading={formStatus.loading}
        icon={faPaperPlane}
        animation="fly"
      >
        {formStatus.loading ? 'Sending...' : 'Send'}
      </Button>
    </form>
  )
}
