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

interface Props {
  postMeta: { [key: string]: any }
  postContent: string
}

const Post: NextPage<Props> = ({ postMeta, postContent }) => {
  return (
    <Layout>
      <Head>
        <title>{postMeta.title} – Andy Mardell: Web Developer</title>
        <meta
          name='description'
          content='Occasional ramblings of Web Developer Andy Mardell. Common subjects include React, Javascript, Next.js, Node, Docker, Devops and more.'
        />
      </Head>
      <Container>
        <Header />
        <Content maxWidth={800}>
          <Title>{postMeta.title}</Title>
          <Date>{dayjs(postMeta.date).format('DD MMM YYYY')}</Date>
          <div>
            <ReactMarkdown source={postContent} />
          </div>
        </Content>
      </Container>
    </Layout>
  )
}

Post.getInitialProps = async (ctx: NextPageContext) => {
  const { slug } = ctx.query
  const content = await import(`../../posts/${slug}.md`)
  const { data: postMeta, content: postContent } = matter(content.default)

  return {
    postMeta,
    postContent,
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
