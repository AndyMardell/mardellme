import FormData from 'form-data'
import Mailgun from 'mailgun.js'

export async function POST(req: Request) {
  const { name, email, message } = await req.json()

  if (
    !process.env.MAILGUN_API_KEY ||
    !process.env.MAILGUN_DOMAIN ||
    !process.env.MAILGUN_EMAIL
  ) {
    return new Response('Missing API information', { status: 500 })
  }

  if (!name || !email || !message) {
    return new Response('Missing required fields', { status: 400 })
  }

  try {
    const mailgun = new Mailgun(FormData)

    const mg = mailgun.client({
      username: 'api',
      url: process.env.MAILGUN_API_URL,
      key: process.env.MAILGUN_API_KEY
    })

    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `${name}<${email}>`,
      to: [process.env.MAILGUN_EMAIL],
      subject: `A new website message from ${name}`,
      text: message
    })

    return new Response('Message sent', { status: 200 })
  } catch (err: any) {
    console.error(err)
    return new Response('Internal server error', { status: 500 })
  }
}
