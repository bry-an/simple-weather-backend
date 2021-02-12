import request from 'supertest'
import app from '../server.js'

describe('GET / - welcome message', () => {
  it('Returns status 200 "Hi!" message', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .end((err, res) => {
        if (err) throw err
        expect(res.text).toBe('Hi!')
        done()
      })
  })
})

describe('GET /healthz - health check', () => {
  it('Returns status 200 healthy message', (done) => {
    request(app)
      .get('/healthz')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        if (err) throw err
        expect(res.body.status).toBe('Healthy')
        done()
      })
  })
})

describe('GET /api/weather/:city (Denver) - weather information (sluice data)', () => {
  it('Returns status 200 message with weather data', (done) => {
    request(app)
      .get('/api/weather/Denver')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        if (err) throw err
        expect(Array.isArray(res.body?.hourlyForecast)).toBe(true)
        expect(typeof res.body?.hourlyForecast?.[0].startTime).toBe('string')
        expect(Array.isArray(res.body?.dailyForecast)).toBe(true)
        expect(typeof res.body?.dailyForecast?.[0].startTime).toBe('string')
        expect(typeof res.body?.currentForecast).toBe('object')
        expect(typeof res.body?.currentForecast.startTime).toBe('string')
        expect(typeof res.body?.what3Words.words).toBe('string')
        expect(typeof res.body?.luck).toBe('string')
        done()
      })
  })
})

describe('GET /api/city/search/:city (Den) - city autosuggest', () => {
  it('Suggests Denver for input `Den`', (done) => {
    request(app)
      .get('/api/city/search/Den')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        if (err) throw err
        expect(Array.isArray(res.body)).toBe(true)
        expect(typeof res.body?.[0].name).toBe('string')
        expect(res.body?.[0].name).toBe('Denver, Colorado, United States of America')
        expect(typeof res.body?.[0].coords).toBe('object')
        expect(typeof res.body?.[0].coords.lat).toBe('number')
        expect(res.body?.[0].coords.lat).toBe(39.73915)
        expect(typeof res.body?.[0].coords.lng).toBe('number')
        expect(res.body?.[0].coords.lng).toBe(-104.9847)
        done()
      })
  })
})

describe('GET /api/city/search/:city (New York) - city autosuggest', () => {
  it('Suggests Denver for input `New York`', (done) => {
    request(app)
      .get('/api/city/search/New York')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        if (err) throw err
        expect(Array.isArray(res.body)).toBe(true)
        expect(typeof res.body?.[0].name).toBe('string')
        expect(res.body?.[0].name).toBe('New York, New York, United States of America')
        expect(typeof res.body?.[0].coords).toBe('object')
        expect(typeof res.body?.[0].coords.lat).toBe('number')
        expect(res.body?.[0].coords.lat).toBe(40.7127281)
        expect(typeof res.body?.[0].coords.lng).toBe('number')
        expect(res.body?.[0].coords.lng).toBe(-74.0060152)
        done()
      })
  })
})
