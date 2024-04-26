import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Container from '@/components/global/Container'
import Header from '@/components/global/Header'
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

const montserrat = localFont({
  src: '../fonts/montserrat-extrabold-webfont.woff2',
  display: 'swap',
  variable: '--font-montserrat'
})

const plexSans = localFont({
  src: [
    {
      path: '../fonts/ibmplexsans-light-webfont.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../fonts/ibmplexsans-lightitalic-webfont.woff2',
      weight: '300',
      style: 'italic'
    },
    {
      path: '../fonts/ibmplexsans-medium-webfont.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../fonts/ibmplexsans-mediumitalic-webfont.woff2',
      weight: '500',
      style: 'italic'
    },
    {
      path: '../fonts/ibmplexsans-semibold-webfont.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../fonts/ibmplexsans-bold-webfont.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-plex-sans'
})

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${plexSans.variable}`}
    >
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
