import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons'
import styles from './Preview.module.scss'

interface Props {
  src: string
  setPlaying?: (playing: Boolean) => void
}

export default function Preview({ src, setPlaying: setParentPlaying }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState<Boolean>(false)

  useEffect(() => {
    setParentPlaying && setParentPlaying(playing)
  }, [playing, setParentPlaying])

  const playPause = () => {
    const audio = audioRef.current
    playing ? audio?.pause() : audio?.play()
  }

  return (
    <div>
      <audio
        role="audio"
        src={src}
        ref={audioRef}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <button
        className={styles.button}
        onClick={playPause}
        title={playing ? 'Pause' : 'Play'}
      >
        <FontAwesomeIcon icon={playing ? faPauseCircle : faPlayCircle} />
      </button>
    </div>
  )
}
