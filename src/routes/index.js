import express from 'express'
import apiRoutes from './apiRoutes.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'Healthy'
  })
})
router.use('/api', apiRoutes)

export default router
