import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import moment from 'moment'

const Spotify = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const existingStatus = await axios(
      `${process.env.SPOTIFY_REDIRECT}/api/spotify/get-cached-status`
    )
    const { status: cachedStatus } = await existingStatus.data

    if (
      moment(cachedStatus.lastUpdated)
        .add(3, 'minutes')
        .isBefore(moment())
    ) {
      const spotifyStatus = await axios(
        `${process.env.SPOTIFY_REDIRECT}/api/spotify/get-status`
      )
      const { status: newStatus } = await spotifyStatus.data

      return res.status(200).json({
        statusCode: 200,
        status: newStatus,
      })
    }

    res.status(200).json({
      statusCode: 200,
      status: cachedStatus,
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default Spotify
