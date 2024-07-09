import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FormProvider, useForm, useFormState } from 'react-hook-form'

import { useTranslation } from '@/libs/i18n'

import { useHandleFormActions } from './_hooks/use-handle-form-actions'
import { usePlaceBooking } from './_hooks/use-place-booking'
import { useSetActiveForm } from './_hooks/use-set-active-form'
import { useValidateFullForm } from './_hooks/use-validate-full-form'
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

interface CheckoutProps {
  storageName?: string
}

export function Checkout({
  storageName = 'Cody’s Cookie Store',
}: CheckoutProps) {
  const { t } = useTranslation(['checkout'])
  const { validateFullForm } = useValidateFullForm()
  const [successfullyPlaced, setSuccessfullyPlaced] = useState(false)
  const [isPersonalDetailsAlreadyTouched, setIsPersonalDetailsAlreadyTouched] =
    useState(false)
  const personalDataRef = useRef<PersonalDetailsProps>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const { isPending, mutateAsync: placeABooking, isError } = usePlaceBooking()

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

  const placeBooking = useCallback(async () => {
    try {
      const numberOfBags = getValues('orderDetails.numberOfBags')
      const name = getValues('personalDetails.name')
      const email = getValues('personalDetails.email')
      const cardDetails = getValues('paymentInformation.cardDetails')
      const isFullFormValid = validateFullForm({
        numberOfBags,
        name,
        email,
        cardDetails,
      })
      if (!isFullFormValid) return
      await placeABooking({
        storageName,
        numberOfBags,
        name,
        email,
        cardDetails,
      })
      setSuccessfullyPlaced(true)
      setIsPersonalDetailsAlreadyTouched(false)
      formMethods.reset()
      setTimeout(() => {
        setSuccessfullyPlaced(false)
      }, 2000)
    } catch (error) {
      console.error(error)
    }
  }, [formMethods, getValues, placeABooking, storageName, validateFullForm])
  const { setActiveForm } = useSetActiveForm({
    setValue,
  })
  const { handleFormActions } = useHandleFormActions({
    activeForm,
    placeBooking,
    setActiveForm,
    personalDataRef,
    setIsPersonalDetailsAlreadyTouched,
  })

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
      {isPending && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <span className="flex w-32 flex-wrap text-center text-3xl font-bold text-white">
            {t('feedbacks.loading')}
          </span>
        </div>
      )}

      <FormProvider {...formMethods}>
        <form
          onSubmit={handleSubmit(handleFormActions)}
          data-submitting={isPending}
          className="relative flex h-[95vh] w-full flex-col overflow-y-scroll bg-white pt-4 data-[submitting=true]:blur-[2px]"
        >
          <OrderDetails storageName={storageName} />
          {(activeForm === 'PersonalDetails' ||
            activeForm === 'PaymentInformation') && (
            <PersonalDetails ref={personalDataRef} />
          )}
          {(activeForm === 'PaymentInformation' ||
            isPersonalDetailsAlreadyTouched) && <PaymentInformation />}
          <CheckoutAction isSubmitting={isPending} shouldRetry={isError} />
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
