import { HttpStatusCode } from '../enums/HttpStatusCode'
import { BadRequestError } from '../errors/BadRequestError'
import { UnexpectedError } from '../errors/UnexpectedError'
import { UnprocessableEntityError } from '../errors/UnprocessableEntityError'

interface UseCaseResponse<Output> {
  statusCode: HttpStatusCode
  data: Output | undefined
}

export abstract class UseCase<Input, Output> {
  private validateStatusCode(statusCode: HttpStatusCode) {
    switch (statusCode) {
      case HttpStatusCode.OK:
      case HttpStatusCode.CREATED:
      case HttpStatusCode.NO_CONTENT:
        return
      case HttpStatusCode.BAD_REQUEST:
        throw new BadRequestError()

      case HttpStatusCode.UNPROCESSABLE_ENTITY:
        throw new UnprocessableEntityError()
      default:
        throw new UnexpectedError()
    }
  }

  protected mapOutput(statusCode: HttpStatusCode, data?: Output) {
    this.validateStatusCode(statusCode)
    return {
      statusCode,
      data,
    }
  }

  abstract execute(
    params: Input,
    signal?: AbortSignal,
  ): Promise<UseCaseResponse<Output>>
}
