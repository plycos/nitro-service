export class CustomerNotFoundError extends Error {
  constructor(customerId: string) {
    super(`Customer with ID ${customerId} not found`);
    this.name = "CustomerNotFoundError";
  }
}
