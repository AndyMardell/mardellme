import dayjs from 'dayjs'

export interface MusicStatus {
  isPlaying: boolean
  track: {
    artist: string
    name: string
    url: string
  }
  lastPlayed: string
  lastUpdated: string
}

export async function getRecentTrack(): Promise<MusicStatus> {
  const { LASTFM_API_KEY, LASTFM_USERNAME } = process.env

  if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
    throw new Error('Missing LASTFM_API_KEY or LASTFM_USERNAME env vars')
  }

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${encodeURIComponent(LASTFM_USERNAME)}&api_key=${LASTFM_API_KEY}&format=json&limit=1`
  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) {
    throw new Error(`Last.fm API request failed with status: ${res.status}`)
  }

  const data = await res.json()
  const tracks = data?.recenttracks?.track

  if (!tracks || !tracks.length) {
    throw new Error('No recent tracks found')
  }

  const [track] = tracks
  const isPlaying = track['@attr']?.nowplaying === 'true'
  const artist = track.artist?.['#text'] ?? track.artist?.name ?? ''
  const name = track.name ?? ''
  const lastfmUrl = track.url ?? ''
  const lastPlayed = isPlaying
    ? dayjs().toISOString()
    : (track.date?.uts
        ? dayjs.unix(Number(track.date.uts)).toISOString()
        : dayjs().toISOString())

  return {
    track: { name, artist, url: lastfmUrl },
    isPlaying,
    lastPlayed,
    lastUpdated: dayjs().toISOString()
  }
}
