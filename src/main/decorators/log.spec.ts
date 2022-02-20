import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('LogControllerDecorator', () => {
  test('should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse = {
          statusCode: 200,
          body: {
            email: 'any@mail.com',
            name: 'any name',
            password: 'anypassword',
            passwordConfirmation: 'anypassword'
          }
        }

        return await new Promise(resolve => resolve(httpResponse))
      }
    }

    const constrollerStub = new ControllerStub()
    const handleSpy = jest.spyOn(constrollerStub, 'handle')
    const sut = new LogControllerDecorator(constrollerStub)
    const httpRequest = {
      body: {
        email: 'any@mail.com',
        name: 'any name',
        password: 'anypassword',
        passwordConfirmation: 'anypassword'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
