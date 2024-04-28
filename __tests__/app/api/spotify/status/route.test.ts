/**
 * @jest-environment node
 */

import { getStatus } from '@/lib/spotify'
import { GET } from '@/app/api/spotify/status/route'
import { waitFor } from '@testing-library/react'

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

  // FIXME: This doesn't work
  it('returns cached Spotify status if still valid', async () => {
    const cachedStatus = {
      lastUpdated: '2024-01-01T00:00:00Z',
      track: 'Test Song'
    }
    require('@vercel/kv').kv.get.mockResolvedValue(JSON.stringify(cachedStatus))
    const response = await GET()
    const json = await response.json()
    expect(json).toEqual({ spotifyStatus: cachedStatus })
    expect(getStatus).not.toHaveBeenCalled()
  })
})
