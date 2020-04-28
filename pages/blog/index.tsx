import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import matter from 'gray-matter'
import dayjs from 'dayjs'

import Layout from '../../components/global/Layout'
import Container from '../../components/global/Container'
import Header from '../../components/global/Header'
import Emoji from '../../components/global/Emoji'
import Content from '../../components/global/Content'
import Divider from '../../components/global/Divider'
import { Post } from './[slug]'

interface Props {
  posts: Post[]
}

const Blog: NextPage<Props> = ({ posts }) => {
  return (
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

        <div>
          {posts.map(({ meta }) => (
            <div>
              <Divider spaced small />
              <Content maxWidth={800}>
                <Link href={`/blog/${meta.slug}`}>
                  <a>
                    <Title>{meta.title}</Title>
                    <Date>{dayjs(meta.date).format('DD MMM YYYY')}</Date>
                    <p>{meta.excerpt}</p>
                    <Link href={`/blog/${meta.slug}`}>
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
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  )
}

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

Blog.getInitialProps = async () => {
  const posts = ((context) => {
    const keys = context.keys()
    const values = keys.map(context)
    const data = keys.map((key: any, index: any) => {
      const slug = key
        .replace(/^.*[\\\/]/, '')
        .split('.')
        .slice(0, -1)
        .join('.')
      const mdContent: any = values[index]
      const { data: meta, content } = matter(mdContent.default)

      return {
        meta,
        content,
        slug,
      }
    })
    return data
  })(require.context('../../posts', true, /\.md$/))

  return {
    posts,
  }
}

export default Blog
