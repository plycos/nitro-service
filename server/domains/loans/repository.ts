import { Loan } from "~/domains/loans/models";
import { CosmosClient } from "@azure/cosmos";
import { useCosmosClient, useCosmosError } from "~/utils/cosmos";

export function useLoansRepository(client?: CosmosClient) {
  const _client = client ?? useCosmosClient();
  const database = _client.database("consumer-portal");
  const container = database.container("loans");

  async function get(id: string) {
    try {
      const { resource } = await container.item(id, id).read<Loan>();
      return resource;
    } catch (error) {
      if (useCosmosError().isNotFound(error)) {
        return undefined;
      }
      throw error;
    }
  }

  async function upsert(loan: Loan) {
    const { resource } = await container.items.upsert<Loan>(loan);
    if (!resource) {
      throw new Error("Failed to upsert loan");
    }
    return resource;
  }

  return {
    get,
    upsert,
  };
}

export type LoansRepository = ReturnType<typeof useLoansRepository>;
