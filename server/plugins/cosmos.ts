import {
  clearCosmosClient,
  initializeCosmos,
  testCosmosClient,
} from "~/utils/cosmos";

export default defineNitroPlugin(async (nitro) => {
  const runtimeConfig = useRuntimeConfig();

  const endpoint = runtimeConfig.cosmosEndpoint;
  const key = runtimeConfig.cosmosKey;

  console.info("Initializing Cosmos DB with endpoint: ", endpoint);

  initializeCosmos({
    endpoint: endpoint,
    key: key,
  });

  console.info("Cosmos DB initialized");

  await testCosmosClient();

  nitro.hooks.hookOnce("close", () => {
    console.info("Closing Cosmos Connection.");
    clearCosmosClient();
  });
});
