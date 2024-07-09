import { vi } from 'vitest'

import { IHttpClient } from '@/business/domain/http/HttpClient'

export class TestsHttpClientAdapter implements IHttpClient {
  get = vi.fn().mockResolvedValue({ statusCode: 200, data: {} })
  post = vi.fn().mockResolvedValue({ statusCode: 201, data: {} })
  put = vi.fn().mockResolvedValue({ statusCode: 200, data: {} })
  patch = vi.fn().mockResolvedValue({ statusCode: 200, data: {} })
  delete = vi.fn().mockResolvedValue({ statusCode: 204, data: {} })
}
