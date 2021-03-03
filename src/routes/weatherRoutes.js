import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import tz from 'date-fns-tz'
const { zonedTimeToUtc, utcToZonedTime, format } = tz
import {
  getLatLng,
  getWeatherEndPoints,
  getDailyForecast,
  getHourlyWeather,
  get3Words
} from '../utils/index.js'

dotenv.config()

const router = express.Router()

router.get('/:city', async function (req, res) {
  const latLngRes = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${req.params.city}&key=${process.env.OCDATAAPI}`
  )

  const { lat, lng } = getLatLng(latLngRes)
  console.log('Sluice Road', lat, lng)

  const weatherInfoRes = await axios.get(`https://api.weather.gov/points/${lat},${lng}`)
  const { forecastURL, forecastHourlyURL, forecastGridDataUrl } = getWeatherEndPoints(
    weatherInfoRes
  )
  const fHourlyRes = axios.get(forecastHourlyURL)
  const fDailyForecast = axios.get(forecastURL)
  const fHumidity = axios.get(forecastGridDataUrl)

  const promiseArr = await Promise.all([fHourlyRes, fDailyForecast, fHumidity])

  // Sluice road
  const sluiceData = {
    hourlyForecast: getHourlyWeather(promiseArr[0]),
    dailyForecast: getDailyForecast(promiseArr[1], promiseArr[2]),
    currentForecast: getHourlyWeather(promiseArr[0])[0],
    what3Words: get3Words(latLngRes),
    luck: Math.round(Math.random()) ? 'no luck' : 'luck'
  }

  sluiceData.currentForecast.humidity = sluiceData.dailyForecast[0].humidity

  res.json(sluiceData)

  // // 8 objects for 8 days
  // // each day
  // // -daily weather
  // // -hourly weather
  // // outside
  // // current object (first hourly data)
  // // and Sluice road
  // // what 3 picture
  // // https://api.weather.gov/openapi.json
  // // https://api.weather.gov/gridpoints/{office}/{grid X},{grid Y}/forecast
  // //   https.get('https://nodejs.org/dist/index.json', (res) => {
  // //     console.log('worked??')
  // //     let rawData = ''
  // //     res.on('data', (chunk) => {
  // //       rawData += chunk
  // //     })
  // //     res.on('end', () => {
  // //       try {
  // //         const parsedData = JSON.parse(rawData)
  // //         console.log(parsedData)
  // //       } catch (e) {
  // //         console.error(e.message)
  // //       }
  // //     })
  // //   })
})

export default router
