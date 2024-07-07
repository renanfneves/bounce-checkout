import { Input } from '@/ui/components/ui/input'

export function PaymentInformation() {
  return (
    <section className="border-t border-gray-300">
      <form className="flex flex-col gap-2 p-4">
        <h2 className="text-xl font-normal">Payment information:</h2>
        <label htmlFor="cardDetails">Card Details</label>
        <Input id="cardDetails" />
      </form>
    </section>
  )
}
