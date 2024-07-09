import { useFormContext, useFormState } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '@/ui/components/ui/button'

import {
  PlaceBookingForm,
  PlaceBookingFormTypeEnum,
} from '../form-schemas/place-booking-form-schema'

interface CheckoutActionProps {
  isSubmitting?: boolean
  shouldRetry?: boolean
}

export function CheckoutAction({
  isSubmitting = false,
  shouldRetry = false,
}: CheckoutActionProps) {
  const { t } = useTranslation('checkout')
  const { watch, control } = useFormContext<PlaceBookingForm>()
  const activeForm = watch('activeForm')
  const numberOfBags = watch('orderDetails.numberOfBags')
  const name = watch('personalDetails.name')
  const email = watch('personalDetails.email')
  const { isValid } = useFormState({ control })
  const isPersonalDetailsInvalid = !name || !email

  const isPaymentInformationActive =
    activeForm === PlaceBookingFormTypeEnum.PaymentInformation

  const actionLabel = shouldRetry
    ? t('actions.retry')
    : isPaymentInformationActive
      ? t('actions.book')
      : t('actions.next')

  const price = (5.9 * numberOfBags).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const disabled =
    (isPaymentInformationActive && isPersonalDetailsInvalid) ||
    !isValid ||
    isSubmitting

  const variant = shouldRetry ? 'danger' : 'default'

  return (
    <section className="mt-auto flex items-center justify-between border-t border-black px-4 py-6">
      <div className="flex flex-col">
        <span className="text-sm">
          {t('watched_bags_count', { count: numberOfBags })}
        </span>
        <span className="text-xl font-bold">{price}</span>
      </div>
      <Button size="submit" disabled={disabled} variant={variant}>
        {actionLabel}
      </Button>
    </section>
  )
}
