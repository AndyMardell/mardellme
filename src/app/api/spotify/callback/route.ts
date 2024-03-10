import { NextResponse, NextRequest } from 'next/server'
import { kv } from '@vercel/kv'

export async function POST(req: NextRequest) {
  const { code } = await req.json()

  if (!code) {
    return NextResponse.json({ message: 'Missing code' }, { status: 400 })
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
        client_id: process.env.SPOTIFY_CLIENT_ID || '',
        client_secret: process.env.SPOTIFY_CLIENT_SECRET || '',
        redirect_uri: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/spotify/callback`,
        code
      })
    }).then((res) => res.json())

    const { id } = await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then((res) => res.json())

    if (id !== 'andymardell') {
      return NextResponse.json({ message: 'You are not me' }, { status: 403 })
    }

    await kv.set(
      'spotify:tokens',
      JSON.stringify({ accessToken, refreshToken, expires })
    )

    return NextResponse.json({ message: 'Tokens updated' })
  } catch (err: any) {
    console.error(err.message)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}
