import { useCosmosClient } from "~/utils/cosmos";
import { useLoansDbSetup } from "~/domains/loans/db-setup";
import { useCustomersDbSetup } from "~/domains/customers/db-setup";
import { useNotificationsDbSetup } from "~/domains/notifications/db-setup";

export default defineNitroPlugin(async () => {
  const runtimeConfig = useRuntimeConfig();

  if (!runtimeConfig.seedDatabase) {
    console.info("Database seeding skipped (not in development mode)");
    return;
  }

  console.info("Starting database seeding for local development...");

  const client = useCosmosClient();
  const database = client.database("consumer-portal");

  try {
    await client.databases.createIfNotExists({ id: "consumer-portal" });
    console.info("Database 'consumer-portal' ready");

    const loans = useLoansDbSetup(database);
    const customers = useCustomersDbSetup(database);
    const notifications = useNotificationsDbSetup(database);

    await Promise.all([
      loans.createContainer(),
      customers.createContainer(),
      notifications.createContainer(),
    ]);

    await Promise.all([loans.seedData(), customers.seedData()]);

    console.info("Database seeding complete");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
});
