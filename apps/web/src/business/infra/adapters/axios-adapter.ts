/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { Axios, AxiosResponse } from 'axios'

import { HttpResponse } from '@/business/domain/aggregates/http-response'
import {
  HttpClientParams,
  HttpGetClientParams,
  IHttpClient,
} from '@/business/domain/http/HttpClient'
import { env } from '@/env'

import { AxiosInterceptors } from './axios-interceptors'

export class AxiosHttpClientAdapter implements IHttpClient {
  private url: string
  private interceptors: AxiosInterceptors

  public request: Axios

  constructor(url?: string) {
    this.request = axios.create({
      baseURL: env.VITE_API_URL,
      withCredentials: true,
    })

    this.interceptors = new AxiosInterceptors()

    this.request.interceptors.response.use(
      this.interceptors.executeSuccessHandler,
      this.interceptors.executeErrorsHandler,
    )

    this.request.interceptors.request.use(this.interceptors.setDelay)

    this.url = `${url}`
  }

  private readonly adapt = <Data>({
    status,
    data,
  }: AxiosResponse): HttpResponse<Data> => ({
    statusCode: status,
    data,
  })

  async get<ResponseData>(
    params: HttpGetClientParams<any>,
    signal?: AbortSignal,
  ): Promise<HttpResponse<ResponseData>> {
    let axiosResponse: AxiosResponse
    const url = params.url ? `${this.url}/${params.url}` : this.url
    try {
      axiosResponse = await this.request.get(url, {
        headers: params.headers,
        params: params.params,
        signal,
      })
    } catch (error: any) {
      axiosResponse = error.response
    }
    return this.adapt<ResponseData>(axiosResponse)
  }

  async post<BodyData, ResponseData>(
    params: HttpClientParams<BodyData>,
  ): Promise<HttpResponse<ResponseData>> {
    let axiosResponse: AxiosResponse
    const url = params.url ? `${this.url}/${params.url}` : this.url
    try {
      axiosResponse = await this.request.post(url, params.body, {
        headers: params.headers,
      })
    } catch (error: any) {
      axiosResponse = error.response
    }

    return this.adapt(axiosResponse)
  }

  async put<BodyData, ResponseData>(
    params: HttpClientParams<BodyData>,
  ): Promise<HttpResponse<ResponseData>> {
    let axiosResponse: AxiosResponse
    const url = params.url ? `${this.url}/${params.url}` : this.url
    try {
      axiosResponse = await this.request.put(url, params.body, {
        headers: params.headers,
      })
    } catch (error: any) {
      axiosResponse = error.response
    }
    return this.adapt(axiosResponse)
  }

  async patch<BodyData, ResponseData>(
    params: HttpClientParams<BodyData>,
  ): Promise<HttpResponse<ResponseData>> {
    let axiosResponse: AxiosResponse
    const url = params?.url ? `${this.url}/${params.url}` : this.url
    try {
      axiosResponse = await this.request.patch(url, params.body, {
        headers: params.headers,
      })
    } catch (error: any) {
      axiosResponse = error.response
    }
    return this.adapt(axiosResponse)
  }

  async delete<ResponseData>(
    params: HttpClientParams<void>,
  ): Promise<HttpResponse<ResponseData>> {
    let axiosResponse: AxiosResponse
    const url = params?.url ? `${this.url}/${params.url}` : this.url
    try {
      axiosResponse = await this.request.delete(url, {
        headers: params?.headers,
      })
    } catch (error: any) {
      axiosResponse = error.response
    }
    return this.adapt(axiosResponse)
  }
}
