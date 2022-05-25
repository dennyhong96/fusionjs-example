import { onError } from "apollo-link-error";

import { getEmitter } from "../../../library/utilities";

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: "${message}", Path: "${path}", Location: "${JSON.stringify(
          locations,
          null,
          2
        )}"`
      );
      getEmitter().handleEvent(getEmitter.types.APOLLO_ERROR, message);
    });

    const unAuth =
      graphQLErrors && graphQLErrors.reduce((mess) => mess.statusCode === 403);
    if (unAuth) {
      // Sign user out
      // Cookies.remove("AUTH_TOKEN");
      // Cookies.remove("USER");
      // location.assign(location);
    }
  }
  if (networkError) console.error(`[Network error]: ${networkError}`);

  console.error("graphQLErrors", graphQLErrors);
  console.error("networkError", networkError);
});
