import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import axios from 'axios'
import qs from 'qs'

interface Props {
  success: boolean
  finished?: boolean
}

const Callback: NextPage<Props> = ({ success, finished }) => {
  if (!finished) {
    return <p>Loading...</p>
  }

  if (success) {
    return <p>✅ Everything is fine</p>
  }

  return <p>Error updating, try again</p>
}

Callback.getInitialProps = async (ctx: NextPageContext) => {
  const code = ctx.req?.url?.split('?code=')[1] || ''

  if (!code) {
    return { success: false, finished: true }
  }

  try {
    const res = await axios(`https://accounts.spotify.com/api/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.SPOTIFY_ID || '',
        client_secret: process.env.SPOTIFY_SECRET || '',
        redirect_uri: `${process.env.SPOTIFY_REDIRECT}/spotify/callback`,
        code,
      }),
    })

    const { access_token: accessToken, refresh_token: refreshToken } = res.data
    const me = await axios('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    const { id } = await me.data
    if (id !== 'andymardell') {
      throw new Error('You are not me')
    }

    await axios(`${process.env.LAMBDA_URL}`, {
      headers: { 'x-api-key': process.env.LAMBDA_TOKEN },
      data: { accessToken, refreshToken },
    })

    return { success: true, finished: true }
  } catch (err) {
    console.error(err.message)
    return { success: false, finished: true }
  }

  return { success: false, finished: true }
}

export default Callback
