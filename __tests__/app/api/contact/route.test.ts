/**
 * @jest-environment node
 */

import FormData from 'form-data'
import Mailgun from 'mailgun.js'
import { IMailgunClient } from 'mailgun.js/Interfaces'
import fetchMock from 'jest-fetch-mock'
import { POST } from '@/app/api/contact/route'

fetchMock.enableMocks()

jest.mock('mailgun.js', () => {
  const mMailgun = {
    client: jest.fn().mockReturnValue({
      messages: {
        create: jest.fn().mockResolvedValue({
          id: 'test_id',
          message: 'Queued. Thank you.'
        })
      }
    })
  }
  return jest.fn(() => mMailgun)
})

describe('POST function', () => {
  let mailgunInstance: Mailgun
  let mg: IMailgunClient

  beforeEach(() => {
    fetchMock.resetMocks()
    process.env.MAILGUN_API_KEY = 'test_key'
    process.env.MAILGUN_DOMAIN = 'test_domain'
    process.env.MAILGUN_EMAIL = 'test_email'
    mailgunInstance = new Mailgun(FormData)
    mg = mailgunInstance.client({
      username: 'api',
      url: process.env.MAILGUN_API_URL,
      key: process.env.MAILGUN_API_KEY
    })
  })

  it('should return a 500 status if the API information is missing', async () => {
    delete process.env.MAILGUN_API_KEY
    delete process.env.MAILGUN_DOMAIN
    delete process.env.MAILGUN_EMAIL

    const req = new Request('/', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' }
    })

    const response = await POST(req)
    expect(response.status).toBe(500)
    expect(await response.text()).toBe('Missing API information')
  })

  it('should return a 400 status if the required fields are missing', async () => {
    const req = new Request('/', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' }
    })

    const response = await POST(req)
    expect(response.status).toBe(400)
    expect(await response.text()).toBe('Missing required fields')
  })

  it('should send an email successfully', async () => {
    const req = new Request('/', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello'
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    const response = await POST(req)
    expect(response.status).toBe(200)
    expect(await response.text()).toBe('Message sent')
    expect(mg.messages.create).toHaveBeenCalledTimes(1)
    expect(mg.messages.create).toHaveBeenCalledWith('test_domain', {
      from: 'John Doe<john@example.com>',
      to: ['test_email'],
      subject: 'A new website message from John Doe',
      text: 'Hello'
    })
  })
})
