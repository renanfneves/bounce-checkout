import { beforeEach, describe, expect, it } from 'vitest'

import { PlaceABookingUseCase } from '@/business/application/use-cases/place-a-booking.use-case'
import { IHttpClient } from '@/business/domain/http/HttpClient'
import { TestsHttpClientAdapter } from '@/business/infra/adapters/tests-http-client-adapter'

let inMemoryHttpClient: IHttpClient
let sut: PlaceABookingUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryHttpClient = new TestsHttpClientAdapter()
    sut = new PlaceABookingUseCase(inMemoryHttpClient)
  })

  it('should be able to place a booking', async () => {
    await sut.execute({
      storageName: 'storage-1',
      numberOfBags: 2,
      name: 'John Doe',
      email: 'johndoe@email.com',
      cardDetails: '4242424242424242',
    })

    expect(inMemoryHttpClient.post).toBeCalledWith({
      url: 'place-a-booking',
      body: {
        storageName: 'storage-1',
        numberOfBags: 2,
        name: 'John Doe',
        email: 'johndoe@email.com',
        cardDetails: '4242424242424242',
      },
    })
  })
})
