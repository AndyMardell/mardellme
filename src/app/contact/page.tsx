import type { Metadata } from 'next'
import Emoji from '@/components/global/Emoji'
import Content from '@/components/global/Content'
import Nav, { NavLink } from '@/components/global/Nav'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact – mardell.me',
  description: `If you're interested in working with me, I'd love to hear from you. Find my contact details here and stalk me around the internet.`
}

const links: NavLink[] = [
  { name: 'GitHub', url: 'https://github.com/AndyMardell' },
  { name: 'X', url: 'https://x.com/AndyMardell' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/andymardell' },
  { name: 'Instagram', url: 'https://instagram.com/the.admrl' }
]

export default function Contact() {
  return (
    <>
      <Content maxWidth={800}>
        <Emoji
          animate="wave"
          origin="bottom left"
        >
          🤙
        </Emoji>
        <p>
          I'd love to hear from you. Drop me a message and I'll get back to you
          as soon as I can. You can also follow me around the internet (stalker)
          using the links below.
        </p>
      </Content>
      <Content maxWidth={500}>
        <ContactForm />
      </Content>
      <Nav links={links} />
    </>
  )
}
