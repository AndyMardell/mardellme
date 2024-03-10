import dayjs from 'dayjs'
import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { Status } from '@/components/global/Spotify'

export async function GET() {
  try {
    const cachedStatus = await kv.get<Status>('spotify:status')

    if (dayjs(cachedStatus?.lastUpdated).add(3, 'minute').isAfter(dayjs())) {
      return NextResponse.json({
        status: cachedStatus
      })
    }

    const tokens = await kv.get<{
      accessToken: string
      refreshToken: string
      expires: number
    }>('spotify:tokens')

    if (!tokens) {
      return NextResponse.json({ message: 'No tokens found' }, { status: 401 })
    }

    const { accessToken: cachedAccessToken, refreshToken, expires } = tokens

    let accessToken: string = cachedAccessToken

    if (dayjs(expires).isBefore(dayjs())) {
      const refreshedTokens = await refreshTokens(refreshToken)
      if (refreshedTokens?.accessToken) {
        accessToken = refreshedTokens.accessToken
      }
    }

    try {
      const { is_playing: isPlaying, item: currentlyPlayingTrack } =
        await fetch('https://api.spotify.com/v1/me/player', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }).then((res) => res.json())

      let playerData = {
        lastPlayed: dayjs().toISOString(),
        track: {
          name: currentlyPlayingTrack?.name,
          artist: currentlyPlayingTrack && currentlyPlayingTrack.artists[0].name
        },
        isPlaying,
        lastUpdated: dayjs().toISOString()
      }

      if (!isPlaying) {
        const { items } = await fetch(
          'https://api.spotify.com/v1/me/player/recently-played',
          {
            headers: { Authorization: `Bearer ${accessToken}` }
          }
        ).then((res) => res.json())

        if (!items.length) {
          console.log('No recently played tracks found')
          throw new Error('No recently played tracks found')
        }

        const recentlyPlayedData = items[0]

        playerData = {
          lastPlayed: recentlyPlayedData.played_at,
          track: {
            name: recentlyPlayedData.track.name,
            artist: recentlyPlayedData.track.artists[0].name
          },
          isPlaying: false,
          lastUpdated: dayjs().toISOString()
        }
      }

      await kv.set('spotify:status', JSON.stringify(playerData))
      return NextResponse.json({
        status: playerData
      })
    } catch (err) {
      console.log(err)
      await refreshTokens(refreshToken)
      throw new Error('Tokens refreshing for next time...')
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

const refreshTokens = async (refreshToken: string) => {
  try {
    const { access_token, expires_in } = await fetch(
      'https://accounts.spotify.com/api/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ':' +
              process.env.SPOTIFY_CLIENT_SECRET
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
  } catch (err) {
    console.error('Error refreshing tokens:', err)
  }
}
