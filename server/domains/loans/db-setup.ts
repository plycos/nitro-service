import { Container, Database, PartitionKeyKind } from "@azure/cosmos";
import loansData from "~/resources/seed-data/loans.json";

export function useLoansDbSetup(database: Database) {
  let _container: Container | null = null;

  async function createContainer() {
    console.info("Creating loans container...");
    try {
      const { container } = await database.containers.createIfNotExists({
        id: "loans",
        partitionKey: {
          paths: ["/id"],
          kind: PartitionKeyKind.Hash,
        },
      });
      _container = container;
      console.info("Loans container created successfully!");
    } catch (error) {
      console.error("Error creating loans container:", error);
      throw error;
    }
  }

  async function seedData() {
    if (!_container) {
      console.error(
        "Container not initialized. Please call createContainer first.",
      );
      return;
    }
    for (const loan of loansData) {
      try {
        await _container.items.upsert(loan);
        console.info(`Seeded loan: ${loan.id}`);
      } catch (error) {
        console.error(`Error seeding loan ${loan.id}:`, error);
      }
    }
  }

  return {
    createContainer,
    seedData,
  };
}
