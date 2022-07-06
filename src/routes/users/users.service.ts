import { Request, Response, Router } from 'express'
import { db } from '../../../firebase/firebaseConfig'
import { Service } from '../../models'

const routerUsers = Router()

routerUsers.get('/api/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  let user
  const providersRef = db.collection('providers')
  user = await providersRef.where('id', '==', id).get()
  if (!user.empty) {
    user.forEach(element => {
      res.json(element.data())
    })
    return
  }

  const clientsRef = db.collection('clients')
  user = await clientsRef.where('id', '==', id).get()
  if (!user.empty) {
    user.forEach(element => {
      res.json(element.data())
    })
    return
  }
  res
    .status(400)
    .json({ message: "user doesn't exist" })
})

routerUsers.get('/api/favourites/:idClient', async (req: Request, res: Response) => {
  const { idClient } = req.params
  const clientsRef = db.collection('clients')
  const client = await clientsRef.where('id', '==', idClient).get()
  const { favouriteServices } = client.docs[0].data()

  const servicesRef = await db.collection('services').get()
  const allServices = servicesRef.docs.map(doc => doc.data())
  const services = allServices.filter((service: Service) => favouriteServices.includes(service.id))
  res.json(services)
})

routerUsers.post('/api/favourites/:idClient-:idService', async (req: Request, res: Response) => {
  const { idClient, idService } = req.params

  const clientRef = db.collection('clients').doc(idClient)
  const { favouriteServices: favouriteServicesIds } = (await clientRef.get()).data()

  if (favouriteServicesIds.includes(idService)) {
    const favouriteServicesUpdates: string[] = favouriteServicesIds.filter(id => id !== idService)
    await clientRef.update({ favouriteServices: favouriteServicesUpdates })
    res.json({ favouriteServices: favouriteServicesUpdates })
    return
  }

  await clientRef.update({ favouriteServices: [...favouriteServicesIds, idService] })
  res.json({ favouriteServices: [...favouriteServicesIds, idService] })
})

export { routerUsers }
