import { NextPage } from 'next'
import { useEffect } from 'react'

const Auth: NextPage = () => {
  useEffect(() => {
    const scopes = [
      'user-read-private',
      'user-read-email',
      'user-read-recently-played',
      'user-read-currently-playing',
      'user-read-playback-state',
    ]

    window.location.replace(
      'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +
        process.env.SPOTIFY_ID +
        '&scope=' +
        encodeURIComponent(scopes.join(' ')) +
        '&redirect_uri=' +
        encodeURIComponent(
          `${process.env.SPOTIFY_REDIRECT}/spotify/callback` || ''
        )
    )
  })

  return <p>Loading...</p>
}

export default Auth
