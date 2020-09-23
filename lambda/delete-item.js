const sendQuery = require('./utils/send-query')

const DELETE_ITEM = `
    mutation($id: ID!){
      deleteVraag(id: $id){
        _id
      }
    }
`

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body)
  const { data, errors } = await sendQuery(DELETE_ITEM, { id })

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      deleted: data.deleteVraag,
    }),
  }
}
