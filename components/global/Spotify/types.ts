export interface Status {
  isPlaying: boolean
  track: {
    artist: string
    name: string
  }
  lastPlayed?: string
}
