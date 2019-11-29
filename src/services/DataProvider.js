import { firebase } from '@firebase/app'
import 'firebase/firestore'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBquJ8PawDWLNMi7u0Y9rhANoDrkxMirew',
  authDomain: 'money-per-day.firebaseapp.com',
  databaseURL: 'https://money-per-day.firebaseio.com',
  projectId: 'money-per-day',
  storageBucket: 'money-per-day.appspot.com',
  messagingSenderId: '550807968607'
}

const firebaseApp = firebase.initializeApp(config)

firebase.auth().useDeviceLanguage()

export const db = firebaseApp.firestore()
db.enablePersistence()
