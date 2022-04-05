import { Request, Response, Router } from 'express'
import { db } from '../../firebase/firebaseConfig'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
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
  res.json(users)
})

router.get('/api/users/clients', async (req: Request, res: Response) => {
  const usersDocs = await db.collection('users').get()
  const clients = usersDocs.docs.filter(doc => doc.data().type === 'client').map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    }
  })
  res.json(clients)
})

router.get('/api/users/providers', async (req: Request, res: Response) => {
  const usersDocs = await db.collection('users').get()
  const providers = usersDocs.docs.filter(doc => doc.data().type === 'provider').map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    }
  })
  res.json(providers)
})

router.post('api/users/new-client', async (req: Request, res: Response) => {
  const { name, type, email } = req.body
  await db.collection('users').add({
    name,
    type,
    email
  })
  res.json({ status: 200 })
})

router.get('/api/services/', async (req: Request, res: Response) => {
  const usersDocs = await db.collection('services').get()
  const services = usersDocs.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    }
  })
  res.json(services)
})

export { router }
