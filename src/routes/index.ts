import { Request, Response, Router } from 'express'
import { db } from '../../firebase/firebaseConfig'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const usersDocs = await db.collection('users').get()
  console.log(usersDocs.docs[0].data())
  res.send('<h1>Fix Advisor</h1>')
})

router.get('/api/users/', async (req: Request, res: Response) => {
  const usersDocs = await db.collection('users').get()
  const users = usersDocs.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    }
  })
  console.log(users)
  res.send('<h1>Fix Advisor</h1>')
})

export { router }
