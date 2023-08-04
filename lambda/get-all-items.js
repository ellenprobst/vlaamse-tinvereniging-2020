const sendQuery = require('./utils/send-query')

const GET_ALL_ITEMS = `
    query($size: Int){
      alleVragen(_size: $size){
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
        after
        before
      }
    }
`

exports.handler = async (event) => {
  const { size } = event.queryStringParameters

  const { data, errors } = await sendQuery(GET_ALL_ITEMS, {
    size: Number(size),
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
      vragen: data.alleVragen.data,
    }),
  }
}
