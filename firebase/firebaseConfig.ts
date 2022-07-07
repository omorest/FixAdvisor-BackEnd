import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { credential } from 'firebase-admin'
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

// const defaultApp = initializeApp(firebaseConfig)
// const defaultApp = initializeApp({
//   credential: applicationDefault()
// })

const firebaseAdminApp = initializeApp({
  credential: credential.cert(
    JSON.parse(Buffer.from(process.env.GOOGLE_CONFIG_BASE64, 'base64').toString('ascii')))
})

export const authF = getAuth(firebaseAdminApp)
export const db = getFirestore()
