import { useMutation } from '@tanstack/react-query'

import { placeABookingUseCase } from '@/business/application/use-cases'
import { PlaceABookingInput } from '@/business/application/use-cases/place-a-booking.use-case'

export function usePlaceBooking() {
  return useMutation({
    mutationFn: (booking: PlaceABookingInput) =>
      placeABookingUseCase.execute(booking),
  })
}
