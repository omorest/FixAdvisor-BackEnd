import { Request, Response, Router } from 'express'
import { db } from '../../../firebase/firebaseConfig'
import { Provider } from '../../models'
import { toProvider } from './parserProviders'

const routerProviders = Router()

routerProviders.get('/api/providers', async (req: Request, res: Response) => {
  const usersDocs = await db.collection('providers').get()
  const providers = usersDocs.docs.map(toProvider)
  res.json(providers)
})

routerProviders.post('/api/users/new-provider', async (req: Request, res: Response) => {
  const provider: Provider = req.body
  db.collection('providers').doc(provider.id).set(provider)
  res.json({ status: 200 })
})

export { routerProviders }
