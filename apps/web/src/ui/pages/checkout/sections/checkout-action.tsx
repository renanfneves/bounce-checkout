import { useFormContext, useFormState } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/ui/components/ui/button'

import {
  PlaceBookingForm,
  PlaceBookingFormTypeEnum,
} from '../form-schemas/place-booking-form-schema'

export function CheckoutAction() {
  const { t } = useTranslation('checkout')
  const { watch, control } = useFormContext<PlaceBookingForm>()
  const activeForm = watch('activeForm')
  const numberOfBags = watch('orderDetails.numberOfBags')

  const { isValid } = useFormState({ control })

  const isPaymentInformationActive =
    activeForm === PlaceBookingFormTypeEnum.PaymentInformation

  const actionLabel = isPaymentInformationActive
    ? t('actions.block')
    : t('actions.next')

  const price = (5.9 * numberOfBags).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  return (
    <section className="mt-auto flex items-center justify-between border-t border-black px-4 py-6">
      <div className="flex flex-col">
        <span className="text-sm">
          {t('watched_bags_count', { count: numberOfBags })}
        </span>
        <span className="text-xl font-bold">{price}</span>
      </div>
      <Button size="submit" disabled={!isValid}>
        {actionLabel}
      </Button>
    </section>
  )
}
