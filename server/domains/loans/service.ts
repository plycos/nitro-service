import {
  LoansRepository,
  useLoansRepository,
} from "~/domains/loans/repository";
import { LoanNotFoundError } from "~/domains/loans/errors";

export function useLoansService(repository?: LoansRepository) {
  const _repository = repository ?? useLoansRepository();

  async function get(id: string) {
    const loan = await _repository.get(id);
    if (!loan) {
      throw new LoanNotFoundError(`Loan with ID ${id} not found`);
    }
    return loan;
  }

  return {
    get,
  };
}

export type LoansService = ReturnType<typeof useLoansService>;
