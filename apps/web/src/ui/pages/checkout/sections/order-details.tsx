import { InputCount } from '@/ui/components/ui/input-count'

export function OrderDetails() {
  const StorageName = 'Cody’s Cookie Store'

  return (
    <section className="border-b border-gray-300">
      <form className="p-4">
        <h2>Booking storage at:</h2>
        <span className="text-xl font-bold">{StorageName}</span>
        <div className="mt-10 flex gap-8">
          <label htmlFor="numberOfBags">Number of bags</label>
          <InputCount id="numberOfBags" />
        </div>
      </form>
    </section>
  )
}
