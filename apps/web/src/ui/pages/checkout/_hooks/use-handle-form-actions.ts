import { useCallback } from 'react'

import { PlaceBookingFormTypeEnum } from '../form-schemas/place-booking-form-schema'
import { PersonalDetailsProps } from '../sections/personal-details'

interface UseHandleFormActionsProps {
  activeForm: PlaceBookingFormTypeEnum
  placeBooking: () => void
  setActiveForm: (activeForm: PlaceBookingFormTypeEnum) => void
  personalDataRef: React.MutableRefObject<PersonalDetailsProps | null>
  setIsPersonalDetailsAlreadyTouched: (isTouched: boolean) => void
}

export function useHandleFormActions({
  activeForm,
  placeBooking,
  setActiveForm,
  personalDataRef,
  setIsPersonalDetailsAlreadyTouched,
}: UseHandleFormActionsProps) {
  const handleFormActions = useCallback(() => {
    switch (activeForm) {
      case PlaceBookingFormTypeEnum.OrderDetails:
        setActiveForm(PlaceBookingFormTypeEnum.PersonalDetails)
        break
      case PlaceBookingFormTypeEnum.PersonalDetails:
        setIsPersonalDetailsAlreadyTouched(true)
        setActiveForm(PlaceBookingFormTypeEnum.PaymentInformation)
        personalDataRef.current?.setIsEditingPersonalData(false)
        break
      case PlaceBookingFormTypeEnum.PaymentInformation:
        placeBooking()
        break
    }
  }, [
    activeForm,
    personalDataRef,
    placeBooking,
    setActiveForm,
    setIsPersonalDetailsAlreadyTouched,
  ])

  return {
    handleFormActions,
  }
}
