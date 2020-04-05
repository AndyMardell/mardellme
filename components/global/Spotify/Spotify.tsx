import React, { FunctionComponent } from 'react'
import moment from 'moment'

import { PlayingProps } from './types'

const Spotify: FunctionComponent<PlayingProps> = ({ playing }) => {
  if (!playing) {
    return null
  }

  const { isPlaying, track, lastPlayed: lastPlayedTime } = playing
  const lastPlayed = moment(lastPlayedTime).fromNow()

  return (
    <div>
      {isPlaying ? '🔊 ' : '🔈 '} {track.name} - {track.artists[0].name}
      {!isPlaying && lastPlayed && ` (${lastPlayed})`}
    </div>
  )
}

export default Spotify
