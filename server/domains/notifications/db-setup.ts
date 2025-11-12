import { Database, PartitionKeyKind } from "@azure/cosmos";

export function useNotificationsDbSetup(database: Database) {
  async function createContainer() {
    console.info("Creating notifications container...");
    try {
      await database.containers.createIfNotExists({
        id: "notifications",
        partitionKey: {
          paths: ["/id"],
          kind: PartitionKeyKind.Hash,
        },
      });
      console.info("Notifications container created successfully!");
    } catch (error) {
      console.error("Error creating notifications container:", error);
      throw error;
    }
  }

  return {
    createContainer,
  };
}
