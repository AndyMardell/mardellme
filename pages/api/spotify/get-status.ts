import { NextApiRequest, NextApiResponse } from 'next'
import qs from 'qs'
import axios from 'axios'
import moment from 'moment'

const GetStatus = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const cachedTokens = await axios(
      `${process.env.SPOTIFY_REDIRECT}/api/spotify/get-tokens`
    )
    const {
      tokens: { accessToken: cachedAccessToken, refreshToken, expires },
    } = await cachedTokens.data

    let accessToken: string = cachedAccessToken

    if (moment(expires).isBefore(moment())) {
      const refreshedToken = await refreshTokens(refreshToken)
      if (refreshedToken?.accessToken) {
        accessToken = refreshedToken.accessToken
      }
    }

    try {
      const currentlyPlaying = await axios(
        'https://api.spotify.com/v1/me/player',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      const {
        is_playing: isPlaying,
        item: currentlyPlayingTrack,
      } = await currentlyPlaying.data

      let playerData = {
        lastPlayed: moment().toISOString(),
        track: {
          name: currentlyPlayingTrack ? currentlyPlayingTrack.name : '',
          artist: currentlyPlayingTrack
            ? currentlyPlayingTrack.artists[0].name
            : '',
        },
        isPlaying: isPlaying ? true : false,
      }

      if (!playerData.isPlaying) {
        const recentlyPlayed = await axios(
          'https://api.spotify.com/v1/me/player/recently-played',
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        const { items } = await recentlyPlayed.data

        if (!items.length) {
          throw new Error('No recently played tracks found')
        }

        const recentlyPlayedData = items[0]

        playerData = {
          lastPlayed: recentlyPlayedData.played_at,
          track: {
            name: recentlyPlayedData.track.name,
            artist: recentlyPlayedData.track.artists[0].name,
          },
          isPlaying: playerData.isPlaying,
        }
      }

      await axios(`${process.env.SPOTIFY_REDIRECT}/api/spotify/update-status`, {
        data: playerData,
      })

      res.status(200).json({
        statusCode: 200,
        status: {
          isPlaying,
          lastPlayed: playerData.lastPlayed,
          track: playerData.track,
        },
      })
    } catch (err) {
      await refreshTokens(refreshToken)
      throw new Error('Tokens refreshing for next time...')
    }
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

const refreshTokens = async (refreshToken: string) => {
  try {
    const newTokens = await axios('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          process.env.SPOTIFY_ID + ':' + process.env.SPOTIFY_SECRET
        ).toString('base64')}`,
      },
      data: qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    })
    const { access_token, expires_in } = await newTokens.data

    await axios(`${process.env.SPOTIFY_REDIRECT}/api/spotify/update-tokens`, {
      data: { accessToken: access_token, expires: expires_in },
    })

    return {
      accessToken: access_token,
      expires: expires_in,
    }
  } catch (err) {
    console.error('Error refreshing tokens:', err)
  }
}

export default GetStatus
