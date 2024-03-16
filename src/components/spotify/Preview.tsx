import { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons'
import styles from '@/styles/spotify/Preview.module.scss'

interface Props {
  src: string
}

export default function Preview({ src }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState<Boolean>(false)

  const playPause = () => {
    const audio = audioRef.current
    if (playing) {
      audio?.pause()
    } else {
      audio?.play()
    }
    setPlaying(!playing)
  }

  return (
    <div>
      <audio
        src={src}
        ref={audioRef}
      />
      <button
        className={styles.button}
        onClick={() => playPause()}
        title="Preview"
      >
        <FontAwesomeIcon icon={playing ? faPauseCircle : faPlayCircle} />
      </button>
    </div>
  )
}
