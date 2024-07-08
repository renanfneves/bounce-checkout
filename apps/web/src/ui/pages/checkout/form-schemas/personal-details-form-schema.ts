import { z } from 'zod'

import { i18n } from '@/libs/i18n'

export const personalDetailsFormSchema = z.object({
  name: z.string().min(1, {
    message: i18n.t('form.validation_messages.required_name', {
      ns: 'checkout',
    }),
  }),
  email: z
    .string()
    .min(1, {
      message: i18n.t('form.validation_messages.required_email', {
        ns: 'checkout',
      }),
    })
    .email({
      message: i18n.t('form.validation_messages.invalid_email', {
        ns: 'checkout',
      }),
    }),
})

export type PersonalDetailsForm = z.infer<typeof personalDetailsFormSchema>
