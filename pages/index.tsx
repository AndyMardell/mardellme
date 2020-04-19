import { NextPage } from 'next'
import Head from 'next/head'

import Layout from '../components/global/Layout'
import Container from '../components/global/Container'
import Links from '../components/home/Links'
import { Subtitle } from '../components/global/Heading'
import Header from '../components/global/Header'
import Spotify from '../components/global/Spotify'
import Text from '../components/global/Text'
import Emoji from '../components/global/Emoji'
import Divider from '../components/global/Divider'

const Home: NextPage = () => (
  <Layout>
    <Head>
      <title>Andy Mardell: Web Developer</title>
      <meta
        name='description'
        content='Experienced Developer from Portsmouth with a demonstrated history of working in the industry. Skilled in JavaScript (React, Node.js, Gatsby, Next), DevOps (Docker, Vagrant, Unix), PHP, WordPress and Magento.'
      />
    </Head>
    <Container>
      <Header />
      <Subtitle>
        Creative
        <br />
        Developer
      </Subtitle>
      <Text maxWidth={600}>
        <Emoji>👋</Emoji>
        <p style={{ marginTop: 0 }}>
          I'm Andy, a developer at{' '}
          <a
            href='https://sidigital.co'
            target='_blank'
            rel='noopener noreferrer'
          >
            Si digital.
          </a>{' '}
          React, Node.js, Gatsby, Next.js, Docker, Kubernetes, WordPress,
          Magento, cars, wife, guitar and coffee are all things I enjoy.
        </p>
        <Links />
        <Divider small />
        <Spotify />
      </Text>
    </Container>
  </Layout>
)

export default Home
