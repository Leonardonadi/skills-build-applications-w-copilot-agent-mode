import express from 'express'
import './config/database.js'
import apiRouter from './routes/api.js'

const port = process.env.PORT || 8000
const codespaceName = process.env.CODESPACE_NAME
const appUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

const app = express()

app.use(express.json())
app.use('/api', apiRouter)

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl: appUrl })
})

app.listen(Number(port), '0.0.0.0', () => {
  console.log(`OctoFit API listening at ${appUrl}`)
})