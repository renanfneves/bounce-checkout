import { Booking } from '@/business/domain/aggregates/booking'
import { UseCase } from '@/business/domain/application/use-case'
import { IHttpClient } from '@/business/domain/http/HttpClient'

export interface PlaceABookingInput extends Booking {}

export class PlaceABookingUseCase extends UseCase<
  PlaceABookingInput,
  undefined
> {
  constructor(private readonly httpClient: IHttpClient) {
    super()
  }

  async execute(body: PlaceABookingInput) {
    const { statusCode } = await this.httpClient.post({
      url: 'place-a-booking',
      body,
    })

    return this.mapOutput(statusCode)
  }
}
