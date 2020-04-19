# mardell.me

An excuse for a personal site built on [next.js](https://nextjs.org/).
This is intended as a holding website while I build the real thing which,
realistically, may never be finished.

## Development

This build makes use of [Zeit Now](https://zeit.co/now)'s secrets, so you need
to add some env variables for development:

```bash
cp .env.build.dist .env.build
```

With the variables populated, you can go ahead and use the following:

```bash
npm i
npm run now
```

or, to test the build process:

```bash
npm run build
npm start
```

## Production

> Deployed to Zeit Now

```bash
npm run build
```

## Analyzing and Debugging

To analyze the webpack bundle, you can use

```bash
npm run analyze
```

This will build and open up a [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)
page for both the server and client packages.

## FaunaDB

This website uses [FaunaDB](https://fauna.com/) for some Serverless GraphQL
goodness. The schemas for this can be found in `./schemas`
