import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const albumId = searchParams.get('albumId')

  if (!albumId) {
    return NextResponse.json({ error: 'Album ID is missing' }, { status: 400 })
  }

  const accessToken = await kv.get<string>('adobe:token')

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Access token is missing or expired' },
      { status: 401 }
    )
  }

  try {
    const response = await fetch(
      `https://lr.adobe.io/v2/photos/albums/${albumId}/assets`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: errorData },
        { status: response.status }
      )
    }

    const photosData = await response.json()
    return NextResponse.json(photosData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    )
  }
}
