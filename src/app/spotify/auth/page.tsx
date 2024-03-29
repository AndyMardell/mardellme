'use client'

import { Metadata } from 'next'
import { useEffect } from 'react'

export default function Auth() {
  useEffect(() => {
    const scopes = [
      'user-read-private',
      'user-read-email',
      'user-read-recently-played',
      'user-read-currently-playing',
      'user-read-playback-state'
    ]

    window.location.replace(
      'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +
        process.env.NEXT_PUBLIC_SPOTIFY_ID +
        '&scope=' +
        encodeURIComponent(scopes.join(' ')) +
        '&redirect_uri=' +
        encodeURIComponent(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/spotify/callback` || ''
        )
    )
  }, [])

  return <p>Loading...</p>
}
