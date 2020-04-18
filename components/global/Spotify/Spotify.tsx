import React, { FunctionComponent, useState, useEffect } from 'react'
import moment from 'moment'

import { Status } from './types'
import axios from 'axios'

const Spotify: FunctionComponent = () => {
  const [status, setStatus] = useState<Status | false>(false)

  const fetchStatus = async () => {
    try {
      const player = await axios('/api/spotify')
      const { status: fetchedStatus } = await player.data
      setStatus(fetchedStatus)
    } catch (err) {
      console.log(err.message)
      setStatus(false)
    }
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  if (!status) {
    return null
  }

  const { isPlaying, track, lastPlayed: lastPlayedTime } = status
  const lastPlayed = moment(lastPlayedTime).fromNow()

  return (
    <div>
      {isPlaying ? '🔊 ' : '🔈 '} {track.name} - {track.artist}
      {!isPlaying && lastPlayed && ` (${lastPlayed})`}
    </div>
  )
}

export default Spotify
