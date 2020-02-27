import { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import Container from '../components/global/Container'
import { Title } from '../components/global/Heading'
import Portfolio from '../components/work/Portfolio'

const Work: NextPage = () => (
  <Layout>
    <Head>
      <title>Work – Andy Mardell: Web Developer</title>
    </Head>
    <Container background>
      <Title>
        Mardell<span>.me</span>
      </Title>
      <p style={{ marginTop: '2rem', maxWidth: '800px' }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
        deserunt nesciunt cupiditate omnis. Placeat veritatis, obcaecati,
        doloribus est magnam architecto eveniet perspiciatis expedita soluta,
        totam adipisci hic voluptas quisquam exercitationem.
      </p>
      <Portfolio />
    </Container>
  </Layout>
)

export default Work
