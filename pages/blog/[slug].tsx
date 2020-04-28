import { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'

import Layout from '../../components/global/Layout'
import Container from '../../components/global/Container'
import Header from '../../components/global/Header'
import Content from '../../components/global/Content'
import dayjs from 'dayjs'

export interface Post {
  meta: { [key: string]: any }
  content: string
}

interface Props {
  post: Post
}

const Post: NextPage<Props> = ({ post }) => {
  const { meta, content } = post

  return (
    <Layout>
      <Head>
        <title>{meta.title} – Andy Mardell: Web Developer</title>
        <meta
          name='description'
          content='Occasional ramblings of Web Developer Andy Mardell. Common subjects include React, Javascript, Next.js, Node, Docker, Devops and more.'
        />
      </Head>
      <Container>
        <Header />
        <Content maxWidth={800}>
          <Title>{meta.title}</Title>
          <Date>{dayjs(meta.date).format('DD MMM YYYY')}</Date>
          <div>
            <ReactMarkdown source={content} />
          </div>
        </Content>
      </Container>
    </Layout>
  )
}

Post.getInitialProps = async (ctx: NextPageContext) => {
  const { slug } = ctx.query
  const mdContent = await import(`../../posts/${slug}.md`)
  const { data: meta, content } = matter(mdContent.default)

  return {
    post: {
      meta,
      content,
    },
  }
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

export default Post
