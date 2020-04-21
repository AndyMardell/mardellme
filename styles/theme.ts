import { DefaultTheme } from 'styled-components'

const theme: DefaultTheme = {
  font: {
    family: {
      body: "'IBM Plex Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      heading: "'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    },
    size: {
      base: {
        min: '15',
        max: '18'
      },
      big: '2rem'
    }
  },
  colors: {
    white: '#f5f5f5',
    grey: '#777777',
    darkgrey: '#333333',
    black: '#1a1a1a'
  }
}

export { theme }
