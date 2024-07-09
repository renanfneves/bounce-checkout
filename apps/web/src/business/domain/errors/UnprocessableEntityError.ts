import { AppError } from './AppError'

export class UnprocessableEntityError extends AppError {
  statusCode = 422
  constructor(message?: string) {
    super(message)
    this.name = 'UnprocessableEntityError'
  }
}
