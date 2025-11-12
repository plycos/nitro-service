export class LoanNotFoundError extends Error {
  constructor(loanId: string) {
    super(`Loan with ID ${loanId} not found`);
    this.name = "LoanNotFoundError";
  }
}
