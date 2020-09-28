const sendQuery = require('./utils/send-query')

const GET_ALL_ITEMS = `
    query{
      alleVragen{
        data {
          _id
          status
          datum
          naam
          email
          vraag
          antwoord
          titel
    
          images {
            id
            url
          }
        }
      }
    }
`

exports.handler = async () => {
  const { data, errors } = await sendQuery(GET_ALL_ITEMS)

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      vragen: data.alleVragen.data,
    }),
  }
}
