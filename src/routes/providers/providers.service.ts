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

routerProviders.get('/api/providers/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const providersRef = db.collection('providers')
  const provider = await providersRef.where('id', '==', id).get()
  provider.forEach(element => {
    res.json(element.data())
  })
})

routerProviders.post('/api/providers/new-provider', async (req: Request, res: Response) => {
  const provider: Provider = req.body
  db.collection('providers').doc(provider.id).set(provider)
  res.json({ status: 200 })
})

routerProviders.put('/api/providers/update-provider', async (req: Request, res: Response) => {
  const provider: Provider = req.body
  db.collection('providers').doc(provider.id).update({ ...provider })
  res.json({ status: 200 })
})

export { routerProviders }
