/**
 * @jest-environment node
 */

import { getRecentTrack } from '@/lib/lastfm'
import { GET } from '@/app/api/lastfm/status/route'

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
      : actualDayjs('2024-01-01T00:00:00Z')
  }
  Object.assign(mockDayjs, actualDayjs)
  return mockDayjs
})
jest.mock('@/lib/lastfm', () => ({
  getRecentTrack: jest.fn()
}))

describe('GET Last.fm Status', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns cached status if still valid', async () => {
    const cachedStatus = {
      lastUpdated: '2024-01-01T00:00:00Z',
      track: { name: 'Test Song', artist: 'Test Artist', url: '' },
      isPlaying: false,
      lastPlayed: '2024-01-01T00:00:00Z'
    }
    require('@vercel/kv').kv.get.mockResolvedValue(cachedStatus)
    const response = await GET()
    const json = await response.json()
    expect(json).toEqual({ musicStatus: cachedStatus })
    expect(getRecentTrack).not.toHaveBeenCalled()
  })

  it('fetches new status if not cached', async () => {
    const newStatus = {
      lastUpdated: '2024-01-01T00:00:00Z',
      track: { name: 'New Song', artist: 'New Artist', url: '' },
      isPlaying: true,
      lastPlayed: '2024-01-01T00:00:00Z'
    }
    require('@vercel/kv').kv.get.mockResolvedValue(null)
    require('@/lib/lastfm').getRecentTrack.mockResolvedValue(newStatus)
    const response = await GET()
    const json = await response.json()
    expect(json).toEqual({ musicStatus: newStatus })
  })

  it('returns a 500 status if an error occurs', async () => {
    require('@vercel/kv').kv.get.mockRejectedValue(new Error('Test error'))
    const response = await GET()
    expect(response.status).toBe(500)
    const json = await response.json()
    expect(json).toEqual({ message: 'Error fetching Last.fm status' })
  })
})
