import FontFaceObserver from 'fontfaceobserver'
import { useEffect } from 'react'

const useFonts = (url: string, fonts: Array<string>) => {
  useEffect(() => {
    const link = document.createElement('link')
    link.href = url
    link.rel = 'stylesheet'

    document.head.appendChild(link)

    fonts.map((font) => {
      const fontFace = new FontFaceObserver(font)
      fontFace.load()
    })
  }, [])
}

export default useFonts
