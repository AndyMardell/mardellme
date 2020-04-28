const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const glob = require('glob')
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins([optimizedImages, bundleAnalyzer], {
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
  exportPathMap: async function() {
    const routes = {}
    const posts = glob.sync('posts/**/*.md')
    const postSlugs = posts.map((file) =>
      file
        .split('/')[1]
        .replace(/ /g, '-')
        .slice(0, -3)
        .trim()
    )
    postSlugs.forEach((blog) => {
      routes[`/blog/${blog}`] = { page: '/blog/[slug]', query: { slug: blog } }
    })
    return routes
  },
  env: {
    SPOTIFY_ID: process.env.SPOTIFY_ID,
    SPOTIFY_SECRET: process.env.SPOTIFY_SECRET,
    SPOTIFY_REDIRECT: process.env.SPOTIFY_REDIRECT,
    FAUNADB_SECRET: process.env.FAUNADB_SECRET,
  },
})
