/**
 * @jest-environment node
 */

import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks()

jest.mock('dayjs', () => {
  const actualDayjs = jest.requireActual('dayjs')
  const mockDayjs = (...args: any) => {
    return args.length
      ? actualDayjs(...args)
      : actualDayjs('2024-01-01T00:00:00.000Z')
  }
  Object.assign(mockDayjs, actualDayjs)
  return mockDayjs
})

describe('getRecentTrack', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    fetchMock.resetMocks()
    process.env = {
      ...originalEnv,
      LASTFM_API_KEY: 'test-api-key',
      LASTFM_USERNAME: 'testuser'
    }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('returns now playing status when track has nowplaying attr', async () => {
    const mockResponse = {
      recenttracks: {
        track: [
          {
            name: 'The Less I Know The Better',
            artist: { '#text': 'Tame Impala' },
            url: 'https://www.last.fm/music/Tame+Impala/_/The+Less+I+Know+The+Better',
            '@attr': { nowplaying: 'true' }
          }
        ]
      }
    }

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

    const { getRecentTrack } = await import('@/lib/lastfm')
    const result = await getRecentTrack()

    expect(result).toEqual({
      track: {
        name: 'The Less I Know The Better',
        artist: 'Tame Impala',
        url: 'https://www.last.fm/music/Tame+Impala/_/The+Less+I+Know+The+Better'
      },
      isPlaying: true,
      lastPlayed: '2024-01-01T00:00:00.000Z',
      lastUpdated: '2024-01-01T00:00:00.000Z'
    })
  })

  it('returns last played status when track is not currently playing', async () => {
    const mockResponse = {
      recenttracks: {
        track: [
          {
            name: 'Let It Happen',
            artist: { '#text': 'Tame Impala' },
            url: 'https://www.last.fm/music/Tame+Impala/_/Let+It+Happen',
            date: { uts: '1704067200' } // 2024-01-01T00:00:00Z
          }
        ]
      }
    }

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse))

    const { getRecentTrack } = await import('@/lib/lastfm')
    const result = await getRecentTrack()

    expect(result.isPlaying).toBe(false)
    expect(result.track.name).toBe('Let It Happen')
    expect(result.track.artist).toBe('Tame Impala')
    expect(result.lastUpdated).toBe('2024-01-01T00:00:00.000Z')
  })

  it('throws when API returns an error response', async () => {
    fetchMock.mockResponseOnce('', { status: 403 })

    const { getRecentTrack } = await import('@/lib/lastfm')

    await expect(getRecentTrack()).rejects.toThrow(
      'Last.fm API request failed with status: 403'
    )
  })

  it('throws when no tracks are returned', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ recenttracks: { track: [] } })
    )

    const { getRecentTrack } = await import('@/lib/lastfm')

    await expect(getRecentTrack()).rejects.toThrow('No recent tracks found')
  })

  it('throws when env vars are missing', async () => {
    delete process.env.LASTFM_API_KEY

    const { getRecentTrack } = await import('@/lib/lastfm')

    await expect(getRecentTrack()).rejects.toThrow(
      'Missing LASTFM_API_KEY or LASTFM_USERNAME env vars'
    )
  })
})
