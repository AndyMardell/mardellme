import { GraphQLClient } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import moment from 'moment'

const mutation = `mutation updateStatus(
  $id: ID!,
  $lastPlayed: String!,
  $lastUpdated: String!,
  $name: String!,
  $artist: String!,
  $isPlaying: Boolean!
) {
  updateStatus(id: $id,
    data: {
      lastPlayed: $lastPlayed,
      lastUpdated: $lastUpdated,
      track: {
        artist: $artist,
        name: $name
      },
      environment: "production",
      isPlaying: $isPlaying
    }
  ) {
    _id
    track {
      name
      artist
    }
  }
}`

const UpdateStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  const { lastPlayed, track, isPlaying } = req.body

  try {
    const client = new GraphQLClient('https://graphql.fauna.com/graphql', {
      headers: {
        Authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
      },
    })

    const existingStatus = await axios(
      `${process.env.SPOTIFY_REDIRECT}/api/spotify/get-cached-status`
    )
    const { status } = await existingStatus.data

    await client.request(mutation, {
      id: status.id,
      lastPlayed,
      lastUpdated: moment().toISOString(),
      name: track.name,
      artist: track.artist,
      isPlaying,
    })

    res.status(200).json({ statusCode: 200, message: 'Status saved' })
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default UpdateStatus
