import { setContext } from "apollo-link-context";

// Authorization
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("AUTH_TOKEN");
  console.log("run", { token });
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export default authLink;
