'use client'

import { useEffect } from 'react'

export const metadata = {
  title: 'Connect to Spotify',
  description: 'Connect your Spotify account to get started',
  robots: {
    follow: false,
    index: false,
    googleBot: {
      index: false,
      follow: false
    }
  }
}

export default function Auth() {
  useEffect(() => {
    const scopes = [
      'user-read-private',
      'user-read-email',
      'user-read-recently-played',
      'user-read-currently-playing',
      'user-read-playback-state'
    ]

    const spotifyClientId = process.env.NEXT_PUBLIC_SPOTIFY_ID
    const redirectUri = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/spotify/callback`

    if (!spotifyClientId || !redirectUri) {
      console.error('Environment variables are not defined')
      return
    }

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: spotifyClientId,
      scope: scopes.join(' '),
      redirect_uri: redirectUri
    })

    window.location.replace(
      `https://accounts.spotify.com/authorize?${params.toString()}`
    )
  }, [])

  return <p>Loading...</p>
}
