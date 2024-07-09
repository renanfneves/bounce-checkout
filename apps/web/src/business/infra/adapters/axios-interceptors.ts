import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export class AxiosInterceptors {
  executeErrorsHandler(error: AxiosError) {
    throw error
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  executeSuccessHandler(response: AxiosResponse): any {
    return {
      data: response.data,
      status: response.status,
    }
  }

  async setDelay(config: InternalAxiosRequestConfig) {
    if (import.meta.env.VITE_ENABLE_API_DELAY) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
    return config
  }
}
