import Emoji from '@/components/global/Emoji'
import Content from '@/components/global/Content'
import Nav, { NavLink } from '@/components/global/Nav'
import ContactForm from '@/components/contact/ContactForm'

const links: NavLink[] = [
  { name: 'GitHub', url: 'https://github.com/AndyMardell' },
  { name: 'Twitter', url: 'https://twitter.com/AndyMardell' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/andymardell' },
  { name: 'Instagram', url: 'https://instagram.com/AndyMardell' }
]

export default function () {
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
          If you're interested in working with me, I'd love to hear from you. If
          not, I'd still love to hear from you! Drop me a message and I'll get
          back to you as soon as I can. You can also follow me around the
          internet (stalker) using the links below.
        </p>
      </Content>
      <Content maxWidth={500}>
        <ContactForm />
      </Content>
      <Nav links={links} />
    </>
  )
}
