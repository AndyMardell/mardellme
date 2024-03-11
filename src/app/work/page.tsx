import type { NextPage, Metadata } from 'next'
import Link from 'next/link'
import Portfolio from '@/components/work/Portfolio'
import Emoji from '@/components/global/Emoji'
import Content from '@/components/global/Content'
import Text from '@/components/global/Text'
import Sup from '@/components/global/Sup'

export const metadata: Metadata = {
  title: 'Work – mardell.me',
  description:
    'A collection of personal projects – some sillier than others, most born from curiosity'
}

const Work: NextPage = () => (
  <>
    <Content maxWidth={800}>
      <Emoji animate="flex">💪</Emoji>
      <p>
        As a developer at{' '}
        <Link
          href="https://sidigital.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          Si digital
        </Link>
        , I have produced a variety of "proper" websites over the years. For
        obvious reasons, I can't showcase these projects here.{' '}
      </p>
      <p>
        However, I like to keep myself busy; below, you'll discover a collection
        of personal projects – some sillier than others, most born from
        curiosity<Sup>1</Sup>
      </p>
    </Content>
    <Portfolio />
    <Content maxWidth={800}>
      <Text
        $small
        $italic
      >
        <Sup>1</Sup> Yes, they're nearly all unfinished and will likely remain
        that way
        <br />
        <Sup>2</Sup> I'm not a designer, but I do like to dabble <br />
        <Sup>3</Sup> I'm not a doctor, but I do like to babble
      </Text>
    </Content>
  </>
)

export default Work
