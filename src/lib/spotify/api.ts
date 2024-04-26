import { kv } from '@vercel/kv'
import dayjs from 'dayjs'

interface FetchSpotifyAPIConfig {
  accessToken?: string
  method?: string
  body?: URLSearchParams
}

interface TokenReponse {
  access_token: string
  expires_in: number
  refresh_token: string
}

export async function spotifyAPI(
  url: string,
  config?: FetchSpotifyAPIConfig
): Promise<Response> {
  let accessToken: string = config?.accessToken || (await getAccessToken())
  const { method = 'GET', body } = config || {}

  const headers: HeadersInit = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: accessToken && `Bearer ${accessToken}`
  }

  const requestOptions: RequestInit = {
    method,
    headers
  }

  if (body && method === 'POST') {
    requestOptions.body = body
  }

  const response = await fetch(url, requestOptions)
  if (response.status === 401 && accessToken) {
    console.error(`Access token expired and didn't refresh correctly`)
    await refreshTokens()
    throw new Error('Access token expired')
  }

  if (!response.ok) {
    throw new Error(
      `Spotify API request failed with status: ${response.status}`
    )
  }

  return response
}

export async function getAccessToken(): Promise<string> {
  const tokens = await kv.get<{
    accessToken: string
    refreshToken: string
    expires: number
  }>('spotify:tokens')

  if (!tokens) {
    throw new Error('Spotify auth tokens not found.')
  }

  const { accessToken: cachedAccessToken, refreshToken, expires } = tokens

  if (dayjs().isBefore(dayjs(expires))) {
    return cachedAccessToken
  }

  const { accessToken } = await refreshTokens(refreshToken)
  return accessToken
}

export async function refreshTokens(refreshToken?: string) {
  if (!refreshToken) {
    const tokens = await kv.get<{
      accessToken: string
      refreshToken: string
      expires: number
    }>('spotify:tokens')

    if (!tokens || !tokens.refreshToken) {
      throw new Error('No refresh token found')
    }

    refreshToken = tokens.refreshToken
  }

  // TODO: Extend the spotifyApi function to support this
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString('base64')}`
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  })

  if (!res.ok) {
    throw new Error('Failed to refresh tokens')
  }

  const { access_token, expires_in }: TokenReponse = await res.json()

  const tokensWithExpiry = {
    accessToken: access_token,
    refreshToken,
    expires: dayjs().add(expires_in, 'second').toISOString()
  }

  await kv.set('spotify:tokens', JSON.stringify(tokensWithExpiry))

  return tokensWithExpiry
}
