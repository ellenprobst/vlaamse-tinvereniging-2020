const sendQuery = require('./utils/send-query')
require('dotenv').config()
var cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'dljqgwvnc',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const EDIT_ITEM = `
    mutation($id: ID!,$status: String!,$datum: Time!,$naam: String!,$email: String!,$vraag: String!,$antwoord: String, $titel: String, $publicatieDatum: Time, $images: [ImageInput] ){
      updateVraag(
        id: $id,
        data: {
          status: $status,
          datum: $datum,
          naam: $naam,
          email: $email,
          vraag: $vraag,
          antwoord: $antwoord,
          titel: $titel,
          publicatieDatum: $publicatieDatum,
          images: $images
        }
      ){
        _id
        status
        datum
        naam
        email
        vraag
        antwoord
        titel
      }
    }
`

exports.handler = async (event) => {
  const {
    id,
    status,
    datum,
    naam,
    email,
    vraag,
    antwoord,
    titel,
    publicatieDatum,
    images,
    imagesToDelete,
  } = JSON.parse(event.body)

  const { data, errors } = await sendQuery(EDIT_ITEM, {
    id,
    status,
    datum,
    naam,
    email,
    vraag,
    antwoord,
    titel,
    images,
    publicatieDatum,
  })

  // delete images from claudinary
  if (imagesToDelete && imagesToDelete.length) {
    await cloudinary.api.delete_resources(imagesToDelete, (error, result) => {
      if (error) console.log(error) // silent fail
    })
  }

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
