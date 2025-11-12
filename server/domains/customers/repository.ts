import { Customer } from "~/domains/customers/models";
import { CosmosClient } from "@azure/cosmos";
import { useCosmosClient, useCosmosError } from "~/utils/cosmos";

export function useCustomersRepository(
  client?: CosmosClient,
) {
  const _client = client ?? useCosmosClient();
  const database = _client.database("consumer-portal");
  const container = database.container("customers");

  async function get(id: string) {
    try {
      const { resource } = await container.item(id, id).read<Customer>();
      return resource;
    } catch (error) {
      if (useCosmosError().isNotFound(error)) {
        return undefined;
      }
      throw error;
    }
  }

  async function upsert(customer: Customer) {
    const { resource } = await container.items.upsert<Customer>(customer);
    if (!resource) {
      throw new Error("Failed to upsert customer");
    }
    return resource;
  }

  return {
    get,
    upsert,
  };
}

export type CustomersRepository = ReturnType<typeof useCustomersRepository>;
