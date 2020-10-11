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
  console.log(JSON.parse(event.body))
  const { payload } = JSON.parse(event.body)
  console.log('data: ', payload.data)
  console.log('images: ', payload.data.images)
  console.log('parsed: ', JSON.parse(payload.data.images))
  // const { data, errors } = await sendQuery(CREATE_ITEM, {
  //   naam,
  //   datum: new Date(Date.now()),
  //   email,
  //   vraag,
  //   images,
  // })
  // // console.log(errors)
  // if (errors) {
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify(errors),
  //   }
  // }

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     nieuweVraag: data.createItem,
  //   }),
  // }
}
