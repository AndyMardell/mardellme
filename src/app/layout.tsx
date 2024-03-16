import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Container from '@/components/global/Container'
import Header from '@/components/global/Header'
import 'normalize.css/normalize.css'
import '@/styles/global.scss'

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
        <Container>
          <Header />
          {children}
        </Container>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
