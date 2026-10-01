import express from 'express'
import './config/database.js'
import { apiBaseUrl } from './config/api-url.js'
import apiRouter from './routes/api.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)

app.use(express.json())
app.use('/api', apiRouter)

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl: apiBaseUrl })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`)
})