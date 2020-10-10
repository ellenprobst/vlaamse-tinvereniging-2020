require('dotenv').config()
const sendQuery = require('./utils/send-query')
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'dljqgwvnc',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const DELETE_ITEM = `
    mutation($id: ID!){
      deleteVraag(id: $id){
        _id
      }
    }
`

exports.handler = async (event) => {
  const { id, images } = JSON.parse(event.body)
  const { data, errors } = await sendQuery(DELETE_ITEM, { id })
  // delete images from claudinary
  if (images && images.length) {
    await cloudinary.api.delete_resources(
      images.map((image) => image.id),
      (error, result) => {
        if (error) console.log(error) // silent fail
      }
    )
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
      deleted: data.deleteVraag,
    }),
  }
}
