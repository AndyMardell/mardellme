import { NextPage } from 'next'
import Head from 'next/head'

import Layout from '../components/global/Layout'
import Container from '../components/global/Container'
import Portfolio from '../components/work/Portfolio'
import Header from '../components/global/Header'
import Emoji from '../components/global/Emoji'
import Content from '../components/global/Content'
import Link from 'next/link'

const Work: NextPage = () => (
  <Layout>
    <Head>
      <title>Work – Andy Mardell: Web Developer</title>
      <meta
        name='description'
        content='Experienced Developer from Portsmouth - a selection of projects I have built from the ground up in React, Node.js, Gatsby, Next, WordPress and Magento.'
      />
    </Head>
    <Container>
      <Header />
      <Content maxWidth={800}>
        <Emoji animate='flex'>💪</Emoji>
        <p>
          As a developer at{' '}
          <a
            href='https://sidigital.co'
            target='_blank'
            rel='noopener noreferrer'
          >
            Si digital
          </a>
          , I have produced a variety of exciting websites over the past couple
          of years. For obvious reasons, I can't showcase these projects here.
          However, I like to keep myself busy; here are some projects I've taken
          on alone.
        </p>
      </Content>
      <Portfolio />
      <Content maxWidth={800}>
        <p>Do you think I might be able to help you out? Let's talk:</p>
        <Link href='/contact'>
          <a
            style={{
              display: 'inline-block',
              marginTop: '1rem',
              fontWeight: 500,
            }}
          >
            Contact me{' '}
            <Emoji inline right>
              &rarr;
            </Emoji>
          </a>
        </Link>
      </Content>
    </Container>
  </Layout>
)

export default Work
