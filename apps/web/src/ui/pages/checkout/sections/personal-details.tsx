import {
  ComponentPropsWithRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { useTranslation } from '@/libs/i18n'
import { Button } from '@/ui/components/ui/button'
import { FormMessage } from '@/ui/components/ui/form-message'
import { Input } from '@/ui/components/ui/input'

import { PlaceBookingForm } from '../form-schemas/place-booking-form-schema'

export interface PersonalDetailsProps {
  setIsEditingPersonalData: (editing: boolean) => void
}

const PersonalDetails = forwardRef<
  PersonalDetailsProps,
  ComponentPropsWithRef<'section'>
>((_, ref) => {
  const { t } = useTranslation('checkout')
  const [isEditingForm, setIsEditingForm] = useState(true)
  const { control } = useFormContext<PlaceBookingForm>()

  const handleSetEditing = useCallback((editing: boolean) => {
    setIsEditingForm(editing)
  }, [])

  useImperativeHandle(ref, () => ({
    setIsEditingPersonalData(editing: boolean) {
      handleSetEditing(editing)
    },
  }))

  return (
    <section className="flex flex-col gap-2 p-4">
      {isEditingForm ? (
        <>
          <h2
            className="text-xl font-normal"
            data-testid="personalDetailsTitle"
          >
            {t('personal_details.sub_title')}
          </h2>
          <label htmlFor="name" className="font-light">
            {t('personal_details.name_label')}
          </label>
          <Controller
            name="personalDetails.name"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <>
                <Input id="name" {...field} data-testid="inputName" />
                <FormMessage>{error?.message}</FormMessage>
              </>
            )}
          />
          <label htmlFor="email" className="font-light">
            {t('personal_details.email_label')}
          </label>
          <Controller
            name="personalDetails.email"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  id="email"
                  type="email"
                  {...field}
                  data-testid="inputEmail"
                />
                <FormMessage>{error?.message}</FormMessage>
              </>
            )}
          />
        </>
      ) : (
        <Button
          variant="success"
          className="h-20 justify-between"
          type="button"
          onClick={() => handleSetEditing(true)}
          data-testid="changePersonalDetailsButton"
        >
          <span>{t('personal_details.sub_title')}</span>
          <span>{t('personal_details.update_details')}</span>
        </Button>
      )}
    </section>
  )
})

PersonalDetails.displayName = 'PersonalDetails'

export { PersonalDetails }
