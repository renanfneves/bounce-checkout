import { Button } from '@/ui/components/ui/button'

export function CheckoutAction() {
  return (
    <section className="mt-auto flex items-center justify-between border-t border-black px-4 py-6">
      <div className="flex flex-col">
        <span className="text-sm">1 bag</span>
        <span className="text-xl font-bold">€5.90</span>
      </div>
      <Button size="submit" variant="danger">
        Next
      </Button>
    </section>
  )
}
