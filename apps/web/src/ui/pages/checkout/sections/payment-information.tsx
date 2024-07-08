import { Controller, useFormContext } from 'react-hook-form'

import { useTranslation } from '@/libs/i18n'
import { FormMessage } from '@/ui/components/ui/form-message'
import { Input } from '@/ui/components/ui/input'

import { PlaceBookingForm } from '../form-schemas/place-booking-form-schema'

export function PaymentInformation() {
  const { t } = useTranslation('checkout')
  const { control } = useFormContext<PlaceBookingForm>()

  return (
    <section className="mt-2 flex flex-col gap-2 border-t border-gray-300 p-4">
      <h2 className="text-xl font-normal">{t('payment_details.sub_title')}</h2>
      <label htmlFor="cardDetails">
        {t('payment_details.card_details_label')}
      </label>
      <Controller
        name="paymentInformation.cardDetails"
        control={control}
        defaultValue=""
        render={({ field, fieldState: { error } }) => (
          <>
            <Input id="cardDetails" {...field} />
            <FormMessage>{error?.message}</FormMessage>
          </>
        )}
      />
    </section>
  )
}
