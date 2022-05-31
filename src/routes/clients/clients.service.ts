import { Request, Response, Router } from 'express'
import { db } from '../../../firebase/firebaseConfig'
import { Client } from '../../models/client.model'
import { toClient } from './parserClients'

const routerClients = Router()

routerClients.get('/api/clients', async (req: Request, res: Response) => {
  const usersDocs = await db.collection('clients').get()
  const clients = usersDocs.docs.map(toClient)
  res.json(clients)
})

routerClients.post('/api/users/new-client', async (req: Request, res: Response) => {
  const client: Client = req.body
  db.collection('clients').doc(client.id).set(client)
  res.json({ status: 200 })
})

export { routerClients }
