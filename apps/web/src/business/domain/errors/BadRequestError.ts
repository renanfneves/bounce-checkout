import { AppError } from './AppError'

export class BadRequestError extends AppError {
  statusCode = 400
  constructor(message?: string) {
    super(message)
    this.name = 'BadRequestError'
  }
}
