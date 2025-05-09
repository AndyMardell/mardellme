import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { error: 'Authorization code is missing' },
      { status: 400 }
    )
  }

  try {
    const tokenResponse = await fetch(
      'https://ims-na1.adobelogin.com/ims/token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: process.env.ADOBE_CLIENT_ID as string,
          client_secret: process.env.ADOBE_CLIENT_SECRET as string,
          code,
          grant_type: 'authorization_code',
          redirect_uri: process.env.ADOBE_REDIRECT_URI as string
        })
      }
    )

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json()
      return NextResponse.json(
        {
          error: errorData.error_description || 'Failed to obtain access token'
        },
        { status: 400 }
      )
    }

    const tokenData = (await tokenResponse.json()) as { access_token: string }

    console.log('Token data:', tokenData)
    await kv.set(
      'adobe:auth',
      JSON.stringify({
        accessToken: tokenData.access_token,
        expiresOn: Date.now() + 1000 * 60 * 60
      })
    )
    const storedToken = await kv.get('adobe:auth')
    console.log('Token stored successfully', storedToken)
    return NextResponse.json({ message: 'Token stored successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error exchanging code for token' },
      { status: 500 }
    )
  }
}
