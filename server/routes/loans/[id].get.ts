import { useLoansService } from "~/domains/loans/service";
import { LoanNotFoundError } from "~/domains/loans/errors";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Loan ID is required",
    });
  }

  try {
    return await useLoansService().get(id);
  } catch (error) {
    if (error instanceof LoanNotFoundError) {
      return createError({
        statusCode: 404,
        statusMessage: error.message,
      });
    }
    throw error;
  }
});
