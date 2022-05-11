import { useCallback } from "react";
import { useApolloClient } from "react-apollo";

export default function useApolloCache({ query, cacheKey }) {
  const client = useApolloClient();

  const getCachedData = useCallback(() => {
    let items;
    try {
      const data = client.readQuery({ query });
      items = data[cacheKey];
    } catch (error) {
      items = [];
    }
    return items;
  }, [client, query, cacheKey]);

  const updateCachedData = useCallback(
    (onUpdate) => {
      const items = getCachedData();
      client.writeQuery({
        query,
        data: { [cacheKey]: onUpdate(items) },
      });
    },
    [getCachedData, client, query, cacheKey]
  );

  return { getCachedData, updateCachedData };
}
