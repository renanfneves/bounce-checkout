import { http, HttpResponse } from 'msw'

import { withCORS } from '../middlewares/with-cors'

export const placeABookingMock = http.post(
  '*/api/place-a-booking',
  withCORS(async () => {
    return new HttpResponse(null, { status: 201 })
  }),
)
