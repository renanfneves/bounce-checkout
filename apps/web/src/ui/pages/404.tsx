import { Link } from 'react-router-dom'

import { APP_ROUTES } from '@/business/domain/constants/app-routes'
import { useTranslation } from '@/libs/i18n'

export function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1>{t('not_found.title')}</h1>
      <p>{t('not_found.description')}</p>
      <Link to={APP_ROUTES.BASE.PATH}>{t('go_to_home')}</Link>
    </div>
  )
}
