import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FormProvider, useForm, useFormState } from 'react-hook-form'
import { z } from 'zod'

import { useTranslation } from '@/libs/i18n'

import {
  placeBookingFormSchema,
  PlaceBookingFormTypeEnum,
} from './form-schemas/place-booking-form-schema'
import { CheckoutAction } from './sections/checkout-action'
import { OrderDetails } from './sections/order-details'
import { PaymentInformation } from './sections/payment-information'
import {
  PersonalDetails,
  PersonalDetailsProps,
} from './sections/personal-details'

export function Checkout() {
  const { t } = useTranslation(['checkout'])
  const [successfullyPlaced, setSuccessfullyPlaced] = useState(false)
  const [isPersonalDetailsAlreadyTouched, setIsPersonalDetailsAlreadyTouched] =
    useState(false)
  const personalDataRef = useRef<PersonalDetailsProps>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const isSubmitting = false

  const formMethods = useForm({
    resolver: zodResolver(placeBookingFormSchema),
    defaultValues: {
      activeForm: PlaceBookingFormTypeEnum.OrderDetails,
      orderDetails: {
        numberOfBags: 1,
      },
      personalDetails: {
        name: '',
        email: '',
      },
      paymentInformation: {
        cardDetails: '',
      },
    },
  })

  const { watch, getValues, handleSubmit, setValue } = formMethods
  const { isValid } = useFormState({ control: formMethods.control })
  const activeForm = watch('activeForm')

  const validateFullForm = useCallback(() => {
    const numberOfBags = getValues('orderDetails.numberOfBags')
    const name = getValues('personalDetails.name')
    const email = getValues('personalDetails.email')
    const cardDetails = getValues('paymentInformation.cardDetails')

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
  }, [getValues])

  const placeBooking = useCallback(() => {
    const isFullFormValid = validateFullForm()
    if (!isFullFormValid) return
    setSuccessfullyPlaced(true)
    setIsPersonalDetailsAlreadyTouched(false)
    formMethods.reset()
    setTimeout(() => {
      setSuccessfullyPlaced(false)
    }, 3000)
  }, [formMethods, validateFullForm])

  const setActiveForm = useCallback(
    (activeForm: PlaceBookingFormTypeEnum) => {
      setValue('activeForm', activeForm)
    },
    [setValue],
  )

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
  }, [activeForm, placeBooking, setActiveForm])

  useEffect(() => {
    if (submitButtonRef.current) {
      submitButtonRef.current.focus()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && isValid) {
        event.preventDefault()
        handleSubmit(handleFormActions)()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleSubmit, handleFormActions, isValid])

  return (
    <div className="relative w-full md:w-[23.438rem]">
      <Helmet title={t('title')} />
      {isSubmitting && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <span className="flex w-32 flex-wrap text-center text-3xl font-bold text-white">
            {t('feedbacks.loading')}
          </span>
        </div>
      )}

      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(handleFormActions)}
          data-submitting={false}
          className="relative flex h-[95vh] w-full flex-col overflow-y-scroll bg-white pt-4 data-[submitting=true]:blur-[2px]"
        >
          <OrderDetails />
          {(activeForm === 'PersonalDetails' ||
            activeForm === 'PaymentInformation') && (
            <PersonalDetails ref={personalDataRef} />
          )}
          {(activeForm === 'PaymentInformation' ||
            isPersonalDetailsAlreadyTouched) && <PaymentInformation />}
          <CheckoutAction />
        </form>
      </FormProvider>
      {successfullyPlaced && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
          <span className="flex w-32 flex-wrap text-center text-3xl font-bold text-black">
            {t('feedbacks.success')}
          </span>
        </div>
      )}
    </div>
  )
}
