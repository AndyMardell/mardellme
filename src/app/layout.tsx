import type { Metadata } from 'next'
import { Fira_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Container from '@/components/global/Container'
import 'normalize.css/normalize.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/styles/global.scss'

export const metadata: Metadata = {
  title: 'Andy Mardell - mardell.me',
  description:
    'A technical project manager from Portsmouth with a rich history in web development. Skilled in Next.js, React, DevOps, PHP, Typescript.'
}

interface Props {
  children: React.ReactNode
}

const firaMono = Fira_Mono({
  subsets: ['latin'],
  variable: '--font-fira-mono',
  display: 'swap',
  weight: ['400', '700']
})

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html
      lang="en"
      className={firaMono.variable}
    >
      <body>
        <Container>{children}</Container>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
