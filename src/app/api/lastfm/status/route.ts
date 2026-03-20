import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import dayjs from 'dayjs'
import type { MusicStatus } from '@/lib/lastfm'
import { getRecentTrack } from '@/lib/lastfm'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const cachedStatus = await kv.get<MusicStatus>('lastfm:status')
    if (cachedStatus) {
      const { lastUpdated } = cachedStatus
      if (dayjs(lastUpdated).add(3, 'minute').isAfter(dayjs())) {
        return NextResponse.json({
          musicStatus: cachedStatus
        })
      }
    }

    const musicStatus = await getRecentTrack()

    if (!musicStatus) {
      console.error('No track data found')
      return NextResponse.json(
        { message: 'No track data found' },
        { status: 404 }
      )
    }

    await kv.set('lastfm:status', JSON.stringify(musicStatus))
    return NextResponse.json({ musicStatus })
  } catch (err: any) {
    console.error('Error fetching Last.fm status:', err)
    return NextResponse.json(
      { message: 'Error fetching Last.fm status' },
      { status: 500 }
    )
  }
}
