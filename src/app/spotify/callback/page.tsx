'use client'

import { Metadata } from 'next'
import { Suspense } from 'react'
import SpotifyCallback from '@/components/spotify/SpotifyCallback'

export const metadata: Metadata = {
  title: 'Spotify Callback – mardell.me',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  }
}

export default function Callback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SpotifyCallback />
    </Suspense>
  )
}
