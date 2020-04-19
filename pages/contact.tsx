import { NextPage } from 'next'
import Head from 'next/head'

import Layout from '../components/global/Layout'
import Container from '../components/global/Container'
import Header from '../components/global/Header'
import Emoji from '../components/global/Emoji'
import Text from '../components/global/Text'
import Nav, { NavLink } from '../components/global/Header/Nav'
import ContactForm from '../components/contact/ContactForm'

const links: NavLink[] = [
  { name: 'Email', url: 'mailto:andy@mardell.me' },
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
      <Text maxWidth={800}>
        <Emoji>🤙</Emoji>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus
          culpa maxime numquam fuga minus necessitatibus quos, cum iure? Dolor,
          accusamus nulla. Unde harum nihil, autem perspiciatis nisi voluptates
          architecto eveniet?
        </p>
      </Text>
      <div style={{ margin: '3rem 0 3.5rem' }}>
        <ContactForm />
      </div>
      <Nav links={links} />
    </Container>
  </Layout>
)

export default Contact
