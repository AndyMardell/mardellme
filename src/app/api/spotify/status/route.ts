import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import dayjs from 'dayjs'
import type { SpotifyStatus } from '@/components/spotify/Spotify'
import { getStatus } from '@/lib/spotify'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const cachedStatus = await kv.get<SpotifyStatus>('spotify:status')
    if (cachedStatus) {
      const { lastUpdated } = cachedStatus
      if (dayjs(lastUpdated).add(3, 'minute').isAfter(dayjs())) {
        return NextResponse.json({
          spotifyStatus: cachedStatus
        })
      }
    }

    const spotifyStatus = await getStatus()

    if (!spotifyStatus) {
      console.error('No player data found')
      return NextResponse.json(
        { message: 'No player data found' },
        { status: 404 }
      )
    }

    await kv.set('spotify:status', JSON.stringify(spotifyStatus))
    return NextResponse.json({ spotifyStatus })
  } catch (err: any) {
    console.error('Error fetching Spotify status:', err)
    return NextResponse.json(
      { message: 'Error fetching Spotify status' },
      { status: 500 }
    )
  }
}
