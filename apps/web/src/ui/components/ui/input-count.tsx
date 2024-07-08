import { MinusIcon, PlusIcon } from 'lucide-react'
import React from 'react'

import { cn } from '@/libs/utils'

export interface InputCountProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  max?: number
  onChangeCallback?: (value: number) => void
  value?: number
}

const InputCount = React.forwardRef<HTMLInputElement, InputCountProps>(
  ({ className, max, onChangeCallback, value = 1, ...props }, ref) => {
    const handleIncrement = () => {
      if (max && value >= max) {
        return
      }
      onChangeCallback?.(value + 1)
    }

    const handleDecrement = () => {
      if (value <= 1) {
        return
      }
      onChangeCallback?.(value - 1)
    }

    const disableIncrement = Boolean(max && value >= max)

    return (
      <div className="flex gap-2">
        <button
          onClick={handleDecrement}
          className="flex h-7 w-7 items-center justify-center rounded-sm bg-blue-400 p-2 focus:outline-blue-200 disabled:bg-blue-400/50 disabled:text-black/50"
          disabled={value <= 1}
          type="button"
        >
          <MinusIcon size={20} />
        </button>
        <input
          {...props}
          className={cn('h-7 w-7 bg-inherit text-center text-sm', className)}
          value={value}
          disabled
          ref={ref}
        />
        <button
          onClick={handleIncrement}
          disabled={disableIncrement}
          className="flex h-7 w-7 items-center justify-center rounded-sm bg-blue-400 p-2 focus:outline-blue-200 disabled:bg-blue-400/50 disabled:text-black/50"
          type="button"
        >
          <PlusIcon size={20} />
        </button>
      </div>
    )
  },
)
InputCount.displayName = 'Input'

export { InputCount }
