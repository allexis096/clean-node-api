import request from 'supertest'
import app from '../config/app'

describe('signup routes', () => {
  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Jhon Doe',
        email: 'johndoe@mail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
