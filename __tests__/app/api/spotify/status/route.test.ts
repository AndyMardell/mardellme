/**
 * @jest-environment node
 */

import { getStatus } from '@/lib/spotify'
import { GET } from '@/app/api/spotify/status/route'

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
jest.mock('@/lib/spotify', () => ({
  getStatus: jest.fn()
}))

describe('GET Spotify Status', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('returns cached Spotify status if still valid', async () => {
    const cachedStatus = {
      lastUpdated: '2024-01-01T00:00:00Z',
      track: 'Test Song'
    }
    require('@vercel/kv').kv.get.mockResolvedValue(cachedStatus)
    const response = await GET()
    const json = await response.json()
    expect(json).toEqual({ spotifyStatus: cachedStatus })
    expect(getStatus).not.toHaveBeenCalled()
  })

  it('fetches new Spotify status if not cached', async () => {
    const newStatus = {
      lastUpdated: '2024-01-01T00:00:00Z',
      track: 'New Song'
    }
    require('@vercel/kv').kv.get.mockResolvedValue(null)
    require('@/lib/spotify').getStatus.mockResolvedValue(newStatus)
    const response = await GET()
    const json = await response.json()
    expect(json).toEqual({ spotifyStatus: newStatus })
  })

  it('returns a 404 status if no player data is found', async () => {
    require('@vercel/kv').kv.get.mockResolvedValue(null)
    require('@/lib/spotify').getStatus.mockResolvedValue(null)
    const response = await GET()
    expect(response.status).toBe(404)
    const json = await response.json()
    expect(json).toEqual({ message: 'No player data found' })
  })

  it('returns a 500 status if an error occurs', async () => {
    require('@vercel/kv').kv.get.mockRejectedValue(new Error('Test error'))
    const response = await GET()
    expect(response.status).toBe(500)
    const json = await response.json()
    expect(json).toEqual({ message: 'Error fetching Spotify status' })
  })
})
