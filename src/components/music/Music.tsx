'use client'

import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Playing from '@/components/music/Playing'
import Text from '@/components/global/Text'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import styles from './Music.module.scss'
import type { MusicStatus } from '@/lib/lastfm'

dayjs.extend(relativeTime)

export default function Music() {
  const [loading, setLoading] = useState<Boolean>(true)
  const [status, setStatus] = useState<MusicStatus | false>(false)

  const getStatus = async () => {
    try {
      const { musicStatus } = await fetch('/api/lastfm/status', {
        cache: 'no-store'
      }).then((res) => res.json())
      setStatus(musicStatus)
      setLoading(false)
    } catch (err: any) {
      setStatus(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    getStatus()
    const updateStatus = setInterval(() => getStatus(), 180000) // 3 minutes
    return () => clearInterval(updateStatus)
  }, [])

  if (loading) {
    return (
      <div className={styles.status}>
        <Text>loading embarrassing song data...</Text>
      </div>
    )
  }

  if (!status) {
    return null
  }

  const { track, lastPlayed, isPlaying } = status
  return (
    <div className={styles.container}>
      <div className={styles.status}>
        {isPlaying && <Playing />}
        <Text>
          <strong>{isPlaying ? 'now playing: ' : 'last played: '}</strong>
          {track.name} - {track.artist}
          {!isPlaying && ` (${dayjs(lastPlayed).fromNow()})`}
        </Text>
      </div>
      <div className={styles.links}>
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          open on last.fm <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </a>
      </div>
    </div>
  )
}
