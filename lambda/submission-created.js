const sendQuery = require('./utils/send-query')
const FORM = {
  vraag: 'vragen-formulier',
  contact: 'contact',
}

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
  const formName = payload.data['form-name']
  console.log(payload, images)
  // if (formName === FORM.vraag) {
  //   const { data, errors } = await sendQuery(CREATE_ITEM, {
  //     naam,
  //     datum: new Date(Date.now()),
  //     email,
  //     vraag,
  //     images: JSON.parse(images),
  //   })

  //   if (errors) {
  //     console.log(errors)
  //     return {
  //       statusCode: 500,
  //       body: JSON.stringify(errors),
  //     }
  //   }
  //   console.log('done')
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({
  //       nieuweVraag: data.createItem,
  //     }),
  //   }
  // }

  if (formName === FORM.contact) {
    return {
      statusCode: 200,
    }
  }

  return {
    statusCode: 200,
  }
}
