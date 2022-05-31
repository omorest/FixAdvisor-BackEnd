import { Request, Response, Router } from 'express'
import { db } from '../../../firebase/firebaseConfig'
import { Service } from '../../models'
import { toService } from './parserServices'

const routerServices = Router()

routerServices.get('/api/services/', async (req: Request, res: Response) => {
  const usersDocs = await db.collection('services').get()
  const services = usersDocs.docs.map(toService)
  res.json(services)
})

routerServices.post('/api/new-service', async (req: Request, res: Response) => {
  const service: Service = req.body
  await db.collection('services').add({
    ...service
  }).then(() => {
    res.json({ status: 200 })
  }).catch((error) => {
    console.error(error)
  })
})

export { routerServices }
