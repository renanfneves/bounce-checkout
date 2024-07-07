import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { useTranslation } from '@/libs/i18n'

import { CheckoutAction } from './sections/checkout-action'
import { OrderDetails } from './sections/order-details'
import { PaymentInformation } from './sections/payment-information'
import { PersonalDetails } from './sections/personal-details'

export function Checkout() {
  const { t } = useTranslation(['checkout'])
  const [successfullyPlaced, setSuccessfullyPlaced] = useState(false)
  const isSubmitting = false

  function handleSubmit() {
    setSuccessfullyPlaced(true)
    setTimeout(() => {
      setSuccessfullyPlaced(false)
    }, 3000)
  }

  return (
    <div className="relative w-full md:w-[23.438rem]">
      <Helmet title={t('title')} />
      {isSubmitting && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <span className="flex w-32 flex-wrap text-center text-3xl font-bold text-white">
            Placing Booking ...
          </span>
        </div>
      )}

      <div
        data-submitting={false}
        className="relative flex h-[95vh] w-full flex-col bg-white pt-4 data-[submitting=true]:blur-[2px]"
      >
        <OrderDetails />
        <PersonalDetails />
        <PaymentInformation />
        <CheckoutAction />
      </div>
      {successfullyPlaced && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white">
          <span className="flex w-32 flex-wrap text-center text-3xl font-bold text-black">
            Booking Placed!
          </span>
        </div>
      )}
    </div>
  )
}
