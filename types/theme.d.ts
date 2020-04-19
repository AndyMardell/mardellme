import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    font: {
      family: {
        body: string
        heading: string
      }
      size: {
        base: {
          min: string
          max: string
        }
        big: string
      }
    }
    colors: any
  }
}
