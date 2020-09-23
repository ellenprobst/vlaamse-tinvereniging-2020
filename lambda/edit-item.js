const sendQuery = require('./utils/send-query')

const EDIT_ITEM = `
    mutation($id: ID!,$status: String!,$datum: Date!,$naam: String!,$email: String!,$vraag: String!,$antwoord: String){
      updateVraag(
        id: $id,
        data: {
          status: $status,
          datum: $datum,
          naam: $naam,
          email: $email,
          vraag: $vraag,
          antwoord: $antwoord
        }
      ){
        _id
        status
        datum
        naam
        email
        vraag
        antwoord
      }
    }
`

exports.handler = async (event) => {
  const { id, status, datum, naam, email, vraag, antwoord } = JSON.parse(
    event.body
  )
  const { data, errors } = await sendQuery(EDIT_ITEM, {
    id,
    status,
    datum,
    naam,
    email,
    vraag,
    antwoord,
  })

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      updated: data.updateVraag,
    }),
  }
}
