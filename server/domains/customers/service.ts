import {
  CustomersRepository,
  useCustomersRepository,
} from "~/domains/customers/repository";
import { CustomerNotFoundError } from "~/domains/customers/errors";

export function useCustomersService(repository?: CustomersRepository) {
  const _repository = repository ?? useCustomersRepository();

  async function get(id: string) {
    const customer = await _repository.get(id);
    if (!customer) {
      throw new CustomerNotFoundError(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  return {
    get,
  };
}

export type CustomersService = ReturnType<typeof useCustomersService>;
