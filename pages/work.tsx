import { NextPage } from 'next'
import Head from 'next/head'

import Layout from '../components/global/Layout'
import Container from '../components/global/Container'
import Portfolio from '../components/work/Portfolio'
import Header from '../components/global/Header'
import styled from 'styled-components'

const Work: NextPage = () => (
  <Layout>
    <Head>
      <title>Work – Andy Mardell: Web Developer</title>
    </Head>
    <Container background>
      <Header />
      <Wave>👋</Wave>
      <p style={{ marginTop: 0, maxWidth: '800px' }}>
        As a developer at{' '}
        <a
          href='https://sidigital.co'
          target='_blank'
          rel='noopener noreferrer'
        >
          Si digital
        </a>{' '}
        I have produced a variety of exciting websites over the past couple of
        years. For obvious reasons, I can't showcase these projects here.
        However, I like to keep myself busy; here are some projects I've taken
        on alone.
      </p>
      <Portfolio />
      <p style={{ maxWidth: '800px' }}>
        Do you think I might be able to help you out? Let's talk:
      </p>
      <a href='mailto:andy@mardell.me' style={{ display: 'inline-block' }}>
        ✉️ andy@mardell.me
      </a>
    </Container>
  </Layout>
)

const Wave = styled.p`
  margin: 1.5em 0 0;
  font-size: 2rem;

  @media only screen and (min-width 750px) {
    margin-top: 3em;
  }
`

export default Work
