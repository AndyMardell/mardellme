import dayjs from 'dayjs'
import type { SpotifyStatus } from '@/components/spotify/Spotify'
import { spotifyAPI } from '@/lib/spotify/api'

export interface SpotifyTrack {
  name: string
  artists: SpotifyArtist[]
  preview_url: string
  external_urls: {
    spotify: string
  }
  album?: {
    name: string
    images: SpotifyImage[]
  }
}

interface SpotifyArtist {
  name: string
}

interface SpotifyImage {
  url: string
  height: number
  width: number
}

export async function getStatus(): Promise<SpotifyStatus> {
  const player = await spotifyAPI('https://api.spotify.com/v1/me/player')

  if (player.status === 200) {
    // Player is playing, return the current track
    const { is_playing: isPlaying, item: track } = await player.json()
    return formatStatus({
      track,
      isPlaying
    })
  }

  // Player is not playing, return the most recently played track
  const recentlyPlayedRes = await spotifyAPI(
    'https://api.spotify.com/v1/me/player/recently-played'
  )
  const { items } = await recentlyPlayedRes.json()
  if (!items.length) {
    throw new Error('No recently played tracks found')
  }

  const [recentTrack] = items
  return formatStatus({
    track: recentTrack.track,
    lastPlayed: recentTrack.played_at,
    isPlaying: false
  })
}

export function formatStatus({
  track: {
    name,
    artists,
    preview_url: preview,
    external_urls: { spotify: url }
  },
  isPlaying,
  lastPlayed
}: {
  track: SpotifyTrack
  isPlaying: boolean
  lastPlayed?: string
}): SpotifyStatus {
  return {
    track: {
      name,
      artist: artists.map(({ name }) => name).join(', '),
      preview,
      url
    },
    lastPlayed: lastPlayed || dayjs().toISOString(),
    isPlaying,
    lastUpdated: dayjs().toISOString()
  }
}
