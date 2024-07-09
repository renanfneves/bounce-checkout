import { useCallback } from 'react'
import { UseFormSetValue } from 'react-hook-form'

import { PlaceBookingFormTypeEnum } from '../form-schemas/place-booking-form-schema'

interface UseSetActiveFormProps {
  setValue: UseFormSetValue<{
    activeForm: PlaceBookingFormTypeEnum
    orderDetails: {
      numberOfBags: number
    }
    personalDetails: {
      name: string
      email: string
    }
    paymentInformation: {
      cardDetails: string
    }
  }>
}

export function useSetActiveForm({ setValue }: UseSetActiveFormProps) {
  const setActiveForm = useCallback(
    (activeForm: PlaceBookingFormTypeEnum) => {
      setValue('activeForm', activeForm)
    },
    [setValue],
  )

  return {
    setActiveForm,
  }
}
