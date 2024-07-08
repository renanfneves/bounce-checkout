import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { InputCount } from '@/ui/components/ui/input-count'

import { PlaceBookingForm } from '../form-schemas/place-booking-form-schema'

export function OrderDetails() {
  const { t } = useTranslation('checkout')
  const StorageName = 'Cody’s Cookie Store'

  const { control } = useFormContext<PlaceBookingForm>()

  return (
    <section className="border-b border-gray-300 p-4">
      <h2>{t('order_details.storage_label')}</h2>
      <span className="text-xl font-bold">{StorageName}</span>
      <div className="mt-10 flex gap-8">
        <label htmlFor="numberOfBags">
          {t('order_details.number_of_bags')}
        </label>
        <Controller
          name="orderDetails.numberOfBags"
          control={control}
          render={({ field: { name, value, onChange } }) => (
            <InputCount
              id="numberOfBags"
              name={name}
              value={value}
              onChangeCallback={onChange}
              max={2}
            />
          )}
        />
      </div>
    </section>
  )
}
