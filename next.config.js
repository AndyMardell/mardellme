const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

module.exports = withPlugins([optimizedImages], {
  env: {
    SPOTIFY_ID: process.env.SPOTIFY_ID,
    SPOTIFY_SECRET: process.env.SPOTIFY_SECRET,
    SPOTIFY_REDIRECT: process.env.SPOTIFY_REDIRECT,
    FAUNADB_SECRET: process.env.FAUNADB_SECRET,
  },
})
