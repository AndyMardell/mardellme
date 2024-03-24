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

export type SpotifyStatus = {
  isPlaying: boolean
  track: {
    artist: string
    name: string
    url: string
    preview?: string
  }
  lastPlayed: string
  lastUpdated: string
}

dayjs.extend(relativeTime)

export default function Spotify() {
  const [status, setStatus] = useState<SpotifyStatus | false>(false)

  const getStatus = async () => {
    try {
      const { spotifyStatus } = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/spotify/status`,
        { cache: 'no-store' }
      ).then((res) => res.json())
      setStatus(spotifyStatus)
    } catch (err: any) {
      setStatus(false)
    }
  }

  useEffect(() => {
    getStatus()
    const updateStatus = setInterval(() => getStatus(), 180000) // 3 minutes
    return () => clearInterval(updateStatus)
  }, [])

  if (!status) {
    return (
      <div className={styles.status}>Loading embarrassing song data...</div>
    )
  }

  const { track, lastPlayed, isPlaying } = status

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        {isPlaying && <Playing />}
        <Text>
          <strong>{isPlaying ? 'Now playing: ' : 'Last played: '}</strong>
          {track.name} - {track.artist}
          {!isPlaying && ` (${dayjs(lastPlayed).fromNow()})`}
        </Text>
      </div>
      <div className={styles.links}>
        {track.preview && <Preview src={track.preview} />}
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Spotify <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </a>
      </div>
    </div>
  )
}
