import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

import dotenv from 'dotenv'
dotenv.config()

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID
// }

// initializeApp(firebaseConfig)
const defaultApp = initializeApp({
  credential: applicationDefault()
})

export const authF = getAuth(defaultApp)
export const db = getFirestore()
