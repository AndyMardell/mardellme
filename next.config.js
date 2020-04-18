const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(
  withPlugins([optimizedImages], {
    env: {
      SPOTIFY_ID: process.env.SPOTIFY_ID,
      SPOTIFY_SECRET: process.env.SPOTIFY_SECRET,
      SPOTIFY_REDIRECT: process.env.SPOTIFY_REDIRECT,
      FAUNADB_SECRET: process.env.FAUNADB_SECRET,
    },
  })
)
