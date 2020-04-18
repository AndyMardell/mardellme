import React, { FunctionComponent, useState, useEffect } from 'react'
import moment from 'moment'

import { Status } from '../../../types/spotify'
import axios from 'axios'
import styled from 'styled-components'
import Divider from '../Divider'

const Spotify: FunctionComponent = () => {
  const [status, setStatus] = useState<Status | false>(false)

  const fetchStatus = async (cacheOnly?: boolean) => {
    try {
      const player = await axios('/api/spotify', {
        params: { cacheOnly },
      })
      const { status: fetchedStatus } = await player.data
      setStatus(fetchedStatus)
    } catch (err) {
      console.log(err.message)
      setStatus(false)
    }
  }

  useEffect(() => {
    fetchStatus(true)
    fetchStatus()
    const updateStatus = setInterval(() => fetchStatus(), 180000)
    return () => clearInterval(updateStatus)
  }, [])

  if (!status) {
    return null
  }

  const { isPlaying, track, lastPlayed: lastPlayedTime } = status
  const lastPlayed = moment(lastPlayedTime).fromNow()

  return (
    <>
      <Divider small />
      <NowPlaying>
        <strong>{isPlaying ? 'Now playing: ' : 'Last played: '}</strong>
        {track.name} - {track.artist}
        {!isPlaying && lastPlayed && ` (${lastPlayed})`}
      </NowPlaying>
    </>
  )
}

const NowPlaying = styled.div`
  font-size: 0.9em;
`

export default Spotify
