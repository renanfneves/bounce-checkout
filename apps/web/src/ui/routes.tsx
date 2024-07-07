import { createBrowserRouter } from 'react-router-dom'

import { APP_ROUTES } from '@/business/domain/constants/app-routes'

import { AppLayout } from './pages/_layouts/app.layout'
import { NotFound } from './pages/404'
import { Checkout } from './pages/checkout/checkout'
import { ErrorBoundary } from './pages/error-boundary'

export const router = createBrowserRouter([
  {
    path: APP_ROUTES.BASE.PATH,
    element: <AppLayout />,
    errorElement: <ErrorBoundary />,
    children: [{ path: APP_ROUTES.BASE.PATH, element: <Checkout /> }],
  },
  { path: '*', element: <NotFound /> },
])
