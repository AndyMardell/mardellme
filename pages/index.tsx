import { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import Container from '../components/global/Container'
import Block from '../components/home/Block'
import { Title, Subtitle } from '../components/global/Heading'

const Home: NextPage = () => (
  <Layout>
    <Head>
      <title>Andy Mardell: Web Developer</title>
    </Head>
    <Container>
      <Title>
        Mardell<span>.me</span>
      </Title>
      <Subtitle>
        Creative
        <br />
        Developer
      </Subtitle>
      <Block>
        <p>
          Developer at <a href='https://sidigital.co'>Si digital</a>. ReactJS,
          Node.js, Gatsby, Next.js, Docker, WordPress, Magento, cars, wife and
          coffee are all things I enjoy.
        </p>
        <nav>
          <ul>
            <li>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://github.com/AndyMardell'
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://twitter.com/AndyMardell'
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://instagram.com/AndyMardell'
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='mailto:andy@mardell.me'
              >
                andy@mardell.me
              </a>
            </li>
          </ul>
        </nav>
      </Block>
    </Container>
  </Layout>
)

export default Home
