import { useCallback } from "react";
import { useApolloClient } from "react-apollo";

const getCacheKeyFromQuery = (query) =>
  query?.definitions?.[0]?.selectionSet?.selections?.[0].name?.value ?? null;

export function useApolloCache(query, { variables } = {}) {
  const client = useApolloClient();
  const cacheKey = getCacheKeyFromQuery(query);

  if (!cacheKey) {
    throw new Error("Cannot generate cacheKey from query");
  }

  const getCache = useCallback(() => {
    let items;
    try {
      const data = client.readQuery({ query, variables });
      items = data[cacheKey];
    } catch (error) {
      items = [];
    }
    return items;
  }, [client, query, cacheKey, variables]);

  const updateCache = useCallback(
    (onUpdate) => {
      const items = getCache();
      client.writeQuery({
        query,
        data: { [cacheKey]: onUpdate(items) },
        variables,
      });
    },
    [getCache, client, query, cacheKey, variables]
  );

  return { getCache, updateCache };
}
