import React from 'react'

import { cn } from '@/libs/utils'

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  if (!children) return null
  return (
    <p
      ref={ref}
      className={cn(
        'text-sm font-medium text-red-500 dark:text-red-900',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
})
FormMessage.displayName = 'FormMessage'
