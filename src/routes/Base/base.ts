import { Request, Response, Router } from 'express'

const routerBase = Router()

routerBase.get('/', async (req: Request, res: Response) => {
  res.send('API REST FixAdvisor')
})

export { routerBase }
