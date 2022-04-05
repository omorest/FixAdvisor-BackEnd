import express, { Express } from 'express'
import { router } from './routes'
import bodyParser from 'body-parser'

const app: Express = express()

app.use(router)
app.use(bodyParser.json())

export { app }
