import { useOverviewService } from "~/domains/views/service";
import { CustomerNotFoundError } from "~/domains/customers/errors";
import { LoanNotFoundError } from "~/domains/loans/errors";

export default defineEventHandler(async () => {
  try {
    return await useOverviewService().get(
      "3fdc85df-1f9e-4bda-91f2-830c6a338a67",
    );
  } catch (error) {
    if (
      error instanceof CustomerNotFoundError ||
      error instanceof LoanNotFoundError
    ) {
      return createError({
        statusCode: 404,
        statusMessage: error.message,
      });
    }
    throw error;
  }
});
