import { routerServices, routerClients, routerProviders } from './routes'
import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app: Express = express()

app.use(cors())
app.use(bodyParser.json())
app.use(routerServices)
app.use(routerClients)
app.use(routerProviders)

export { app }
