// import React, { FunctionComponent, useState, useEffect } from 'react'
// import dayjs from 'dayjs'
// import relativeTime from 'dayjs/plugin/relativeTime'
// import axios from 'axios'
// import styled from 'styled-components'

// import { Status } from '../../../types/spotify'

// dayjs.extend(relativeTime)

// const Spotify: FunctionComponent = () => {
//   const [status, setStatus] = useState<Status | false>(false)

//   const fetchStatus = async () => {
//     try {
//       const player = await axios('/api/spotify')
//       const { status: fetchedStatus } = await player.data
//       setStatus(fetchedStatus)
//     } catch (err) {
//       console.log(err.message)
//       setStatus(false)
//     }
//   }

//   useEffect(() => {
//     fetchStatus()
//     const updateStatus = setInterval(() => fetchStatus(), 180000)
//     return () => clearInterval(updateStatus)
//   }, [])

//   if (!status) {
//     return <NowPlaying>Loading embarrassing song data...</NowPlaying>
//   }

//   const { isPlaying, track, lastPlayed: lastPlayedTime } = status
//   const lastPlayed = dayjs(lastPlayedTime).fromNow()

//   return (
//     <NowPlaying>
//       <strong style={{ marginRight: '.5em' }}>
//         {isPlaying ? 'Now playing: ' : 'Last played: '}
//       </strong>
//       {track.name} - {track.artist}
//       {!isPlaying && lastPlayed && ` (${lastPlayed})`}
//     </NowPlaying>
//   )
// }

// const NowPlaying = styled.div`
//   font-size: 0.9em;
// `

// export default Spotify
