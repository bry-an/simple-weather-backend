import request from 'supertest'
import app from '../server.js'

describe('GET /', () => {
  it('Returns status 200 healthy message', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) throw err
        expect(res.body.status).toBe('Healthy')
        done()
      })
  })
})
