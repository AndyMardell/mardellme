import { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
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
      big: '1.7rem'
    }
  },
  colors: {
    white: '#f5f5f5',
    lightgrey: '#dddddd',
    midgrey: '#aaaaaa',
    grey: '#888888',
    darkgrey: '#333333',
    black: '#1a1a1a',
    red: '#FF7474',
    sipink: '#E54C87'
  }
}
