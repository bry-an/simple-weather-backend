import express from 'express'
import routes from './routes/index.js'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

export default app
