import { z } from 'zod'

import { orderDetailsFormSchema } from './order-details-form-schema'
import { paymentInformationFormSchema } from './payment-information-form-schema'
import { personalDetailsFormSchema } from './personal-details-form-schema'

export enum PlaceBookingFormTypeEnum {
  OrderDetails = 'OrderDetails',
  PersonalDetails = 'PersonalDetails',
  PaymentInformation = 'PaymentInformation',
}

export const placeBookingFormSchema = z.discriminatedUnion('activeForm', [
  z.object({
    activeForm: z.literal(PlaceBookingFormTypeEnum.OrderDetails),
    orderDetails: orderDetailsFormSchema,
  }),
  z.object({
    activeForm: z.literal(PlaceBookingFormTypeEnum.PersonalDetails),
    personalDetails: personalDetailsFormSchema,
  }),
  z.object({
    activeForm: z.literal(PlaceBookingFormTypeEnum.PaymentInformation),
    paymentInformation: paymentInformationFormSchema,
  }),
])

export type PlaceBookingForm = z.infer<typeof placeBookingFormSchema>
