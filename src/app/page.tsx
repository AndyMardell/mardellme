import Container from '@/components/global/Container'
import Subtitle from '@/components/global/Subtitle'
import Header from '@/components/global/Header'
// import Spotify from '@/components/global/Spotify'
import Content from '@/components/global/Content'
import Emoji from '@/components/global/Emoji'
import Divider from '@/components/global/Divider'
import Button from '@/components/global/Button'
import Link from 'next/link'

export default function Home() {
  return (
    <Content maxWidth={700}>
      <Subtitle>
        Technical Project Manager at
        <br />
        <Link
          href="https://sidigital.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          Si digital.
        </Link>{' '}
      </Subtitle>
      <Emoji animate="wave">👋</Emoji>
      <p>
        I'm Andy, a technical project manager with a rich history in web
        development. Although my path has shifted from hands-on development to
        managing projects, coding still captivates my heart after hours.
      </p>
      <Button
        href="/work"
        style={{ marginTop: '2rem' }}
      >
        Work
      </Button>
      <Divider $small />
      {/* TODO: Fix Spotify */}
      {/* <Spotify /> */}
    </Content>
  )
}
