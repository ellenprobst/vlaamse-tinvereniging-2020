const sendQuery = require('./utils/send-query')

const CREATE_ITEM = `mutation($naam: String!,$datum: Time!,$email: String!,$vraag: String!, $images: [ImageInput]) {
  createVraag(data:{
    naam: $naam,
    datum: $datum,
    vraag: $vraag,
    email: $email,
    status: "new",
    titel: "",
    images:$images }){
    _id
    vraag
    naam
    images {
      id
      url
    }
    datum
    status
  }
}`

exports.handler = async (event) => {
  const { payload } = JSON.parse(event.body)
  const { naam, email, vraag, images } = payload.data

  const { data, errors } = await sendQuery(CREATE_ITEM, {
    naam,
    datum: new Date(Date.now()),
    email,
    vraag,
    images: JSON.parse(images),
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
      nieuweVraag: data.createItem,
    }),
  }
}
