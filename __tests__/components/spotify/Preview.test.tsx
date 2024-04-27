import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Preview from '@/components/spotify/Preview'
import '@testing-library/jest-dom'

describe('Preview', () => {
  it('renders an audio player', () => {
    render(<Preview src="https://example.com/audio.mp3" />)
    const audioPlayer = screen.getByRole('audio')
    expect(audioPlayer).toBeInTheDocument()
  })

  it('renders a play button', () => {
    render(<Preview src="https://example.com/audio.mp3" />)
    const playButton = screen.getByRole('button')
    expect(playButton).toBeInTheDocument()
  })

  it('toggles the play button', async () => {
    window.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve())
    window.HTMLMediaElement.prototype.pause = jest.fn(() => Promise.resolve())

    render(<Preview src="https://example.com/audio.mp3" />)
    const playButton = screen.getByRole('button')
    const audioElement = screen.getByRole('audio') as HTMLAudioElement

    expect(playButton).toHaveAttribute('title', 'Play')

    fireEvent.play(audioElement)
    await waitFor(() => {
      expect(playButton).toHaveAttribute('title', 'Pause')
    })

    fireEvent.pause(audioElement)
    await waitFor(() => {
      expect(playButton).toHaveAttribute('title', 'Play')
    })
  })
})
