import { Request, Response, Router } from 'express'
import { db } from '../../../firebase/firebaseConfig'
import { Provider, Service } from '../../models'
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
  const service = await servicesRef.where('id', '==', id).get()
  service.forEach(element => {
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

routerServices.get('/api/services/provider/:providerId', async (req: Request, res: Response) => {
  const { providerId } = req.params
  const providerRef = db.collection('providers').doc(providerId)
  const { servicesIds } = (await providerRef.get()).data() as Provider
  const servicesRef = await db.collection('services').get()
  const services = servicesRef.docs.map(toService)
  const servicesProvider = services.filter((service: Service) => servicesIds?.includes(service.id))
  res
    .status(200)
    .json(servicesProvider)
})

routerServices.post('/api/services/new-service', async (req: Request, res: Response) => {
  const service: Service = req.body
  db.collection('services').doc(service.id).set(service)
  const providerRef = db.collection('providers').doc(service.providerId)
  const { servicesIds } = (await providerRef.get()).data()
  await providerRef.update({ servicesIds: [...servicesIds, service.id] })
  db.collection('reviews').doc('rev' + service.id).set({ serviceId: service.id, reviews: [] })
  res.json({ status: 200 })
})

routerServices.delete('/api/services/delete-service/', async (req: Request, res: Response) => {
  const service: Service = req.body
  await db.collection('services').doc(service.id).delete()
  const providerRef = db.collection('providers').doc(service.providerId)
  const { servicesIds } = (await providerRef.get()).data()
  await providerRef.update({ servicesIds: [...servicesIds.filter(serviceIn => serviceIn.id !== service.id)] })
  res.json({ servicesIds: [...servicesIds.filter(serviceIn => serviceIn.id !== service.id)] })
})

routerServices.put('/api/services/update-service/', async (req: Request, res: Response) => {
  const service: Service = req.body
  await db.collection('services').doc(service.id).update({ ...service })
  res.json({ status: 200 })
})

export { routerServices }
