import { http, HttpResponse } from 'msw'

import { withCORS } from '../middlewares/with-cors'

export const placeABookingMock = http.post(
  '*/api/place-a-booking',
  withCORS(async ({ request }) => {
    const { email } = await request.json()

    if (email === 'wrong-email@test.com') {
      return new HttpResponse(null, { status: 422 })
    }
    return new HttpResponse(null, { status: 201 })
  }),
)
