import './libs/i18n'
import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'

import { router } from './ui/routes'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Bounce" />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
