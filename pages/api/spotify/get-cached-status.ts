import { GraphQLClient } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'

const query = `query GetLatestStatus {
  getStatus(environment: "production") {
    data {
      _id
      isPlaying
      lastPlayed
      lastUpdated
      track {
        name
        artist
      }
    }
  }
}`

const GetCachedStatus = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = new GraphQLClient('https://graphql.fauna.com/graphql', {
      headers: {
        Authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
      },
    })
    const { getStatus } = await client.request(query)

    if (!getStatus.data.length) {
      throw new Error('Tokens not found')
    }

    const {
      _id: id,
      isPlaying,
      lastPlayed,
      lastUpdated,
      track,
    } = getStatus.data[0]

    res.status(200).json({
      statusCode: 200,
      status: {
        id,
        isPlaying,
        lastPlayed,
        lastUpdated,
        track,
      },
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default GetCachedStatus
