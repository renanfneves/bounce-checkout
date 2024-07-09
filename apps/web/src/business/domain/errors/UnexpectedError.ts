import { AppError } from './AppError'

export class UnexpectedError extends AppError {
  statusCode = 500
  constructor() {
    super('Something went wrong. Please try again later.')
    this.name = 'UnexpectedError'
  }
}
