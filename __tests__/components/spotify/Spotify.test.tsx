import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import dayjs from 'dayjs'
import fetchMock from 'jest-fetch-mock'
import Spotify from '@/components/spotify/Spotify'

fetchMock.enableMocks()

describe('Spotify Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('displays the track name and artist when data is fetched', async () => {
    const mockData = {
      spotifyStatus: {
        isPlaying: true,
        track: {
          artist: 'Tame Impala',
          name: 'The Less I Know The Better',
          url: 'https://open.spotify.com/track/some-track-id',
          preview: 'https://p.scdn.co/mp3-preview/some-preview-id'
        },
        lastPlayed: '2021-07-21T12:00:00Z',
        lastUpdated: '2021-07-21T12:00:00Z'
      }
    }

    fetchMock.mockResponseOnce(JSON.stringify(mockData))

    render(<Spotify />)

    await waitFor(() => {
      expect(
        screen.getByText('Now playing', { exact: false })
      ).toBeInTheDocument()
      expect(
        screen.getByText('The Less I Know The Better - Tame Impala')
      ).toBeInTheDocument()
    })
  })

  it('displays the last played track when not playing', async () => {
    const mockData = {
      spotifyStatus: {
        isPlaying: false,
        track: {
          artist: 'Tame Impala',
          name: 'The Less I Know The Better',
          url: 'https://open.spotify.com/track/some-track-id',
          preview: 'https://p.scdn.co/mp3-preview/some-preview-id'
        },
        lastPlayed: dayjs().subtract(1, 'hour').toISOString(),
        lastUpdated: dayjs().subtract(1, 'hour').toISOString()
      }
    }

    fetchMock.mockResponseOnce(JSON.stringify(mockData))

    render(<Spotify />)

    await waitFor(() => {
      expect(
        screen.getByText('Last played', { exact: false })
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          'The Less I Know The Better - Tame Impala (an hour ago)'
        )
      ).toBeInTheDocument()
    })
  })

  it('displays a loading message when fetching data', async () => {
    fetchMock.mockResponseOnce(() => new Promise(() => {}))

    render(<Spotify />)

    expect(
      screen.getByText('Loading embarrassing song data...')
    ).toBeInTheDocument()
  })

  it('displays nothing when no data is fetched', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}))

    render(<Spotify />)

    await waitFor(() => {
      expect(screen.queryByText('Loading embarrassing song data...')).toBeNull()
    })
  })

  it('displays nothing when an error occurs', async () => {
    fetchMock.mockRejectOnce(new Error('An error occurred'))

    render(<Spotify />)

    await waitFor(() => {
      expect(screen.queryByText('Loading embarrassing song data...')).toBeNull()
    })
  })
})
