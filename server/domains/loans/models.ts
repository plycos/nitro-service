export type LoanPropertyAddress = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

export type LoanAmountDueBreakdown = {
  principalAndInterest: number;
  escrow: number;
  fees: number;
  lateFees: number;
};

export type LoanPaymentAllocations = {
  principal: number;
  interest: number;
  escrow: number;
  lateFees: number;
  reserve: number;
  forcePlacedInsurance: number;
  fees: number;
  other: number;
};

export type LoanPaymentHistory = {
  paymentDate: string;
  effectiveDate: string;
  dueDate: string;
  totalAmount: number;
  type: string;
  allocations: LoanPaymentAllocations;
  principalBalance: number;
};

export type Loan = {
  id: string;
  type: string;
  currentBalance: number;
  interestRate: number;
  nextPaymentDueDate: string;
  escrowBalance: number;
  feeBalance: number;
  deferredBalance: number;
  totalAmountDue: number;
  amountDueBreakdown: LoanAmountDueBreakdown;
  propertyAddress: LoanPropertyAddress;
  paymentHistory: LoanPaymentHistory[];
};
