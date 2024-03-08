import Container from '@/components/global/Container'
import Subtitle from '@/components/global/Subtitle'
import Header from '@/components/global/Header'
import Spotify from '@/components/global/Spotify'
import Content from '@/components/global/Content'
import Emoji from '@/components/global/Emoji'
import Divider from '@/components/global/Divider'
import Button from '@/components/global/Button'

export default function Home() {
  return (
    <Container>
      <Header />
      <Subtitle>
        Creative
        <br />
        Developer
      </Subtitle>
      <Content maxWidth={600}>
        <Emoji animate="wave">👋</Emoji>
        <p>
          I'm Andy, a developer at{' '}
          <a
            href="https://sidigital.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            Si digital.
          </a>{' '}
          React, Node.js, Gatsby, Next.js, Docker, WordPress, cars, wife, guitar
          and coffee are all things I enjoy.
        </p>
        <Button
          href="/work"
          style={{ marginTop: '2rem' }}
        >
          View my work
        </Button>
        <Divider small />
        {/* TODO: Fix Spotify */}
        {/* <Spotify /> */}
      </Content>
    </Container>
  )
}
