import express from 'express'
import https from 'https'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.get('/:city', async function (req, res) {
  const { lat, lng } = (
    await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${req.params.city}&key=${process.env.OCDATAAPI}`
    )
  ).data.results[0].geometry
  console.log('Sluice Road', lat, lng)

  const { forecast: forecastURL, forecastHourly: forecastHourlyURL } = (
    await axios.get(`https://api.weather.gov/points/${lat},${lng}`)
  ).data.properties

  console.log('rest', 'test', forecastURL, forecastHourlyURL)

  const forecastHourly = await axios.get(forecastHourlyURL).data
  const forecast = await axios.get(forecastURL).data
  console.log('forecast', forecast)
  console.log('forecastHourly', forecastHourly)

  // send hourly data
  // add humidity
  // what 3 words
  // Sluice road too

  // 8 objects for 8 days
  // each day
  // -daily weather
  // -hourly weather
  // outside
  // current object (first hourly data)
  // and Sluice road

  // https://api.weather.gov/openapi.json
  // https://api.weather.gov/gridpoints/{office}/{grid X},{grid Y}/forecast

  //   https.get('https://nodejs.org/dist/index.json', (res) => {
  //     console.log('worked??')
  //     let rawData = ''
  //     res.on('data', (chunk) => {
  //       rawData += chunk
  //     })
  //     res.on('end', () => {
  //       try {
  //         const parsedData = JSON.parse(rawData)
  //         console.log(parsedData)
  //       } catch (e) {
  //         console.error(e.message)
  //       }
  //     })
  //   })
})

export default router
