import express from 'express'
import axios from 'axios'
const router = express.Router()
import { cityResponseParser } from '../utils/index.js'

router.get('/search/:city', async (req, res) => {
  const response = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${req.params.city}&key=${process.env.OCDATAAPI}`
  )
  return res.json(cityResponseParser(response.data))
})

export default router
