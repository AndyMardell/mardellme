import { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import Container from '../components/global/Container'
import Block from '../components/home/Block'
import Links from '../components/home/Links'
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
        <Links />
      </Block>
    </Container>
  </Layout>
)

export default Home
