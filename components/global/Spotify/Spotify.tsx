import React, { FunctionComponent } from 'react'
import { PlayingProps } from './types'

const Spotify: FunctionComponent<PlayingProps> = ({ playing }) => {
  if (!playing) {
    return null
  }

  console.log('playing', playing)

  const { isPlaying, track, lastPlayed } = playing

  return (
    <div>
      {isPlaying && '🔊 '} {track.artists[0].name} - {track.name}
      {lastPlayed && ` (${lastPlayed})`}
    </div>
  )
}

export default Spotify
