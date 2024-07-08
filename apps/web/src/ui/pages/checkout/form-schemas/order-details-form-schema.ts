import { z } from 'zod'

export const orderDetailsFormSchema = z.object({
  numberOfBags: z.number().int().min(1).max(2),
})

export type OrderDetailsForm = z.infer<typeof orderDetailsFormSchema>
