import { NextPage } from 'next'
import Head from 'next/head'

import Layout from '../../components/global/Layout'
import Container from '../../components/global/Container'
import Header from '../../components/global/Header'
import Emoji from '../../components/global/Emoji'
import Content from '../../components/global/Content'
import Divider from '../../components/global/Divider'
import Link from 'next/link'
import styled from 'styled-components'

const Blog: NextPage = () => (
  <Layout>
    <Head>
      <title>Blog – Andy Mardell: Web Developer</title>
      <meta
        name='description'
        content='Occasional ramblings of Web Developer Andy Mardell. Common subjects include React, Javascript, Next.js, Node, Docker, Devops and more.'
      />
    </Head>
    <Container>
      <Header />
      <Content maxWidth={800}>
        <Emoji>📝</Emoji>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eaque
          quo id placeat ducimus distinctio veniam, pariatur quasi doloribus
          consequatur. Nulla, quam atque possimus voluptates placeat a minima
          molestias cum.
        </p>
      </Content>
      <Divider spaced small />
      <Content maxWidth={800}>
        <Link href='/blog/post'>
          <a>
            <Title>
              How I wrote a Spotify "Now Playing" component using React, Next.js
              and FaunaDB
            </Title>
            <Date>02 Apr 2020</Date>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
              sapiente consequatur sint. Nostrum maxime, ea, corporis sed
              accusantium exercitationem cum deserunt culpa dolor perferendis
              commodi hic debitis recusandae veritatis similique.
            </p>
            <Link href='/blog/post'>
              <a
                style={{
                  display: 'inline-block',
                  fontWeight: 500,
                }}
              >
                Read more{' '}
                <Emoji inline right>
                  &rarr;
                </Emoji>
              </a>
            </Link>
          </a>
        </Link>
      </Content>
      <Divider spaced small />
      <Content maxWidth={800}>
        <Link href='/blog/post'>
          <a>
            <Title>Some title</Title>
            <Date>02 Apr 2020</Date>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
              sapiente consequatur sint. Nostrum maxime, ea, corporis sed
              accusantium exercitationem cum deserunt culpa dolor perferendis
              commodi hic debitis recusandae veritatis similique.
            </p>
            <Link href='/blog/post'>
              <a
                style={{
                  display: 'inline-block',
                  fontWeight: 500,
                }}
              >
                Read more{' '}
                <Emoji inline right>
                  &rarr;
                </Emoji>
              </a>
            </Link>
          </a>
        </Link>
      </Content>
    </Container>
  </Layout>
)

const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.size.big};
  margin-bottom: 0.4em;
  font-weight: 600;
  line-height: 1.4;
`

const Date = styled.div`
  color: ${({ theme }) => theme.colors.grey};
  font-size: 0.9em;
  margin-bottom: 1.3em;
`

export default Blog
