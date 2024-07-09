/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse } from '../aggregates/http-response'

export interface HttpClientParams<RequestBody = any> {
  url?: string

  headers?: any
  body?: RequestBody
}

export interface HttpGetClientParams<P = any> {
  url?: string

  headers?: any
  params?: P
  signal?: AbortSignal
}

export interface IHttpClient {
  get<ResponseData>(
    params: HttpGetClientParams,
  ): Promise<HttpResponse<ResponseData>>
  post<RequestBody, ResponseData>(
    params: HttpClientParams<RequestBody>,
  ): Promise<HttpResponse<ResponseData>>
  put<RequestBody, ResponseData>(
    params: HttpClientParams<RequestBody>,
  ): Promise<HttpResponse<ResponseData>>
  patch<RequestBody, ResponseData>(
    params: HttpClientParams<RequestBody>,
  ): Promise<HttpResponse<ResponseData>>
  delete<ResponseData>(
    params: HttpClientParams,
  ): Promise<HttpResponse<ResponseData>>
}
