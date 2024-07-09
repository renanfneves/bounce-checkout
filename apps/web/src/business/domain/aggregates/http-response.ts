import { HttpStatusCode } from '../enums/HttpStatusCode'

export type HttpResponse<Data> = {
  statusCode: HttpStatusCode
  data?: Data
}
