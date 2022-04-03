import express, { Express } from 'express'
import { router } from './routes'

const app: Express = express()

app.use(router)

export { app }
