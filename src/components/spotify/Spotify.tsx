'use client'

import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Playing from '@/components/spotify/Playing'
import Text from '@/components/global/Text'
import Preview from '@/components/spotify/Preview'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import styles from '@/styles/spotify/Spotify.module.scss'

export interface Status {
  isPlaying: boolean
  track: {
    artist: string
    name: string
  }
  url: string
  preview?: string
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
      setStatus(false)
    }
  }

  useEffect(() => {
    fetchStatus()
    const updateStatus = setInterval(() => fetchStatus(), 180000) // 3 minutes
    return () => clearInterval(updateStatus)
  }, [])

  if (!status) {
    return (
      <div className={styles.status}>Loading embarrassing song data...</div>
    )
  }

  const { isPlaying, track, lastPlayed: lastPlayedTime } = status
  const lastPlayed = dayjs(lastPlayedTime).fromNow()

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        {isPlaying && <Playing />}
        <Text>
          <strong>{isPlaying ? 'Now playing: ' : 'Last played: '}</strong>
          {track.name} - {track.artist}
          {!isPlaying && lastPlayed && ` (${lastPlayed})`}
        </Text>
      </div>
      <div className={styles.links}>
        {status.preview && <Preview src={status.preview} />}
        <a
          href={status.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Spotify <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </a>
      </div>
    </div>
  )
}
