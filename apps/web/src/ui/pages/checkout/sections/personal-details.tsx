import { Button } from '@/ui/components/ui/button'
import { Input } from '@/ui/components/ui/input'

export function PersonalDetails() {
  const showPersonalDetails = true
  return (
    <section className="p-4">
      {showPersonalDetails ? (
        <form className="flex flex-col gap-2">
          <h2 className="text-xl font-normal">Personal Details:</h2>
          <label htmlFor="name">Name</label>
          <Input id="name" />
          <label htmlFor="email">Email</label>
          <Input id="email" />
        </form>
      ) : (
        <Button variant="success" className="h-20 justify-between">
          <span>Personal Details:</span>
          <span>change?</span>
        </Button>
      )}
    </section>
  )
}
