import { kv } from '@vercel/kv'

export async function POST(req: Request) {
  const { code } = await req.json()

  if (!code) {
    return new Response('Missing code', { status: 400 })
  }

  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    return new Response('Missing Spotify client information', { status: 500 })
  }

  try {
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expires
    } = await fetch(`https://accounts.spotify.com/api/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        redirect_uri: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/spotify/callback`,
        code
      })
    }).then((res) => res.json())

    const { id } = await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then((res) => res.json())

    // TODO: Move this to an environment variable
    if (id !== 'andymardell') {
      return new Response('You are not me', { status: 403 })
    }

    await kv.set(
      'spotify:tokens',
      JSON.stringify({ accessToken, refreshToken, expires })
    )

    return new Response('Tokens updated')
  } catch (err: any) {
    console.error(err.message)
    return new Response('Something went wrong', { status: 500 })
  }
}
