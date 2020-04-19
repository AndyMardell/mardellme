import { GraphQLClient } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import dayjs from 'dayjs'

const mutation = `mutation updateAuthTokens(
  $id: ID!,
  $accessToken: String!,
  $refreshToken: String,
  $expires: String
) {
  updateAuthTokens(id: $id,
    data: {
      environment: "production"
      accessToken: $accessToken
      refreshToken: $refreshToken
      expires: $expires
    }
  ) {
    accessToken
    refreshToken
  }
}`

const UpdateTokens = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken, refreshToken, expires } = req.body

  try {
    const client = new GraphQLClient('https://graphql.fauna.com/graphql', {
      headers: {
        Authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
      },
    })

    const existingTokens = await axios(
      `${process.env.SPOTIFY_REDIRECT}/api/spotify/get-tokens`
    )
    const { tokens } = await existingTokens.data

    await client.request(mutation, {
      id: tokens.id,
      accessToken,
      refreshToken,
      expires: dayjs()
        .add(expires, 'second')
        .toISOString(),
    })

    res.status(200).json({ statusCode: 200, message: 'Tokens saved' })
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default UpdateTokens
