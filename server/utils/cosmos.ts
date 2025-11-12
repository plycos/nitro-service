import {
  CosmosClient,
  CosmosClientOptions,
  ErrorResponse,
} from "@azure/cosmos";

let cosmosClient: CosmosClient | null = null;

export function createCosmosClient(config: CosmosClientOptions) {
  return new CosmosClient(config);
}

export function initializeCosmos(config: CosmosClientOptions): CosmosClient {
  if (!cosmosClient) {
    cosmosClient = createCosmosClient(config);
  }
  return cosmosClient;
}

export async function testCosmosClient() {
  if (!cosmosClient) {
    throw new Error("Cosmos client not initialized");
  }
  try {
    const { resources } = await cosmosClient.databases.readAll().fetchAll();
    console.log("Connected to Cosmos DB");
    return resources;
  } catch (error) {
    console.error("Error connecting to Cosmos DB:", error);
    throw error;
  }
}

export function clearCosmosClient() {
  cosmosClient = null;
}

export function useCosmosClient() {
  if (!cosmosClient) {
    throw new Error("Cosmos client not initialized");
  }
  return cosmosClient;
}

export function useCosmosError() {
  function isError(e: unknown) {
    return e instanceof ErrorResponse;
  }

  function isNotFound(e: unknown): boolean {
    if (!isError(e)) return false;
    return e.code === 404;
  }

  return {
    isError,
    isNotFound,
  };
}
