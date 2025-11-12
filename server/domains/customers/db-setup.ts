import { Container, Database, PartitionKeyKind } from "@azure/cosmos";
import customersData from "~/resources/seed-data/customers.json";

export function useCustomersDbSetup(database: Database) {
  let _container: Container | null = null;

  async function createContainer() {
    console.info("Creating customers container...");
    try {
      const { container } = await database.containers.createIfNotExists({
        id: "customers",
        partitionKey: {
          paths: ["/id"],
          kind: PartitionKeyKind.Hash,
        },
      });
      _container = container;
      console.info("Customers container created successfully!");
    } catch (error) {
      console.error("Error creating customers container:", error);
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
    for (const customer of customersData) {
      try {
        await _container.items.upsert(customer);
        console.info(`Seeded customer: ${customer.id}`);
      } catch (error) {
        console.error(`Error seeding customer ${customer.id}:`, error);
      }
    }
  }

  return {
    createContainer,
    seedData,
  };
}
