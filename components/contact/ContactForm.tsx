import { FunctionComponent } from 'react'
import styled from 'styled-components'

const ContactForm: FunctionComponent = () => {
  return (
    <form>
      <FormElement>
        <Label htmlFor='name'>Full Name:</Label>
        <Input type='text' id='name' name='Name' placeholder='Your name' />
      </FormElement>
      <FormElement>
        <Label htmlFor='email'>Email Address:</Label>
        <Input
          type='email'
          id='email'
          name='Email'
          placeholder='your@emailaddress.com'
        />
      </FormElement>
      <FormElement>
        <Label htmlFor='message'>Message:</Label>
        <textarea id='message' name='Message' placeholder='Your message' />
      </FormElement>
      <button type='submit'>Send</button>
    </form>
  )
}

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
  color: ${({ theme }) => theme.colors.grey};
  display: block;
  font-weight: 500;
`

const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  font-size: ${({ theme }) => theme.font.size.big};
  color: ${({ theme }) => theme.colors.white};
  border-bottom: 2px solid ${({ theme }) => theme.colors.grey};
  padding: 0.2em 0;
`

export default ContactForm
