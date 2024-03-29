require('dotenv').config()
const sgMail = require('@sendgrid/mail')
const postmark = require('postmark')
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY)

exports.handler = async (event, context, callback) => {
  const payload = JSON.parse(event.body)
  const { email, titel, antwoord, from = 'hello@ellenprobst.com' } = payload

  // Send an email:

  // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: email,
    from: from,
    subject: titel,
    text: antwoord,
  }

  try {
    // await sgMail.send(msg)

    await client
      .sendEmail({
        From: 'hello@ellenprobst.com',
        To: 'hello@ellenprobst.com',
        Subject: 'Hello from Postmark',
        HtmlBody: '<strong>Hello</strong> dear Postmark user.',
        TextBody: 'Hello from Postmark!',
        MessageStream: 'outbound',
      })
      .then((res) => console.log(res))
      .catch((er) => console.log(er))

    return {
      statusCode: 200,
      body: 'Message sent',
    }
  } catch (e) {
    return {
      statusCode: e.code,
      body: e.message,
    }
  }
}
