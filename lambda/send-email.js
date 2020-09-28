require('dotenv').config()
const sgMail = require('@sendgrid/mail')

exports.handler = async (event, context, callback) => {
  const payload = JSON.parse(event.body)
  const { email, titel, antwoord, from = 'hello@ellenprobst.com' } = payload

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: email,
    from: from,
    subject: titel,
    text: antwoord,
  }

  try {
    await sgMail.send(msg)

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
