'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SpotifyCallback() {
  const searchParams = useSearchParams()
  const [finished, setFinished] = useState(false)
  const [success, setSuccess] = useState(false)
  const code = searchParams.get('code')

  useEffect(() => {
    if (!code) {
      return
    }

    fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/spotify/callback`, {
      method: 'POST',
      body: JSON.stringify({ code }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error()
        }

        setFinished(true)
        setSuccess(true)
      })
      .catch(() => {
        setFinished(true)
        setSuccess(false)
      })
  }, [code])

  if (!finished) {
    return <p>Loading...</p>
  }

  if (success) {
    return <p>✅ Everything is fine</p>
  }

  return <p>Error updating, try again</p>
}
