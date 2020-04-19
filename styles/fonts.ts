const fonts = () => `
  @font-face {
    font-family: 'Montserrat';
    src: url('/fonts/montserrat-extrabold-webfont.woff2') format('woff2'),
        url('/fonts/montserrat-extrabold-webfont.woff') format('woff');
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: 'IBM Plex Sans';
    src: url('/fonts/ibmplexsans-light-webfont.woff2') format('woff2'),
        url('/fonts/ibmplexsans-light-webfont.woff') format('woff');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'IBM Plex Sans';
    src: url('/fonts/ibmplexsans-lightitalic-webfont.woff2') format('woff2'),
        url('/fonts/ibmplexsans-lightitalic-webfont.woff') format('woff');
    font-weight: 300;
    font-style: italic;
  }

  @font-face {
    font-family: 'IBM Plex Sans';
    src: url('/fonts/ibmplexsans-medium-webfont.woff2') format('woff2'),
        url('/fonts/ibmplexsans-medium-webfont.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'IBM Plex Sans';
    src: url('/fonts/ibmplexsans-mediumitalic-webfont.woff2') format('woff2'),
        url('/fonts/ibmplexsans-mediumitalic-webfont.woff') format('woff');
    font-weight: 500;
    font-style: italic;
  }
`

export { fonts }
