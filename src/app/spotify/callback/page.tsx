'use client'

import SpotifyCallback from '@/components/global/SpotifyCallback'
import { Suspense } from 'react'

export default function Callback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SpotifyCallback />
    </Suspense>
  )
}
