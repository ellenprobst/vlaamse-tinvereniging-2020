import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import config from './config'

firebase.initializeApp(config)

const firestore = firebase.firestore()

export { firestore }
export default firebase
