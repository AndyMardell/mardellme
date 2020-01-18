import FontFaceObserver from 'fontfaceobserver'
import { useEffect } from 'react'

type Fonts = Array<Font>
type Font = Array<string>

interface Options {
  addBodyClass?: Boolean
}

const defaultOptions = { addBodyClass: false }

/**
 * useFonts hook
 *
 * A React hook for loading Google Fonts using fontfaceobserver
 *
 * Example:
 * ```
 * useFonts([
 *   ['Roboto', '300,500']
 *   ['Open Sans']
 * ])
 * ```
 *
 * @param fontsArray Array of Google fonts and sizes
 * @param options Options
 * @returns void
 */
const useFonts = (
  fontsArray: Fonts,
  options: Options = defaultOptions
): void => {
  const fontsWithSizes = fontsArray.map((fontArray) => {
    const font = fontArray[0].replace(new RegExp(' ', 'g'), '+')
    let sizes = ''

    if (fontArray.length === 2) {
      sizes = ':' + fontArray[1]
    }

    return font + sizes
  })

  const fontsUri = fontsWithSizes.join('|')

  useEffect(() => {
    const link = document.createElement('link')
    link.href = `https://fonts.googleapis.com/css?family=${fontsUri}&display=swap`
    link.rel = 'stylesheet'

    document.head.appendChild(link)

    fontsArray.map(async (font) => {
      const fontClass = font[0].replace(new RegExp(' ', 'g'), '-')
      const fontFace = new FontFaceObserver(font[0])
      await fontFace.load()
      if (options.addBodyClass) {
        document.documentElement.classList.add(fontClass.toLowerCase())
      }
    })
  }, [fontsArray])
}

export default useFonts
