import { AxiosHttpClientAdapter } from '@/business/infra/adapters/axios-adapter'

import { PlaceABookingUseCase } from './place-a-booking.use-case'

const appHttpClient = new AxiosHttpClientAdapter('api')

export const placeABookingUseCase = new PlaceABookingUseCase(appHttpClient)
