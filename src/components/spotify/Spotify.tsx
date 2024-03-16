'use client'

import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Playing from '@/components/spotify/Playing'
import Text from '@/components/global/Text'
import style from '@/styles/spotify/Spotify.module.scss'

export interface Status {
  isPlaying: boolean
  track: {
    artist: string
    name: string
  }
  lastPlayed?: string
  lastUpdated: string
}

dayjs.extend(relativeTime)

export default function Spotify() {
  const [status, setStatus] = useState<Status | false>(false)

  const fetchStatus = async () => {
    try {
      const { status: fetchedStatus } = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/spotify/status`,
        { cache: 'no-store' }
      ).then((res) => res.json())
      setStatus(fetchedStatus)
    } catch (err: any) {
      console.log(err.message)
      setStatus(false)
    }
  }

  useEffect(() => {
    fetchStatus()
    const updateStatus = setInterval(() => fetchStatus(), 180000)
    return () => clearInterval(updateStatus)
  }, [])

  if (!status) {
    return <div className={style.status}>Loading embarrassing song data...</div>
  }

  const { isPlaying, track, lastPlayed: lastPlayedTime } = status
  const lastPlayed = dayjs(lastPlayedTime).fromNow()

  return (
    <div className={style.status}>
      {isPlaying && <Playing />}
      <Text>
        <strong>{isPlaying ? 'Now playing: ' : 'Last played: '}</strong>
        {track.name} - {track.artist}
        {!isPlaying && lastPlayed && ` (${lastPlayed})`}
      </Text>
    </div>
  )
}
