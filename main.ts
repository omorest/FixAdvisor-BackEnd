import { app } from './src/app'
import dotenv from 'dotenv'

dotenv.config()

const port: number = Number(process.env.PORT || 5000)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
