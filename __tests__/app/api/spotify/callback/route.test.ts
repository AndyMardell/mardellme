/**
 * @jest-environment node
 */

import { POST } from '@/app/api/spotify/callback/route'
import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks()

jest.mock('@vercel/kv', () => ({
  kv: {
    get: jest.fn(),
    set: jest.fn()
  }
}))

describe('POST /spotify/callback', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    jest.clearAllMocks()
  })

  it('should return 400 if no code is provided', async () => {
    const req = new Request('/', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' }
    })
    const response = await POST(req)
    expect(response.status).toBe(400)
    expect(await response.text()).toBe('Missing code')
  })

  it('should return 500 if Spotify client information is missing', async () => {
    process.env.SPOTIFY_CLIENT_ID = ''
    const req = new Request('/', {
      method: 'POST',
      body: JSON.stringify({
        code: 'valid_code'
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    const response = await POST(req)
    expect(response.status).toBe(500)
    expect(await response.text()).toBe('Missing Spotify client information')
  })

  it('should return 403 if the Spotify user is not the expected one', async () => {
    process.env.SPOTIFY_CLIENT_ID = 'your_client_id'
    process.env.SPOTIFY_CLIENT_SECRET = 'your_client_secret'
    process.env.NEXT_PUBLIC_FRONTEND_URL = 'http://localhost:3000'
    fetchMock.mockResponses(
      [
        JSON.stringify({
          access_token: 'token',
          refresh_token: 'refresh',
          expires_in: 3600
        }),
        { status: 200 }
      ],
      [JSON.stringify({ id: 'not_andymardell' }), { status: 200 }]
    )
    const req = new Request('/', {
      method: 'POST',
      body: JSON.stringify({
        code: 'valid_code'
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    const response = await POST(req)
    expect(response.status).toBe(403)
    expect(await response.text()).toBe('You are not me')
  })

  it('should update tokens and return success when all conditions are met', async () => {
    fetchMock.mockResponses(
      [
        JSON.stringify({
          access_token: 'token',
          refresh_token: 'refresh',
          expires_in: 3600
        }),
        { status: 200 }
      ],
      [JSON.stringify({ id: 'andymardell' }), { status: 200 }]
    )
    const req = new Request('/', {
      method: 'POST',
      body: JSON.stringify({
        code: 'valid_code'
      }),
      headers: { 'Content-Type': 'application/json' }
    })
    const response = await POST(req)
    expect(response.status).toBe(200)
    expect(await response.text()).toBe('Tokens updated')
    expect(require('@vercel/kv').kv.set).toHaveBeenCalledWith(
      'spotify:tokens',
      JSON.stringify({
        accessToken: 'token',
        refreshToken: 'refresh',
        expires: 3600
      })
    )
  })
})
