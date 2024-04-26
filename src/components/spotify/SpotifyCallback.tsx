'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SpotifyCallback() {
  const searchParams = useSearchParams()
  const [finished, setFinished] = useState(false)
  const [success, setSuccess] = useState(false)
  const code = searchParams.get('code')

  useEffect(() => {
    async function fetchSpotifyData() {
      if (!code || !process.env.NEXT_PUBLIC_FRONTEND_URL) {
        setFinished(true)
        setSuccess(false)
        return
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/spotify/callback`,
          {
            method: 'POST',
            body: JSON.stringify({ code }),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        if (res.status !== 200) {
          throw new Error()
        }

        setFinished(true)
        setSuccess(true)
      } catch {
        setFinished(true)
        setSuccess(false)
      }
    }

    fetchSpotifyData()
  }, [code])

  if (!finished) {
    return <p>Loading...</p>
  }

  if (success) {
    return <p>✅ Everything is fine</p>
  }

  return <p>Error updating, try again</p>
}
