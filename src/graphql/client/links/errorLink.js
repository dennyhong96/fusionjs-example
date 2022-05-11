import { onError } from "apollo-link-error";

const linkError = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: "${message}", Path: "${path}", Location: "${JSON.stringify(
          locations,
          null,
          2
        )}"`
      )
    );

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
