const admin = require('firebase-admin')
const firestore = require('firebase-admin/firestore')
var serviceAccount = require('./utils/serviceAccountKey.json')

const config = {
  apiKey: 'AIzaSyBnlComeqdyiDtP_Y00VucjhPRuGZfEkGE',
  authDomain: 'tinvereniging.firebaseapp.com',
  projectId: 'tinvereniging',
  storageBucket: 'tinvereniging.appspot.com',
  messagingSenderId: '767327320354',
  appId: '1:767327320354:web:77f2f1bc9f66be72fb0d7b',
  measurementId: 'G-19PJT88BX1',
}

const FORM = {
  vraag: 'vragen-formulier',
  contact: 'contact',
}

if (!admin?.apps?.length) {
  admin.initializeApp({
    ...config,
    credential: admin.credential.cert({
      ...serviceAccount,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    }),
  })
}

exports.handler = async (event) => {
  const db = firestore.getFirestore()
  const { payload } = JSON.parse(event.body)
  const { naam, email, vraag, images } = payload.data
  const formName = payload.data['form-name'] || payload.form_name // payload in production differs from local env, hence the double check

  if (formName === FORM.vraag) {
    try {
      await db
        .collection('vragen')
        .doc()
        .set({
          naam,
          datum: new Date(Date.now()).toISOString(),
          email,
          vraag,
          images: JSON.parse(images),
          status: 'new',
        })

      return {
        statusCode: 200,
      }
    } catch (error) {
      console.log(error)
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      }
    }
  }

  if (formName === FORM.contact) {
    return {
      statusCode: 200,
    }
  }
}
