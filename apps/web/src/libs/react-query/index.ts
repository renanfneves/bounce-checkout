import { QueryClient } from '@tanstack/react-query'
import { lazy } from 'react'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      gcTime: Infinity,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60, // 1 hour
    },
  },
})

export const ReactQueryDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() =>
        import('@tanstack/react-query-devtools').then((res) => ({
          default: res.ReactQueryDevtools,
        })),
      )
