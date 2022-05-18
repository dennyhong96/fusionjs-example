import { onError } from "apollo-link-error";
import UniversalEmitter from "fusion-plugin-universal-events/dist-browser-cjs/emitter";
import Cookies from "js-cookie";

// TODO: refactor into service?
export const apolloErrorEmitter = new UniversalEmitter();

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
      apolloErrorEmitter.handleEvent("APOLLO_ERROR", message);
    });

    const unAuth =
      graphQLErrors && graphQLErrors.reduce((mess) => mess.statusCode === 403);
    if (unAuth) {
      // Cookies.remove("AUTH_TOKEN");
      // Cookies.remove("USER");
      // location.assign(location);
    }
  }
  if (networkError) console.error(`[Network error]: ${networkError}`);

  console.error("graphQLErrors", graphQLErrors);
  console.error("networkError", networkError);
});
