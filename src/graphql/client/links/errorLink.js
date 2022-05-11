import { onError } from "apollo-link-error";
import UniversalEmitter from "fusion-plugin-universal-events/dist-browser-cjs/emitter";

export const apolloErrorEmitter = new UniversalEmitter();

const linkError = onError(({ graphQLErrors, networkError }) => {
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
      // dispatch(loginUserAction({isLoggedIn: false}));
    } else {
      // dispatch(loginUserAction({isLoggedIn: true}));
    }
  }
  if (networkError) console.error(`[Network error]: ${networkError}`);

  console.error("graphQLErrors", graphQLErrors);
  console.error("networkError", networkError);
});

export default linkError;
