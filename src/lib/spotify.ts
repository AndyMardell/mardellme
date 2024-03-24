import dayjs from 'dayjs'
import { kv } from '@vercel/kv'
import type { SpotifyStatus } from '@/components/spotify/Spotify'

export async function getAccessToken() {
  const tokens = await kv.get<{
    accessToken: string
    refreshToken: string
    expires: number
  }>('spotify:tokens')

  if (!tokens) {
    throw new Error('No tokens found')
  }

  const { accessToken: cachedAccessToken, refreshToken, expires } = tokens

  if (!dayjs(expires).isBefore(dayjs())) {
    return cachedAccessToken
  }

  const { accessToken } = await refreshTokens(refreshToken)
  return accessToken
}

export async function getStatus(accessToken?: string): Promise<SpotifyStatus> {
  if (!accessToken) {
    accessToken = await getAccessToken()
  }

  const player = await fetch('https://api.spotify.com/v1/me/player', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  if (player.status === 401) {
    // We shouldn't ever get here, so let's refresh the tokens for next time
    console.error(`Access token expired and didn't refresh correctly`)
    await refreshTokens()
    throw new Error('Access token expired')
  }

  if (player.status === 200) {
    // Player is playing, return the current track
    const { is_playing: isPlaying, item: track } = await player.json()

    return formatStatus({
      track,
      isPlaying
    })
  }

  // Player is not playing, return the most recently played track
  const { items } = await fetch(
    'https://api.spotify.com/v1/me/player/recently-played',
    {
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  ).then((res) => res.json())

  if (!items.length) {
    throw new Error('No recently played tracks found')
  }

  return formatStatus({
    track: items[0].track,
    lastPlayed: items[0].played_at,
    isPlaying: false
  })
}

export function formatStatus({
  track,
  isPlaying,
  lastPlayed
}: {
  track: any // TODO: Type this
  isPlaying: boolean
  lastPlayed?: string
}): SpotifyStatus {
  return {
    track: {
      name: track.name,
      artist: track.artists
        .map(({ name }: { name: string }) => name)
        .join(', '),
      preview: track.preview_url,
      url: track.external_urls.spotify
    },
    lastPlayed: lastPlayed || dayjs().toISOString(),
    isPlaying,
    lastUpdated: dayjs().toISOString()
  }
}

export async function refreshTokens(refreshToken?: string) {
  if (!refreshToken) {
    const tokens = await kv.get<{
      accessToken: string
      refreshToken: string
      expires: number
    }>('spotify:tokens')

    if (!tokens) {
      throw new Error('No refresh token found')
    }

    const { refreshToken: cachedRefreshToken } = tokens
    refreshToken = cachedRefreshToken
  }

  const { access_token, expires_in } = await fetch(
    'https://accounts.spotify.com/api/token',
    {
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
    }
  ).then((res) => res.json())

  const tokensWithExpiry = {
    accessToken: access_token,
    refreshToken,
    expires: dayjs().add(expires_in, 'second').toISOString()
  }

  await kv.set('spotify:tokens', JSON.stringify(tokensWithExpiry))
  return tokensWithExpiry
}
