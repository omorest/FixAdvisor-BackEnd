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

routerServices.get('/api/services/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const servicesRef = db.collection('services')
  const provider = await servicesRef.where('id', '==', id).get()
  provider.forEach(element => {
    res.json(element.data())
  })
})

routerServices.get('/api/services/search/:input', async (req: Request, res: Response) => {
  const { input } = req.params
  const servicesRef = await db.collection('services').get()
  const services = servicesRef.docs.map(toService)
  const servicesSearched = services?.filter(service => service.nameService.toLocaleLowerCase().includes(input.toLocaleLowerCase())) || []
  res
    .status(200)
    .json(servicesSearched)
})

routerServices.post('/api/services/new-service', async (req: Request, res: Response) => {
  const service: Service = req.body
  db.collection('services').doc(service.id).set(service)
  res.json({ status: 200 })
})

export { routerServices }
