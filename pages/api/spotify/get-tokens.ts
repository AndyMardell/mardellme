import { GraphQLClient } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'

const query = `query GetLatestTokens {
  getTokens(environment: "production") {
    data {
      _id
      environment
      accessToken
      refreshToken
      expires
    }
  }
}`

const GetTokens = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = new GraphQLClient('https://graphql.fauna.com/graphql', {
      headers: {
        Authorization: `Bearer ${process.env.FAUNADB_SECRET}`,
      },
    })
    const { getTokens } = await client.request(query)

    if (!getTokens.data.length) {
      throw new Error('Tokens not found')
    }

    const { _id: id, accessToken, refreshToken, expires } = getTokens.data[0]

    res.status(200).json({
      statusCode: 200,
      tokens: {
        id,
        accessToken,
        refreshToken,
        expires,
      },
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default GetTokens
