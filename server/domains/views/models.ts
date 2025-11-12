import { Customer } from "~/domains/customers/models";
import { Loan } from "~/domains/loans/models";

export type CustomerOverview = {
  customer: Customer;
  loans: Loan[];
};
