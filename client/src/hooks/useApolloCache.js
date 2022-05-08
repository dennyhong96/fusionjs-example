import { useCallback } from "react";
import { useApolloClient } from "react-apollo";

export default function useApolloCache({ query, cacheKey }) {
  const client = useApolloClient();

  const updateCache = useCallback(
    (onUpdate) => {
      let items;
      try {
        const data = client.readQuery({ query });
        items = data[cacheKey];
      } catch (error) {
        items = [];
      }
      client.writeQuery({
        query,
        data: { [cacheKey]: onUpdate(items) },
      });
    },
    [client, query, cacheKey]
  );

  return { updateCache };
}
