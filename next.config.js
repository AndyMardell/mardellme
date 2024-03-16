// @ts-check

/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@import 'variables.scss';`
  }
}

module.exports = nextConfig
