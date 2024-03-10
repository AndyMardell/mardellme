import Subtitle from '@/components/global/Subtitle'
import Content from '@/components/global/Content'
import Emoji from '@/components/global/Emoji'
import Divider from '@/components/global/Divider'
import Button from '@/components/global/Button'
import Link from 'next/link'
import Spotify from '@/components/spotify/Spotify'

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
        I'm Andy, a project manager with a rich history in web development.
        Although my path has shifted from hands-on development to managing
        projects, coding still captivates my heart after hours.
      </p>
      <Button
        href="/work"
        style={{ marginTop: '2rem' }}
      >
        Work
      </Button>
      <Divider $small />
      <Spotify />
    </Content>
  )
}
