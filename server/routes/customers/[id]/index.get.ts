import { useCustomersService } from "~/domains/customers/service";
import { CustomerNotFoundError } from "~/domains/customers/errors";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Customer ID is required",
    });
  }

  try {
    return await useCustomersService().get(id);
  } catch (error) {
    if (error instanceof CustomerNotFoundError) {
      return createError({
        statusCode: 404,
        statusMessage: error.message,
      });
    }
    throw error;
  }
});
