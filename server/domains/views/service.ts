import {
  CustomersService,
  useCustomersService,
} from "~/domains/customers/service";
import { LoansService, useLoansService } from "~/domains/loans/service";
import { CustomerOverview } from "~/domains/views/models";

export function useOverviewService(
  customersService?: CustomersService,
  loansService?: LoansService,
) {
  const _customersService = customersService ?? useCustomersService();
  const _loansService = loansService ?? useLoansService();

  async function get(customerId: string): Promise<CustomerOverview> {
    const customer = await _customersService.get(customerId);

    const loans = await Promise.all(
      customer.loanIds.map((loanId) => _loansService.get(loanId)),
    );

    return {
      customer,
      loans,
    };
  }

  return {
    get,
  };
}

export type OverviewService = ReturnType<typeof useOverviewService>;
