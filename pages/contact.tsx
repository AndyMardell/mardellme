import { NextPage } from 'next'
import Head from 'next/head'

import Layout from '../components/global/Layout'
import Container from '../components/global/Container'
import Header from '../components/global/Header'
import Emoji from '../components/global/Emoji'
import Content from '../components/global/Content'
import Nav, { NavLink } from '../components/global/Header/Nav'
import ContactForm from '../components/contact/ContactForm'

const links: NavLink[] = [
  { name: 'GitHub', url: 'https://github.com/AndyMardell' },
  { name: 'Twitter', url: 'https://twitter.com/AndyMardell' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/andymardell' },
  { name: 'Instagram', url: 'https://instagram.com/AndyMardell' },
]

const Contact: NextPage = () => (
  <Layout>
    <Head>
      <title>Contact – Andy Mardell: Web Developer</title>
      <meta
        name='description'
        content='Contact Andy Mardell – Web developer from Portsmouth. You will also find all my social media and GitHub links on this page.'
      />
    </Head>
    <Container>
      <Header />
      <Content maxWidth={800}>
        <Emoji>🤙</Emoji>
        <p>
          If you're interested in working with me, I'd love to hear from you. If
          not, I'd still love to hear from you! Drop me a message and I'll get
          back to you as soon as I can. You can also follow me around the
          internet (stalker) using the links below.
        </p>
      </Content>
      <Content maxWidth={500}>
        <ContactForm />
      </Content>
      <Nav links={links} />
    </Container>
  </Layout>
)

export default Contact
