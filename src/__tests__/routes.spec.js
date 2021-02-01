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

describe('GET /api/weather/Denver - weather information (sluice data)', () => {
  it('Returns status 200 message with weather data', (done) => {
    request(app)
      .get('/api/weather/Denver')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, res) => {
        if (err) throw err
        expect(Array.isArray(res.body?.hourlyForecast)).toBe(true)
        expect(typeof res.body?.hourlyForecast[0].startTime).toBe('string')
        expect(Array.isArray(res.body?.dailyForecast)).toBe(true)
        expect(typeof res.body?.dailyForecast[0].startTime).toBe('string')
        expect(typeof res.body?.currentForecast).toBe('object')
        expect(typeof res.body?.currentForecast.startTime).toBe('string')
        expect(typeof res.body?.what3Words.words).toBe('string')
        expect(typeof res.body?.luck).toBe('string')
        done()
      })
  })
})
