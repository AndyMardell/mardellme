import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import fetchMock from 'jest-fetch-mock'
import Contact from '@/components/contact/ContactForm'

fetchMock.enableMocks()

describe('Contact Form', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('renders correctly', () => {
    render(<Contact />)
    expect(screen.getByLabelText(/Full Name:/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email Address:/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Message:/i)).toBeInTheDocument()
    expect(screen.getByText(/Send/i)).toBeInTheDocument()
  })

  it('submits the form', async () => {
    fetchMock.mockResponseOnce(JSON.stringify('Message sent'), { status: 200 })

    render(<Contact />)

    fireEvent.change(screen.getByLabelText(/Full Name:/i), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByLabelText(/Email Address:/i), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/Message:/i), {
      target: { value: 'Hello, this is a test message.' }
    })

    fireEvent.click(screen.getByText(/Send/i))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))

    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/contact`,
      expect.objectContaining({
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Hello, this is a test message.'
        })
      })
    )
  })

  it('shows a success message', async () => {
    fetchMock.mockResponseOnce(JSON.stringify('Message sent'), { status: 200 })

    render(<Contact />)

    fireEvent.change(screen.getByLabelText(/Full Name:/i), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByLabelText(/Email Address:/i), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/Message:/i), {
      target: { value: 'Hello, this is a test message.' }
    })

    fireEvent.click(screen.getByText(/Send/i))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))

    await waitFor(() =>
      expect(
        screen.getByText('Thanks for the message', { exact: false })
      ).toBeInTheDocument()
    )
  })

  it('shows an error message and allows the user to try again', async () => {
    fetchMock.mockResponseOnce(JSON.stringify('Internal server error'), {
      status: 500
    })

    render(<Contact />)

    fireEvent.change(screen.getByLabelText(/Full Name:/i), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByLabelText(/Email Address:/i), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/Message:/i), {
      target: { value: 'Hello, this is a test message.' }
    })

    fireEvent.click(screen.getByText(/Send/i))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))

    await waitFor(() =>
      expect(
        screen.getByText('There was an error sending your message', {
          exact: false
        })
      ).toBeInTheDocument()
    )

    expect(screen.getByRole('button', { name: /Send/i })).toBeInTheDocument()
  })
})
