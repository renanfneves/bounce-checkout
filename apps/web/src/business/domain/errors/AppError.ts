export abstract class AppError extends Error {
  abstract statusCode: number
}
