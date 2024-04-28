/**
 * @jest-environment node
 */

import { formatStatus } from '@/lib/spotify'
import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks()

jest.mock('@vercel/kv', () => ({
  kv: {
    get: jest.fn(),
    set: jest.fn()
  }
}))

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

jest.mock('@/lib/spotify/api', () => ({
  spotifyAPI: jest.fn()
}))

describe('formatStatus', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    fetchMock.resetMocks()
  })

  it('formats the Spotify track data correctly with all fields provided', () => {
    const input = {
      track: {
        name: 'Test Track',
        artists: [{ name: 'Artist One' }, { name: 'Artist Two' }],
        preview_url: 'http://example.com/preview',
        external_urls: { spotify: 'http://example.com' }
      },
      isPlaying: true,
      lastPlayed: '2024-01-02T00:00:00.000Z'
    }

    const expectedOutput = {
      track: {
        name: 'Test Track',
        artist: 'Artist One, Artist Two',
        preview: 'http://example.com/preview',
        url: 'http://example.com'
      },
      lastPlayed: '2024-01-02T00:00:00.000Z',
      isPlaying: true,
      lastUpdated: '2024-01-01T00:00:00.000Z'
    }

    expect(formatStatus(input)).toEqual(expectedOutput)
  })

  it('uses current time if lastPlayed is not provided', () => {
    const input = {
      track: {
        name: 'Test Track',
        artists: [{ name: 'Artist One' }],
        preview_url: 'http://example.com/preview',
        external_urls: { spotify: 'http://example.com' }
      },
      isPlaying: false
    }

    const expectedOutput = {
      track: {
        name: 'Test Track',
        artist: 'Artist One',
        preview: 'http://example.com/preview',
        url: 'http://example.com'
      },
      lastPlayed: '2024-01-01T00:00:00.000Z',
      isPlaying: false,
      lastUpdated: '2024-01-01T00:00:00.000Z'
    }

    expect(formatStatus(input)).toEqual(expectedOutput)
  })
})

describe('getStatus', () => {
  it('returns the current track if the player is playing', async () => {
    const player = {
      status: 200,
      json: jest.fn().mockResolvedValue({
        is_playing: true,
        item: {
          name: 'Test Track',
          artists: [{ name: 'Artist One' }, { name: 'Artist Two' }],
          preview_url: 'http://example.com/preview',
          external_urls: { spotify: 'http://example.com' }
        }
      })
    }

    require('@vercel/kv').kv.get.mockResolvedValue('mocked_token')
    require('@/lib/spotify/api').spotifyAPI.mockResolvedValue(player)
    const { getStatus } = await import('@/lib/spotify')

    const expectedOutput = {
      track: {
        name: 'Test Track',
        artist: 'Artist One, Artist Two',
        preview: 'http://example.com/preview',
        url: 'http://example.com'
      },
      lastPlayed: '2024-01-01T00:00:00.000Z',
      isPlaying: true,
      lastUpdated: '2024-01-01T00:00:00.000Z'
    }

    expect(await getStatus()).toEqual(expectedOutput)
  })

  it('returns the most recently played track if the player is not playing', async () => {
    const player = {
      status: 204
    }

    const recentlyPlayed = {
      status: 200,
      json: jest.fn().mockResolvedValue({
        items: [
          {
            track: {
              name: 'Test Track',
              artists: [{ name: 'Artist One' }],
              preview_url: 'http://example.com/preview',
              external_urls: { spotify: 'http://example.com' }
            },
            played_at: '2024-01-02T00:00:00.000Z'
          }
        ]
      })
    }

    require('@vercel/kv').kv.get.mockResolvedValue('mocked_token')
    require('@/lib/spotify/api')
      .spotifyAPI.mockResolvedValueOnce(player)
      .mockResolvedValueOnce(recentlyPlayed)

    const { getStatus } = await import('@/lib/spotify')

    const expectedOutput = {
      track: {
        name: 'Test Track',
        artist: 'Artist One',
        preview: 'http://example.com/preview',
        url: 'http://example.com'
      },
      lastPlayed: '2024-01-02T00:00:00.000Z',
      isPlaying: false,
      lastUpdated: '2024-01-01T00:00:00.000Z'
    }

    expect(await getStatus()).toEqual(expectedOutput)
  })
})
