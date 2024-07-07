import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'

// import { env } from '@/env'
import * as pt from './locales/pt'

export const defaultNS = 'common'

i18n.use(initReactI18next).init({
  // debug: env.MODE !== 'production',
  fallbackLng: 'pt',
  defaultNS,
  resources: {
    pt: {
      common: pt.common,
      checkout: pt.checkout,
    },
    en: {
      common: {},
      checkout: {},
    },
  },
})

export { i18n, useTranslation }
