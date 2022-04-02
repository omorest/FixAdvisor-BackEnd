import { initializeApp } from 'firebase/app'
import dotenv from 'dotenv'
dotenv.config()

console.log(process.env.API_KEY)
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
}

const app = initializeApp(firebaseConfig)
