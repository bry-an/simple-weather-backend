import express from 'express'
import routes from './routes/index.js'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(routes)

export default app
