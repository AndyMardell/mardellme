import Link from 'next/link'
import Subtitle from '@/components/global/Subtitle'
import Content from '@/components/global/Content'
import List from '@/components/global/List'
import Spotify from '@/components/spotify/Spotify'

export default function Home() {
  return (
    <Content>
      <Subtitle>
        mardell.me v<span>5.2</span>
      </Subtitle>
      <List>
        <li>
          tech PM, dev, button presser{' '}
          <Link
            href="https://sidigital.co"
            target="_blank"
          >
            @sidigital
          </Link>
        </li>
        <li>currently: caffeinated, context-switching</li>
        <li>status: system stable</li>
      </List>
      <Spotify />
      <p>
        contact: <Link href="mailto:m@rdell.me">m@rdell.me</Link>
      </p>
    </Content>
  )
}
