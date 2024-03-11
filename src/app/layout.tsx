import type { Metadata } from 'next'
import Providers from '@/app/providers'
import { GlobalStyle } from '@/styles/global'
import Container from '@/components/global/Container'
import Header from '@/components/global/Header'

export const metadata: Metadata = {
  title: 'Andy Mardell – mardell.me',
  description:
    'Experienced developer from Portsmouth with a demonstrated history of working in the industry. Skilled in JavaScript (Next.js, React, Node.js), DevOps, PHP, WordPress and Magento.'
}

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <GlobalStyle />
          <Container>
            <Header />
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  )
}
