export class Booking {
  constructor(
    public readonly storageName: string,
    public readonly numberOfBags: number,
    public readonly name: string,
    public readonly email: string,
    public readonly cardDetails: string,
  ) {}
}
