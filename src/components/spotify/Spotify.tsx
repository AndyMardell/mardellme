'use client'

import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import classNames from 'classnames'
import Playing from '@/components/spotify/Playing'
import Text from '@/components/global/Text'
import Preview from '@/components/spotify/Preview'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import styles from './Spotify.module.scss'

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
  const [loading, setLoading] = useState<Boolean>(true)
  const [status, setStatus] = useState<SpotifyStatus | false>(false)
  const [playing, setPlaying] = useState<Boolean>(false)

  const getStatus = async () => {
    try {
      const { spotifyStatus } = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/spotify/status`,
        { cache: 'no-store' }
      ).then((res) => res.json())
      setStatus(spotifyStatus)
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
      <div className={styles.status}>Loading embarrassing song data...</div>
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
          <strong>{isPlaying ? 'Now playing: ' : 'Last played: '}</strong>
          {track.name} - {track.artist}
          {!isPlaying && ` (${dayjs(lastPlayed).fromNow()})`}
        </Text>
      </div>
      <div className={classNames(styles.links, { [styles.playing]: playing })}>
        {track.preview && (
          <Preview
            src={track.preview}
            setPlaying={setPlaying}
          />
        )}
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
