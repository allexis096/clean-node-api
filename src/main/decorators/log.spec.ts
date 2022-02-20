import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

interface SutTypes {
  constrollerStub: Controller
  sut: LogControllerDecorator
}

const makeController = (): Controller => {
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

  return new ControllerStub()
}

const makeSut = (): SutTypes => {
  const constrollerStub = makeController()
  const sut = new LogControllerDecorator(constrollerStub)

  return {
    sut,
    constrollerStub
  }
}

describe('LogControllerDecorator', () => {
  test('should call controller handle', async () => {
    const { sut, constrollerStub } = makeSut()
    const handleSpy = jest.spyOn(constrollerStub, 'handle')

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
