import express from 'express'
import weatherRoutes from './weatherRoutes.js'
import cityRoutes from './cityRoutes.js'

const router = express.Router()

router.use('/weather', weatherRoutes)
router.use('/city', cityRoutes)

export default router
