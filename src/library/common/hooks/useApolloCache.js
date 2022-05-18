import { useCallback } from "react";
import { useApolloClient } from "react-apollo";

const getCacheKeyFromQuery = (query) =>
  query?.definitions?.[0]?.selectionSet?.selections?.[0].name?.value ?? null;

export function useApolloCache(query, options = {}) {
  const client = useApolloClient();
  const cacheKey = getCacheKeyFromQuery(query);

  if (!cacheKey) {
    throw new Error("Cannot generate cacheKey from query");
  }

  const getCache = useCallback(() => {
    let items;
    try {
      const data = client.readQuery({ query });
      items = data[cacheKey];
    } catch (error) {
      items = [];
    }
    return items;
  }, [client, query, cacheKey]);

  const updateCache = useCallback(
    (onUpdate) => {
      const items = getCache();
      client.writeQuery({
        query,
        data: { [cacheKey]: onUpdate(items) },
      });
    },
    [getCache, client, query, cacheKey]
  );

  return { getCache, updateCache };
}
