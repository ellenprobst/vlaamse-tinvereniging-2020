const sendQuery = require('./utils/send-query')

const GET_ALL_PUBLISHED_ITEMS = `
query($size: Int, $cursor: String){
  alleGepubliceerdeVragen(status: "done",_size: $size, _cursor:$cursor) {
    data {
      _id
      status
      datum
      naam
      email
      vraag
      publicatieDatum
      antwoord
      titel
      images {
        id
        url
      }
    }
    before
    after
  }
}
`

exports.handler = async (event) => {
  const { size, cursor } = event.queryStringParameters
  const { data, errors } = await sendQuery(GET_ALL_PUBLISHED_ITEMS, {
    size: Number(size),
    cursor,
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
      vragen: data.alleGepubliceerdeVragen.data,
      beforeIndex: data.alleGepubliceerdeVragen.before,
      afterIndex: data.alleGepubliceerdeVragen.after,
    }),
  }
}
