import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import dayjs from 'dayjs'
import fetchMock from 'jest-fetch-mock'
import Music from '@/components/music/Music'

fetchMock.enableMocks()

describe('Music Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('displays the track name and artist when data is fetched', async () => {
    const mockData = {
      musicStatus: {
        isPlaying: true,
        track: {
          artist: 'Tame Impala',
          name: 'The Less I Know The Better',
          url: 'https://www.last.fm/music/Tame+Impala/_/The+Less+I+Know+The+Better'
        },
        lastPlayed: '2021-07-21T12:00:00Z',
        lastUpdated: '2021-07-21T12:00:00Z'
      }
    }

    fetchMock.mockResponseOnce(JSON.stringify(mockData))

    render(<Music />)

    await waitFor(() => {
      expect(
        screen.getByText('now playing:', { exact: false })
      ).toBeInTheDocument()
      expect(
        screen.getByText('The Less I Know The Better - Tame Impala', {
          exact: false
        })
      ).toBeInTheDocument()
    })
  })

  it('displays the last played track when not playing', async () => {
    const mockData = {
      musicStatus: {
        isPlaying: false,
        track: {
          artist: 'Tame Impala',
          name: 'The Less I Know The Better',
          url: 'https://www.last.fm/music/Tame+Impala/_/The+Less+I+Know+The+Better'
        },
        lastPlayed: dayjs().subtract(1, 'hour').toISOString(),
        lastUpdated: dayjs().subtract(1, 'hour').toISOString()
      }
    }

    fetchMock.mockResponseOnce(JSON.stringify(mockData))

    render(<Music />)

    await waitFor(() => {
      expect(
        screen.getByText('last played:', { exact: false })
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          'The Less I Know The Better - Tame Impala (an hour ago)',
          { exact: false }
        )
      ).toBeInTheDocument()
    })
  })

  it('displays a loading message when fetching data', async () => {
    fetchMock.mockResponseOnce(() => new Promise(() => {}))

    render(<Music />)

    expect(
      screen.getByText('loading embarrassing song data...')
    ).toBeInTheDocument()
  })

  it('displays nothing when no data is fetched', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}))

    render(<Music />)

    await waitFor(() => {
      expect(
        screen.queryByText('loading embarrassing song data...')
      ).toBeNull()
    })
  })

  it('displays nothing when an error occurs', async () => {
    fetchMock.mockRejectOnce(new Error('An error occurred'))

    render(<Music />)

    await waitFor(() => {
      expect(
        screen.queryByText('loading embarrassing song data...')
      ).toBeNull()
    })
  })

  it('renders an open on last.fm link with the track URL', async () => {
    const mockData = {
      musicStatus: {
        isPlaying: false,
        track: {
          artist: 'Tame Impala',
          name: 'The Less I Know The Better',
          url: 'https://www.last.fm/music/Tame+Impala/_/The+Less+I+Know+The+Better'
        },
        lastPlayed: '2021-07-21T12:00:00Z',
        lastUpdated: '2021-07-21T12:00:00Z'
      }
    }

    fetchMock.mockResponseOnce(JSON.stringify(mockData))

    render(<Music />)

    await waitFor(() => {
      const link = screen.getByText('open on last.fm', { exact: false })
        .closest('a')
      expect(link).toHaveAttribute(
        'href',
        'https://www.last.fm/music/Tame+Impala/_/The+Less+I+Know+The+Better'
      )
    })
  })
})
