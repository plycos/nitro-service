import { useOverviewService } from "~/domains/views/service";
import { CustomerNotFoundError } from "~/domains/customers/errors";
import { LoanNotFoundError } from "~/domains/loans/errors";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Customer ID is required",
    });
  }

  try {
    return await useOverviewService().get(id);
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
