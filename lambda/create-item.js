const sendQuery = require('./utils/send-query')

// const CREATE_ITEM = `mutation(
//   $naam: String!,
//   $datum: Date!,
//   $vraag: String! ,
//   $email:String!,
//  {
//   createVraag(
//     data:{
//     naam: $naam,
//     datum: $datum,
//     vraag: $vraag,
//     email: $email,
//     status: "new",
//     images:[]
//   }){
//     _id
//     vraag
//     naam
//     images {
//       name
//       url
//     }
//     datum
//     status
//   }
// }`

const CREATE_ITEM = `mutation($naam: String!,$datum: Date!,$email: String!,$vraag: String!) {
  createVraag(data:{
    naam: $naam,
    datum: $datum,
    vraag: $vraag,
    email: $email,
    status: "new",
    images:[] }){
    _id
    vraag
    naam
    images {
      name
      url
    }
    datum
    status
  }
}`

exports.handler = async (event) => {
  const { naam, datum, email, images, vraag } = JSON.parse(event.body)
  const { data, errors } = await sendQuery(CREATE_ITEM, {
    naam,
    datum,
    email,
    vraag,
    images,
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
