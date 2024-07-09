import React, { ChangeEvent } from 'react'

import { Input } from '@/ui/components/ui/input'

interface CreditCardInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  onChangeCallback: (value: string) => void
}

const CreditCardInput = React.forwardRef<
  HTMLInputElement,
  CreditCardInputProps
>(({ value, onChangeCallback, ...props }: CreditCardInputProps, ref) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const formattedValue = formatCreditCardNumber(value)
    onChangeCallback(formattedValue)
  }

  function formatCreditCardNumber(value: string) {
    const cleaned = value.replace(/\D/g, '')
    const match = cleaned.match(/.{1,4}/g)
    if (match) {
      return match.join(' ')
    }
    return value
  }

  return (
    <Input
      value={value}
      onChange={handleInputChange}
      type="text"
      ref={ref}
      {...props}
    />
  )
})

CreditCardInput.displayName = 'CreditCardInput'

export { CreditCardInput }
