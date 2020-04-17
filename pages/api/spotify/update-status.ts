import { GraphQLClient } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const mutation = `mutation UpdateStatus(
  $id: ID!,
  $lastPlayed: String!,
  $name: String!
  $artist: String!
  $isPlaying: Boolean!
) {
  updateStatus(id: $id,
    data:{
      lastPlayed: $lastplayed,
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
      `${process.env.SPOTIFY_REDIRECT}/api/spotify/get-status`
    )
    const { status } = await existingStatus.data

    await client.request(mutation, {
      id: status.id,
      lastPlayed,
      track,
      isPlaying,
    })

    res.status(200).json({ statusCode: 200, message: 'Status saved' })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default UpdateStatus
