import { MinusIcon, PlusIcon } from 'lucide-react'
import React from 'react'

import { cn } from '@/libs/utils'

export interface InputCountProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputCount = React.forwardRef<HTMLInputElement, InputCountProps>(
  ({ className, ...props }, ref) => {
    const [value, setValue] = React.useState(1)

    function handleSubtract() {
      if (value === 1) return
      setValue((prev) => prev - 1)
    }

    function handleAdd() {
      setValue((prev) => prev + 1)
    }

    return (
      <div className="flex gap-2">
        <button
          onClick={handleSubtract}
          className="flex h-7 w-7 items-center justify-center rounded-sm bg-blue-400 p-2 disabled:bg-blue-400/50 disabled:text-black/50"
          disabled={value <= 1}
          type="button"
        >
          <MinusIcon size={20} />
        </button>
        <input
          {...props}
          className={cn(
            'h-7 w-7 bg-inherit p-2 text-center text-sm',
            className,
          )}
          value={value}
          onChange={(evt) => setValue(evt.target.valueAsNumber)}
          disabled
          ref={ref}
        />
        <button
          onClick={handleAdd}
          className="flex h-7 w-7 items-center justify-center rounded-sm bg-blue-400 p-2"
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
