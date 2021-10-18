import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('bcrypt adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const salt = 12
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    const sut = new BcryptAdapter(salt)
    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
