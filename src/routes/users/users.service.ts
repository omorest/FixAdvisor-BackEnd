import { Request, Response, Router } from 'express'
import { db } from '../../../firebase/firebaseConfig'

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

export { routerUsers }
