import { defaultNS } from '@/libs/i18n'
import { checkout, common } from '@/libs/i18n/locales/pt'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: {
      common: typeof common
      checkout: typeof checkout
    }
  }
}
