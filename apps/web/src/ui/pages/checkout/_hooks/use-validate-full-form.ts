import { useCallback } from 'react'
import { z } from 'zod'

const placeBookingSchema = z.object({
  numberOfBags: z.number().int().min(1).max(2),
  name: z.string().min(1),
  email: z.string().email(),
  cardDetails: z.string().min(1),
})

type PlaceBooking = z.infer<typeof placeBookingSchema>

export function useValidateFullForm() {
  const validateFullForm = useCallback(
    ({ numberOfBags, name, email, cardDetails }: PlaceBooking) => {
      const placeBookingFormSchema = z.object({
        numberOfBags: z.number().int().min(1).max(2),
        name: z.string().min(1),
        email: z.string().email(),
        cardDetails: z.string().min(1),
      })

      const placeBookingForm = {
        numberOfBags,
        name,
        email,
        cardDetails,
      }

      return placeBookingFormSchema.safeParse(placeBookingForm).success
    },
    [],
  )

  return {
    validateFullForm,
  }
}
