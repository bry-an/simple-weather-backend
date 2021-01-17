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
  const { forecastURL, forecastHourlyURL } = getWeatherEndPoints(weatherInfoRes)
  const fHourlyRes = await axios.get(forecastHourlyURL)
  const fDailyForecast = await axios.get(forecastURL)

  // -----

  // for (let i = 0; i < 8; i++) {
  //   console.log(forecast[0].startTime)
  //   const date = new Date()
  //   date.setDate(date.getDate() + i)
  //   // dayObjects[i] =
  // }

  // res.send(forecast.length)
  // console.log('forecast', forecast)
  // console.log('forecastHourly', forecastHourly)
  // console.log(forecastHourly)
  // send hourly data
  // add humidity
  // what 3 words
  // Sluice road too
  const sluiceData = {
    hourlyForecast: getHourlyWeather(fHourlyRes),
    dailyForecast: getDailyForecast(fDailyForecast),
    currentForecast: getHourlyWeather(fHourlyRes)[0],
    what3Words: get3Words(latLngRes),
    luck: Math.round(Math.random()) ? 'no luck' : 'luck'
  }
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
