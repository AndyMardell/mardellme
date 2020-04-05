export interface Artist {
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface PlayingProps {
  playing?: {
    isPlaying: boolean
    track: {
      artists: Artist[]
      available_markets: string[]
      disc_number: number
      duration_ms: number
      explicit: boolean
      external_urls: {
        spotify: string
      }
      href: string
      id: string
      name: string
      preview_url: string
      track_number: number
      type: string
      uri: string
    }
    lastPlayed?: string
  }
}
