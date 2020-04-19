import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import dayjs from 'dayjs'

const Spotify = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const existingStatus = await axios(
      `${process.env.SPOTIFY_REDIRECT}/api/spotify/get-cached-status`
    )
    const { status: cachedStatus } = await existingStatus.data

    if (
      dayjs(cachedStatus.lastUpdated)
        .add(3, 'minute')
        .isAfter(dayjs())
    ) {
      return res.status(200).json({
        statusCode: 200,
        status: cachedStatus,
      })
    }

    const spotifyStatus = await axios(
      `${process.env.SPOTIFY_REDIRECT}/api/spotify/get-status`
    )
    const { status: newStatus } = await spotifyStatus.data

    res.status(200).json({
      statusCode: 200,
      status: newStatus,
    })
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default Spotify
