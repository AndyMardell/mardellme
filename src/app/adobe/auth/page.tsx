import Button from '@/components/global/Button'
import Content from '@/components/global/Content'
import Text from '@/components/global/Text'

export const metadata = {
  title: 'Connect to Adobe Lightroom',
  description: 'Connect your Adobe Lightroom account to get started',
  robots: {
    follow: false,
    index: false,
    googleBot: {
      index: false,
      follow: false
    }
  }
}

export default function AuthPage() {
  const adobeAuthURL = `https://ims-na1.adobelogin.com/ims/authorize?client_id=${process.env.ADOBE_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.ADOBE_REDIRECT_URI!)}&response_type=code&scope=openid,lr_partner_apis`

  return (
    <Content maxWidth={600}>
      <h1>Connect to Adobe Lightroom</h1>
      <Text>
        To get started, please connect your Adobe Lightroom account. If
        you&apos;re not me, then you shouldn&apos;t be here.
      </Text>
      <Button href={adobeAuthURL}>Login with Adobe</Button>
    </Content>
  )
}
