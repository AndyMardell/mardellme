import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const Contact = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, message } = req.body

  try {
    await axios(
      'https://b88fgwehp6.execute-api.eu-west-1.amazonaws.com/default/Mailgun',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': process.env.MAILGUN_API,
        },
        method: 'POST',
        data: {
          config: 'mardellme',
          subject: 'A new website message',
          body: {
            name,
            email,
            message,
          },
        },
      }
    )

    res.status(200).json({ statusCode: 200, message: 'Message sent' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default Contact
