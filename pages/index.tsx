import { NextPage } from 'next'
import Layout from '../components/Layout'
import Container from '../components/global/Container'
import Block from '../components/home/Block'
import { Title, Subtitle } from '../components/global/Heading'

const Home: NextPage = () => (
  <Layout>
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
              <a href='#'>GitHub</a>
            </li>
            <li>
              <a href='#'>Twitter</a>
            </li>
            <li>
              <a href='#'>Instagram</a>
            </li>
            <li>
              <a href='#'>andy@mardell.me</a>
            </li>
          </ul>
        </nav>
      </Block>
    </Container>
  </Layout>
)

export default Home
