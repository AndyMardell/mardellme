import { NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios'

import Layout from '../components/global/Layout'
import Container from '../components/global/Container'
import Block from '../components/home/Block'
import Links from '../components/home/Links'
import { Subtitle } from '../components/global/Heading'
import Header from '../components/global/Header'
import { PlayingProps } from '../components/global/Spotify/types'

const Home: NextPage<PlayingProps> = ({ playing }) => (
  <Layout>
    <Head>
      <title>Andy Mardell: Web Developer</title>
      <meta
        name='description'
        content='Experienced Developer from Portsmouth with a demonstrated history of working in the industry. Skilled in JavaScript (React, Node.js, Gatsby, Next), DevOps (Docker, Vagrant, Unix), PHP, WordPress and Magento.'
      />
    </Head>
    <Container flex background>
      <Header />
      <Subtitle>
        Creative
        <br />
        Developer
      </Subtitle>
      <Block>
        <p>
          Developer at{' '}
          <a
            href='https://sidigital.co'
            target='_blank'
            rel='noopener noreferrer'
          >
            Si digital.
          </a>
        </p>
        <p>
          ReactJS, Node.js, Gatsby, Next.js, Docker, Kubernetes, WordPress,
          Magento, cars, wife, guitar and coffee are all things I enjoy.
        </p>
        <Links />
      </Block>
    </Container>
  </Layout>
)

Home.getInitialProps = async () => {
  return {}
}

export default Home
