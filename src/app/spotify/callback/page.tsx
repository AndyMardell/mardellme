'use client'

import { Suspense } from 'react'
import SpotifyCallback from '@/components/spotify/SpotifyCallback'

export default function Callback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SpotifyCallback />
    </Suspense>
  )
}
