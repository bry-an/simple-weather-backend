import express from 'express'
import apiRoutes from './apiRoutes.js'

const router = express.Router()

router.use('/api', apiRoutes)

router.use('*', function (req, res) {
  res.set('Content-Type', 'text/html').send(
    new Buffer.from(`
<h2>404</h2>
`)
  )
})

export default router
