import { Request, Response } from 'express'
import { app } from './src/app'
import dotenv from 'dotenv'
import { db } from './firebase/firebaseConfig'

dotenv.config()

const port: number = Number(process.env.PORT)

app.get('/', async (req: Request, res: Response) => {
  const usersDocs = await db.collection('users').get()
  console.log(usersDocs.docs[0].data())
  res.send('<h1>Fix Advisor</h1>')
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
